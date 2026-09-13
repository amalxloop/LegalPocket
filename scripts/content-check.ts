import { VerifierDatabase } from './db-verify/driver';
import { bootstrap, type AnyDb } from './db-verify/bootstrap';

interface ActReport {
  slug: string;
  short_title: string;
  category: string;
  year: number;
  act_number: string | null;
  jurisdiction: string;
  official_url: string | null;
  content_status: string;
  section_count: number;
  verified_count: number;
  pending_count: number;
}

async function main(): Promise<void> {
  const driver = new VerifierDatabase(':memory:');
  const db = driver as unknown as AnyDb;
  await bootstrap(db);

  const rows = await db.getAllAsync<ActReport>(
    `SELECT a.slug, a.short_title, a.category, a.year, a.act_number, a.jurisdiction,
            a.official_url, a.content_status,
            COUNT(s.id) AS section_count,
            COALESCE(SUM(CASE WHEN s.verified = 1 THEN 1 ELSE 0 END), 0) AS verified_count,
            COALESCE(SUM(CASE WHEN s.body LIKE '[Content pending%' THEN 1 ELSE 0 END), 0) AS pending_count
     FROM acts a
     LEFT JOIN sections s ON s.act_id = a.id
     GROUP BY a.id
     ORDER BY a.category, a.slug`,
  );

  let failed = 0;

  const reportLine = (a: ActReport): string =>
    `${a.slug.padEnd(42)} ${a.short_title.slice(0, 34).padEnd(34)} ` +
    `${a.section_count.toString().padStart(3)} sections · ` +
    `${a.verified_count.toString().padStart(3)} verified · ` +
    `${a.pending_count.toString().padStart(3)} pending · ${a.content_status}`;

  console.log('CONTENT QUALIFICATION REPORT (PRD 3D)');
  console.log('─'.repeat(120));
  for (const a of rows) {
    console.log(reportLine(a));
    if (a.section_count === 0) {
      failed++;
      console.log(`   ✗ ${a.slug}: no sections seeded`);
    }
  }
  console.log('─'.repeat(120));

  const placeholderActs = rows.filter((a) => a.verified_count === 0 && a.section_count > 0);
  console.log(`\n${placeholderActs.length} acts still need official text (zero verified sections).`);
  console.log('Upgrade path: ingest India Code / e-Gazette text, verify each section editorially,');
  console.log('then flip sections.verified and acts.content_status=\'official\'.\n');

  const noUrl = rows.filter((a) => !a.official_url);
  if (noUrl.length) {
    failed += noUrl.length;
    console.log(`✗ ${noUrl.length} acts missing official_url`);
  }
  const noNumber = rows.filter((a) => a.jurisdiction === 'central' && !a.act_number);
  if (noNumber.length) {
    failed += noNumber.length;
    console.log(`✗ ${noNumber.length} central acts missing act_number`);
  }
  const badYear = rows.filter((a) => a.year < 1800 || a.year > 2100);
  if (badYear.length) {
    failed += badYear.length;
    console.log(`✗ ${badYear.length} acts with out-of-range year`);
  }

  const duplicates = rows.length - new Set(rows.map((a) => a.slug)).size;
  if (duplicates) {
    failed += duplicates;
    console.log(`✗ ${duplicates} duplicate slugs`);
  }

  const total = rows.reduce((n, a) => n + a.section_count, 0);
  const verified = rows.reduce((n, a) => n + a.verified_count, 0);
  console.log(`\ntotal ${rows.length} acts · ${total} sections · ${verified} verified · ${placeholderActs.length} acts to ingest`);
  driver.close();
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error('CONTENT CHECK CRASHED:', e);
  process.exitCode = 1;
});