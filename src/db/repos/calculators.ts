import type { SQLiteDatabase } from 'expo-sqlite';
import type {
  CourtFeeRuleRow,
  LimitationEntryRow,
  LimitationRefRow,
} from '../../types';
import type { FeeBand } from '../../lib/court-fee';

export interface CourtFeeRule extends Omit<CourtFeeRuleRow, 'bands'> {
  bands: FeeBand[];
}

export interface LimitationEntry extends LimitationEntryRow {
  exceptionsList: string[];
  relatedArticlesList: string[];
}

export interface LimitationRef extends LimitationRefRow {
  exceptionsList: string[] | null;
}

export function parseBands(json: string): FeeBand[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as FeeBand[]) : [];
  } catch {
    return [];
  }
}

function parseStringList(json: string | null): string[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

// Ready rules first (alphabetical), then honest unknowns.
export async function listCourtFeeJurisdictions(
  db: SQLiteDatabase,
): Promise<CourtFeeRuleRow[]> {
  return db.getAllAsync<CourtFeeRuleRow>(
    `SELECT * FROM court_fee_rules
     ORDER BY CASE status WHEN 'ready' THEN 0 ELSE 1 END, name`,
  );
}

export async function getCourtFeeRule(
  db: SQLiteDatabase,
  slug: string,
): Promise<CourtFeeRule | null> {
  const row = await db.getFirstAsync<CourtFeeRuleRow>(
    `SELECT * FROM court_fee_rules WHERE slug = ?`,
    slug,
  );
  if (!row) return null;
  return { ...row, bands: parseBands(row.bands) };
}

export async function listLimitationEntries(
  db: SQLiteDatabase,
  opts: { q?: string; kind?: 'suit' | 'appeal_application' } = {},
): Promise<LimitationEntry[]> {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (opts.kind) {
    where.push('kind = ?');
    params.push(opts.kind);
  }
  const q = opts.q?.trim();
  if (q) {
    where.push(
      '(label LIKE ? OR article LIKE ? OR accrual LIKE ? OR period LIKE ?)',
    );
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }
  const sql =
    'SELECT * FROM limitation_entries' +
    (where.length ? ` WHERE ${where.join(' AND ')}` : '') +
    ` ORDER BY kind, CAST(article AS INTEGER), article, id`;
  const rows = await db.getAllAsync<LimitationEntryRow>(sql, ...params);
  return rows.map((r) => ({
    ...r,
    exceptionsList: parseStringList(r.exceptions),
    relatedArticlesList: parseStringList(r.related_articles),
  }));
}

export async function getLimitationEntry(
  db: SQLiteDatabase,
  slug: string,
): Promise<LimitationEntry | null> {
  const row = await db.getFirstAsync<LimitationEntryRow>(
    `SELECT * FROM limitation_entries WHERE slug = ?`,
    slug,
  );
  if (!row) return null;
  return {
    ...row,
    exceptionsList: parseStringList(row.exceptions),
    relatedArticlesList: parseStringList(row.related_articles),
  };
}

export async function listLimitationRefs(
  db: SQLiteDatabase,
  kind?: 'section' | 'note',
): Promise<LimitationRef[]> {
  const sql = kind
    ? `SELECT * FROM limitation_refs WHERE kind = ? ORDER BY id`
    : `SELECT * FROM limitation_refs ORDER BY kind, id`;
  const rows = kind
    ? await db.getAllAsync<LimitationRefRow>(sql, kind)
    : await db.getAllAsync<LimitationRefRow>(sql);
  return rows.map((r) => ({
    ...r,
    exceptionsList: r.exceptions ? parseStringList(r.exceptions) : null,
  }));
}
