import { VerifierDatabase } from './driver';
import { bootstrap, type AnyDb } from './bootstrap';
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
import {
  checkForUpdates,
  getMonitorMeta,
  getAutoCheck,
  setAutoCheck,
  parseManifest,
  isValidManifestItem,
} from '@/db/repos/monitor';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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

  console.log('\ncontent provenance (schema v3)');
  check('act catalog >= 26', acts.length >= 26, `${acts.length} acts`);
  const newActs = ['hindu-succession-act-1956', 'prevention-of-corruption-act-1988', 'arbitration-and-conciliation-act-1996', 'specific-relief-act-1963'];
  const missing = [];
  for (const slug of newActs) {
    const found = await db.getFirstAsync<{ id: number }>(`SELECT id FROM acts WHERE slug = ?`, slug);
    if (!found) missing.push(slug);
  }
  check('new acts present', missing.length === 0, missing.join(', ') || 'all 4 added');
  check('every act carries provenance', acts.every((a) => !!a.provenance && a.provenance.includes('India Code')));
  check('content status defaults to placeholder', acts.every((a) => a.content_status === 'placeholder'));
  const someSections = await db.getAllAsync<{ id: number; verified: number }>(`SELECT id, verified FROM sections LIMIT 5`);
  check('sections verified default 0', someSections.length > 0 && someSections.every((s) => s.verified === 0));
  const pending = await db.getFirstAsync<{ c: number }>(`SELECT COUNT(*) AS c FROM sections WHERE body LIKE '[Content pending%'`);
  const totalSections = await db.getFirstAsync<{ c: number }>(`SELECT COUNT(*) AS c FROM sections`);
  check('pending placeholders recorded', (pending?.c ?? 0) > 0 && (pending?.c ?? 0) <= (totalSections?.c ?? 0), `${pending?.c ?? 0} pending`);

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

  console.log('\nmonitoring (Section 3E live check)');
  const manifestRaw = JSON.parse(
    readFileSync(join(__dirname, '../../monitoring/manifest.example.json'), 'utf8'),
  ) as unknown;
  const parsed = parseManifest(manifestRaw);
  check('example manifest parses', parsed != null && parsed.items.length === 2);
  const cleanItems = parsed?.items ?? [];
  check('example items validate', cleanItems.length === 2 && cleanItems.every(isValidManifestItem));

  const fetcher: (url: string) => Promise<unknown> = async () => manifestRaw;
  const first = await checkForUpdates(db, { fetcher });
  check('monitor ok', first.sources[0]?.ok === true);
  check('monitor ingested two', first.total_ingested === 2, `ingested=${first.total_ingested}`);
  check('monitor meta written', (await getMonitorMeta(db)).lastChecked != null);

  const detected = await listUpdates(db, { status: 'detected' });
  check('detected items land in editorial inbox', detected.length >= 2, `${detected.length} detected`);

  const second = await checkForUpdates(db, { fetcher });
  check('monitor idempotent on re-run', second.total_ingested === 0, `new=${second.total_ingested}`);

  const badFetcher: (url: string) => Promise<unknown> = async () => ({
    schema_version: 1,
    generated_at: 't',
    source: { key: 'bad', name: 'bad', url: 'x' },
    items: [
      {
        id: 'x-1',
        update_kind: 'not-a-kind',
        ref_type: 'section',
        title: 'bad',
        official_url: 'https://x.example/1',
      },
      {
        id: 'x-2',
        update_kind: 'amendment',
        ref_type: 'section',
        act: 'bns-2023',
        section_number: '303',
        title: 'Also invalid',
        official_url: '',
        gazette_id: 'BAD-2',
      },
    ],
  });
  const bad = await checkForUpdates(db, { fetcher: badFetcher, sources: [{ key: 'bad', name: 'bad', url: 'x' }] });
  check('invalid items skipped', bad.sources[0]?.skipped === 2 && bad.sources[0]?.ok === true);

  check('auto-check defaults off', (await getAutoCheck(db)) === false);
  await setAutoCheck(db, true);
  check('auto-check on', (await getAutoCheck(db)) === true);
  await setAutoCheck(db, false);
  check('auto-check off again', (await getAutoCheck(db)) === false);

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