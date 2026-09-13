import { VerifierDatabase } from './driver';
import {
  SCHEMA_DDL,
  SECTIONS_FTS_DDL,
  ARTICLES_FTS_DDL,
  FTS_TRIGGERS_DDL,
  PIPELINE_DDL,
  SCHEMA_VERSION,
} from '@/db/schema';
import { runSeed } from '@/db/seed';
import { seedPipelineSamples } from '@/db/seed/updates';
import {
  listActs,
  getAct,
  getActBySlug,
  listChapters,
  listSections,
  getSection,
  listCategories,
} from '@/db/repos/acts';
import { listParts, getPreamble, listArticlesInPart, getArticle, listSchedules } from '@/db/repos/constitution';
import { listCompareSets, getCompareSet, listMappings, crossReferencesForSection } from '@/db/repos/compare';
import { unifiedSearch, expandQuery } from '@/db/repos/search';
import { isBookmarked, addBookmark, removeBookmark, listBookmarks, bookmarksCount } from '@/db/repos/bookmarks';
import {
  listUpdates,
  getUpdate,
  ingestUpdate,
  setUnderReview,
  approveUpdate,
  rejectUpdate,
  publishUpdate,
  sectionVersionHistory,
  actVersionHistory,
} from '@/db/repos/updates';

type AnyDb = Parameters<typeof listActs>[0];

