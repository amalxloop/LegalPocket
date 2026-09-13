import type { SQLiteDatabase } from 'expo-sqlite';
import type { UpdateKind, UpdateRefType } from '../../types';
import { ingestUpdate } from './updates';

export const VALID_UPDATE_KINDS: UpdateKind[] = [
  'amendment',
  'commencement',
  'repeal',
  'new_act',
  'bill_introduced',
  'bill_passed',
  'assent',
];

export const VALID_REF_TYPES: UpdateRefType[] = ['act', 'section', 'article', 'constitution', 'bill'];

export interface MonitorSource {
  key: string;
  name: string;
  url: string;
}

export const DEFAULT_SOURCES: MonitorSource[] = [
  {
    key: 'legalpocket-content',
    name: 'LegalPocket content manifest (GitHub Pages)',
    url: 'https://amalxloop.github.io/legalpocket-content/legal-updates/v1/manifest.json',
  },
];

export interface LegalUpdateManifest {
  schema_version: number;
  generated_at: string;
  source: { key: string; name: string; url: string };
  items: LegalUpdateManifestItem[];
}

export interface LegalUpdateManifestItem {
  id: string;
  update_kind: string;
  ref_type: string;
  act?: string | null;
  section_number?: string | null;
  title: string;
  summary?: string | null;
  official_url: string;
  gazette_id?: string | null;
}

export type ManifestFetcher = (url: string) => Promise<unknown>;

export interface MonitorSourceResult {
  key: string;
  name: string;
  ok: boolean;
  fetched: number;
  ingested: number;
  skipped: number;
  error: string | null;
  checked_at: string;
}

export interface MonitorResult {
  checked_at: string;
  sources: MonitorSourceResult[];
  total_ingested: number;
}

export function parseManifest(raw: unknown): LegalUpdateManifest | null {
  if (typeof raw !== 'object' || raw == null) return null;
  const m = raw as Partial<LegalUpdateManifest>;
  if (!Array.isArray(m.items) || typeof m.schema_version !== 'number') return null;
  if (typeof m.source?.key !== 'string' || typeof m.source?.name !== 'string') return null;
  return {
    schema_version: m.schema_version,
    generated_at: typeof m.generated_at === 'string' ? m.generated_at : '',
    source: {
      key: m.source.key,
      name: m.source.name,
      url: typeof m.source.url === 'string' ? m.source.url : '',
    },
    items: m.items,
  };
}

export function isValidManifestItem(item: unknown): item is LegalUpdateManifestItem {
  if (typeof item !== 'object' || item == null) return false;
  const it = item as Record<string, unknown>;
  return (
    typeof it.title === 'string' &&
    it.title.length > 0 &&
    typeof it.official_url === 'string' &&
    it.official_url.length > 0 &&
    typeof it.id === 'string' &&
    it.id.length > 0 &&
    VALID_UPDATE_KINDS.includes(it.update_kind as UpdateKind) &&
    VALID_REF_TYPES.includes(it.ref_type as UpdateRefType) &&
    (it.act == null || typeof it.act === 'string') &&
    (it.section_number == null || typeof it.section_number === 'string') &&
    (it.gazette_id == null || typeof it.gazette_id === 'string') &&
    (it.summary == null || typeof it.summary === 'string')
  );
}

async function alreadyIngested(db: SQLiteDatabase, item: LegalUpdateManifestItem): Promise<boolean> {
  const byGazette = item.gazette_id
    ? await db.getFirstAsync<{ id: number }>(
        `SELECT id FROM legislation_updates WHERE gazette_id = ? LIMIT 1`,
        item.gazette_id,
      )
    : null;
  if (byGazette) return true;
  const byUrl = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM legislation_updates WHERE official_url = ? LIMIT 1`,
    item.official_url,
  );
  return !!byUrl;
}

async function ingestManifestItem(
  db: SQLiteDatabase,
  item: LegalUpdateManifestItem,
): Promise<'ingested' | 'skipped'> {
  if (await alreadyIngested(db, item)) return 'skipped';
  await ingestUpdate(db, {
    updateKind: item.update_kind as UpdateKind,
    refType: item.ref_type as UpdateRefType,
    actSlug: item.act ?? null,
    sectionNumber: item.section_number ?? null,
    title: item.title,
    summary: item.summary ?? null,
    officialUrl: item.official_url,
    gazetteId: item.gazette_id ?? null,
  });
  return 'ingested';
}

async function defaultFetcher(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function checkForUpdates(
  db: SQLiteDatabase,
  opts: { sources?: MonitorSource[]; fetcher?: ManifestFetcher } = {},
): Promise<MonitorResult> {
  const sources = opts.sources ?? DEFAULT_SOURCES;
  const fetcher = opts.fetcher ?? defaultFetcher;
  const checkedAt = new Date().toISOString();
  const results: MonitorSourceResult[] = [];
  let totalIngested = 0;

  for (const source of sources) {
    const result: MonitorSourceResult = {
      key: source.key,
      name: source.name,
      ok: false,
      fetched: 0,
      ingested: 0,
      skipped: 0,
      error: null,
      checked_at: checkedAt,
    };
    try {
      const manifest = parseManifest(await fetcher(source.url));
      if (!manifest) throw new Error('Invalid manifest shape');
      result.fetched = manifest.items.length;
      for (const item of manifest.items) {
        if (!isValidManifestItem(item)) {
          result.skipped += 1;
          continue;
        }
        if ((await ingestManifestItem(db, item)) === 'ingested') {
          result.ingested += 1;
          totalIngested += 1;
        } else {
          result.skipped += 1;
        }
      }
      result.ok = true;
    } catch (e) {
      result.error = e instanceof Error ? e.message : String(e);
    }
    await db.runAsync(
      `INSERT OR REPLACE INTO app_meta(key, value) VALUES ('monitor:${source.key}:error', ?)`,
      result.error ?? '',
    );
    results.push(result);
  }

  await db.runAsync(
    `INSERT OR REPLACE INTO app_meta(key, value) VALUES ('monitor_last_checked', ?)`,
    checkedAt,
  );
  return { checked_at: checkedAt, sources: results, total_ingested: totalIngested };
}

export async function getMonitorMeta(
  db: SQLiteDatabase,
): Promise<{ lastChecked: string | null; lastError: string | null }> {
  const lastChecked = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_meta WHERE key = 'monitor_last_checked' LIMIT 1`,
  );
  const firstSource = DEFAULT_SOURCES[0];
  const lastError = firstSource
    ? await db.getFirstAsync<{ value: string }>(
        `SELECT value FROM app_meta WHERE key = 'monitor:${firstSource.key}:error' LIMIT 1`,
      )
    : null;
  return {
    lastChecked: lastChecked?.value ?? null,
    lastError: lastError?.value && lastError.value.length > 0 ? lastError.value : null,
  };
}

export async function getAutoCheck(db: SQLiteDatabase): Promise<boolean> {
  const row = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_meta WHERE key = 'auto_check_updates' LIMIT 1`,
  );
  return row?.value === '1';
}

export async function setAutoCheck(db: SQLiteDatabase, on: boolean): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO app_meta(key, value) VALUES ('auto_check_updates', ?)`,
    on ? '1' : '0',
  );
}