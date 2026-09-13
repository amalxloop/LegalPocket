import * as SQLite from 'expo-sqlite';
import {
  SCHEMA_DDL,
  SECTIONS_FTS_DDL,
  ARTICLES_FTS_DDL,
  FTS_TRIGGERS_DDL,
  PIPELINE_DDL,
  ensureContentMetaColumns,
  APP_DB_KEY,
  SCHEMA_VERSION,
} from './schema';
import { runSeed } from './seed';
import { seedPipelineSamples } from './seed/updates';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

let initInFlight: Promise<void> | null = null;

async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(APP_DB_KEY);

  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');
  await db.execAsync(SCHEMA_DDL);

  let v = 0;
  const row = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_meta WHERE key = 'schema_version'`,
  );
  if (row) v = Number(row.value);

  if (v < SCHEMA_VERSION) {
    await db.execAsync('BEGIN;');
    try {
      await db.execAsync(SECTIONS_FTS_DDL);
      await db.execAsync(ARTICLES_FTS_DDL);
      await db.execAsync(FTS_TRIGGERS_DDL);
      await db.execAsync(PIPELINE_DDL);
      await ensureContentMetaColumns(db);
      await db.execAsync(`
        INSERT OR REPLACE INTO app_meta(key, value) VALUES ('schema_version', '${SCHEMA_VERSION}');
      `);
      await db.execAsync('COMMIT;');
    } catch (e) {
      await db.execAsync('ROLLBACK;');
      throw e;
    }
  }

  await ensureSeeded(db);

  // Idempotent: demo records for the Section 3E pipeline (feed + editorial inbox).
  await seedPipelineSamples(db);
  return db;
}

async function ensureSeeded(db: SQLite.SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_meta WHERE key = 'seeded'`,
  );
  if (row && row.value === '1') return;
  if (initInFlight) return initInFlight;

  initInFlight = (async () => {
    await runSeed(db);
    await db.runAsync(`INSERT OR REPLACE INTO app_meta(key, value) VALUES ('seeded', '1')`);
  })();

  await initInFlight;
  initInFlight = null;
}

export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = openDatabase().catch((err) => {
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}

export async function resetAndReseedForDev(): Promise<void> {
  const db = await getDb();
  await db.execAsync(`
    DROP TABLE IF EXISTS sections_fts;
    DROP TABLE IF EXISTS articles_fts;
    DELETE FROM bookmarks;
    DELETE FROM compare_mappings;
    DELETE FROM compare_sets;
    DELETE FROM sections;
    DELETE FROM chapters;
    DELETE FROM articles;
    DELETE FROM parts;
    DELETE FROM schedules;
    DELETE FROM acts;
    DELETE FROM app_meta WHERE key = 'seeded';
  `);
  await db.execAsync(SCHEMA_DDL);
  dbPromise = null;
  await getDb();
}