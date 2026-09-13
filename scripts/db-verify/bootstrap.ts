import {
  SCHEMA_DDL,
  SECTIONS_FTS_DDL,
  ARTICLES_FTS_DDL,
  FTS_TRIGGERS_DDL,
  PIPELINE_DDL,
  ensureContentMetaColumns,
  SCHEMA_VERSION,
} from '@/db/schema';
import { runSeed } from '@/db/seed';
import { seedPipelineSamples } from '@/db/seed/updates';
import { listActs } from '@/db/repos/acts';

export type AnyDb = Parameters<typeof listActs>[0];

export async function bootstrap(db: AnyDb): Promise<void> {
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
      await ensureContentMetaColumns(db);
      await db.execAsync(
        `INSERT OR REPLACE INTO app_meta(key, value) VALUES ('schema_version', '${SCHEMA_VERSION}');`,
      );
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