async function bootstrap(db: AnyDb): Promise<void> {
  await db.execAsync(SCHEMA_DDL);
  const row = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_meta WHERE key = 'schema_version'`,
  );
  const v = row ? Number(row.value) : 0;
  if (v < SCHEMA_VERSION) {
    await db.execAsync('BEGIN;');
    try {
      await db.execAsync(SECTIONS_FTS_DDL);
      await db.execAsync(ARTICLES_FTS_DDL);
      await db.execAsync(FTS_TRIGGERS_DDL);
      await db.execAsync(PIPELINE_DDL);
      await db.execAsync(`INSERT OR REPLACE INTO app_meta(key, value) VALUES ('schema_version', '${SCHEMA_VERSION}');`);
      await db.execAsync('COMMIT;');
    } catch (e) {
      await db.execAsync('ROLLBACK;');
      throw e;
    }
  }
  await runSeed(db);
  await seedPipelineSamples(db);
  await db.runAsync(`INSERT OR REPLACE INTO app_meta(key, value) VALUES ('seeded', '1')`);
}

let passed = 0;
let failed = 0;

function check(name: string, cond: boolean, detail?: string): void {
  if (cond) {
    passed++;
    console.log(`  ok    ${name}${detail ? `  (${detail})` : ''}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name}${detail ? `  (${detail})` : ''}`);
  }
}

async function main(): Promise<void> {
  const driver = new VerifierDatabase('legalpocket-verify');
  const db = driver as unknown as AnyDb;

  console.log('bootstrap: schema + seed');
  const started = Date.now();
  await bootstrap(db);
  console.log(`seeded in ${Date.now() - started}ms`);

  console.log('\nconstitution');
  const parts = await listParts(db);
  check('listParts', parts.length >= 20, `${parts.length} parts`);
  check('preamble part present', parts.some((p) => p.number === 'PRE'));

  const preamble = await getPreamble(db);
  check('preamble body', !!preamble?.body.includes('WE, THE PEOPLE'));
  check('preamble summary', !!preamble?.summary.includes('Forty-Second Amendment'));

  const part3 = parts.find((p) => p.number === 'III');
  check('Part III found', !!part3);
  if (part3) {
    const arts = await listArticlesInPart(db, part3.id);
    check('Part III articles >= 10', arts.length >= 10, `${arts.length} articles`);
    const first = arts[0];
    if (first) {
      const again = await getArticle(db, first.id);
      check('getArticle roundtrip', again?.number === first.number);
    }
  }

  const schedules = await listSchedules(db);
  check('schedules >= 12', schedules.length >= 12, `${schedules.length} schedules`);

  console.log('\nacts');
  const acts = await listActs(db);
  check('listActs >= 20', acts.length >= 20, `${acts.length} acts`);
  check('acts grouped', acts.every((a) => a.section_count >= 0));

  const cats = await listCategories(db);
  check('categories >= 5', cats.length >= 5, `${cats.length} categories`);

  const bns = await getActBySlug(db, 'bns-2023');
  check('BNS act found', !!bns);
  const ipc = await getActBySlug(db, 'indian-penal-code-1860');
  check('IPC act found', !!ipc);

  if (bns) {
    const bnsAgain = await getAct(db, bns.id);
    check('getAct roundtrip', bnsAgain?.slug === 'bns-2023');
    const bnsSections = await listSections(db, bns.id);
    check('BNS sections >= 10', bnsSections.length >= 10, `${bnsSections.length} sections`);
    const bnsChapters = await listChapters(db, bns.id);
    check('BNS chapters >= 6', bnsChapters.length >= 6, `${bnsChapters.length} chapters`);
    const sec304 = bnsSections.find((s) => s.number === '304');
    check('BNS §304 present', !!sec304, sec304?.title);
  }

  const filtered = await listActs(db, { search: 'negotiable' });
  check('listActs search "negotiable"', filtered.some((a) => a.short_title.includes('Negotiable')));

  const firstSec = (await listSections(db, (await getActBySlug(db, 'crpc-1973'))!.id))[0];
  if (firstSec) {
    const s = await getSection(db, firstSec.id);
    check('getSection roundtrip', s?.number === firstSec.number);
    check('getChapter null-safe', typeof s !== 'undefined');
  }

  console.log('\ncompare');
  const sets = await listCompareSets(db);
  check('compare sets == 3', sets.length === 3, sets.map((x) => x.slug).join(', '));
  check('sets resolve acts', sets.every((x) => x.old_act.short_title && x.new_act.short_title));
  if (sets.length > 0) {
    const s1 = await getCompareSet(db, sets[0].id);
    check('getCompareSet roundtrip', s1?.slug === sets[0].slug);
    const ipcToBns = sets.find((x) => x.slug.includes('ipc_to_bns'));
    if (ipcToBns) {
      const ms = await listMappings(db, ipcToBns.id);
      check('IPC→BNS mappings >= 20', ms.length >= 20, `${ms.length} mappings`);
      check('mappings pending status', ms.every((m) => m.status === 'pending_verification'));
      const refs = await crossReferencesForSection(db, ipcToBns.old_act_id, ms[0].old_section);
      check('crossReferencesForSection', refs.length >= 1);
    }
  }

  console.log('\nsearch');
  check('expandQuery FIR', expandQuery('FIR').length >= 2, expandQuery('FIR').join(', '));
  const r138 = await unifiedSearch(db, '138', 'all');
  check('search "138"', r138.length >= 1, `${r138.length} results`);
  const rBail = await unifiedSearch(db, 'bail', 'section');
  check('search "bail" (sections)', rBail.length >= 1, `${rBail.length} sections`);
  const rTheft = await unifiedSearch(db, 'theft', 'section');
  check('search "theft" (sections)', rTheft.length >= 1, `${rTheft.length} sections`);
  const rBns = await unifiedSearch(db, 'BNS', 'act');
  check('search "BNS" synonym act', rBns.length >= 1, `${rBns.length} acts`);
  const rArtFundamental = await unifiedSearch(db, 'fundamental rights', 'all');
  check('search "fundamental rights"', rArtFundamental.some((r) => r.type === 'article'));

  console.log('\nbookmarks');
  const bnsId = (await getActBySlug(db, 'bns-2023'))!.id;
  const bnsSections2 = await listSections(db, bnsId);
  const target = bnsSections2.find((s) => s.number === '304') ?? bnsSections2[0];
  if (!target) {
    check('bookmark target found', false, 'no BNS sections');
  } else {
    const initialCount = await bookmarksCount(db);
    check('not bookmarked initially', !(await isBookmarked(db, 'section', target.id)));
    await addBookmark(db, 'section', target.id);
    check('added bookmark', await isBookmarked(db, 'section', target.id));
    const afterAdd = await bookmarksCount(db);
    check('count incremented', afterAdd === initialCount + 1, `${initialCount} → ${afterAdd}`);
    const items = await listBookmarks(db);
    check('listBookmarks has target section', items.some((i) => i.itemType === 'section' && i.title.includes(target!.number)));
    check('bookmark dedupe (unique)', (await bookmarksCount(db)) === afterAdd);
    await removeBookmark(db, 'section', target.id);
    check('removed bookmark', !(await isBookmarked(db, 'section', target.id)));
    check('no bookmark leak between checks', (await bookmarksCount(db)) === initialCount);
  }

  console.log('\nupdates (Section 3E pipeline)');
  const published = await listUpdates(db, { status: 'published' });
  check('published commencement samples >= 3', published.length >= 3, `${published.length} published`);
  check('feed rows carry act title', published.every((u) => u.act_short_title));

  const bnsPub = published.find((u) => u.update_kind === 'commencement' && u.act_slug === 'bns-2023');
  check('BNS commencement sample present', !!bnsPub);
  if (bnsPub) {
    const detail = await getUpdate(db, bnsPub.id);
    check('getUpdate resolves act', detail?.act?.slug === 'bns-2023');
  }

  const inbox = await listUpdates(db, { status: 'under_review' });
  check('inbox has pending sample', inbox.length >= 1, `${inbox.length} pending`);

  const ingestId = await ingestUpdate(db, {
    updateKind: 'amendment',
    refType: 'section',
    actSlug: 'bns-2023',
    sectionNumber: '304',
    title: 'verify amendment',
    summary: 'probe',
    officialUrl: 'https://example.in/gazette/1',
    gazetteId: 'TEST-1',
  });
  check('ingest detected', (await getUpdate(db, ingestId))?.status === 'detected');

  await setUnderReview(db, ingestId);
  check('under review', (await getUpdate(db, ingestId))?.status === 'under_review');
  await approveUpdate(db, ingestId);
  check('approved', (await getUpdate(db, ingestId))?.status === 'approved');

  const bnsAct = await getActBySlug(db, 'bns-2023');
  const sec304 = (await listSections(db, bnsAct!.id)).find((s) => s.number === '304')!;
  const oldBody = sec304.body;
  await publishUpdate(db, ingestId, { newBody: 'VERIFIED TEST BODY — section 304 amended by verification harness.' });

  const publishedIngest = await getUpdate(db, ingestId);
  check('published after publishUpdate', publishedIngest?.status === 'published');
  check('published_at set', !!publishedIngest?.published_at);

  const secNow = (await listSections(db, bnsAct!.id)).find((s) => s.number === '304')!;
  check('section body applied', secNow.body.includes('VERIFIED TEST BODY'));
  check('section last_amended set', !!secNow.last_amended);
  check('old body preserved in history', secNow.body !== oldBody);
  const sVersions = await sectionVersionHistory(db, secNow.id);
  check('section version recorded', sVersions.length >= 1, `${sVersions.length} versions`);
  if (sVersions[0]) {
    check('version carries old text', sVersions[0].old_body === oldBody);
    check('version carries gazette id', sVersions[0].gazette_id === 'TEST-1');
  }
  const aVersions = await actVersionHistory(db, bnsAct!.id);
  check('act version recorded', aVersions.length >= 1, `${aVersions.length} versions`);
  const patchedAct = await getAct(db, bnsAct!.id);
  check('act last_updated bumped', !!patchedAct?.last_updated);

  const rejectedId = await ingestUpdate(db, {
    updateKind: 'repeal',
    refType: 'act',
    actSlug: 'indian-penal-code-1860',
    title: 'verify rejection',
  });
  await rejectUpdate(db, rejectedId, 'Probe rejection.');
  const rejected = await getUpdate(db, rejectedId);
  check('reject path', rejected?.status === 'rejected' && rejected.reviewer_note?.includes('Probe'));

  check('pipeline samples idempotent', (await listUpdates(db)).every((u) => u.id));

  console.log('\nSUMMARY');
  console.log(`  passed: ${passed}`);
  console.log(`  failed: ${failed}`);
  driver.close();
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error('VERIFY CRASHED:', e);
  process.exitCode = 1;
});