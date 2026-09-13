import type { SQLiteDatabase } from 'expo-sqlite';
import type { SearchResult, SearchResultSection, SearchResultArticle, SearchResultAct } from '../../types';

export const SEARCHABLE_TYPES = ['all', 'section', 'article', 'act'] as const;
export type SearchType = (typeof SEARCHABLE_TYPES)[number];

const SYNONYM_EXPANSIONS: Record<string, string[]> = {
  fir: ['FIR', 'first information report'],
  ipc: ['Indian Penal Code'],
  crpc: ['Code of Criminal Procedure'],
  bnss: ['Bharatiya Nagarik Suraksha Sanhita'],
  bns: ['Bharatiya Nyaya Sanhita'],
  bsa: ['Bharatiya Sakshya Adhiniyam', 'evidence'],
  rti: ['Right to Information'],
  poa: ['power of attorney'],
  'cheque bounce': ['dishonour of cheque'],
  cybercrime: ['cyber crime', 'computer related', 'information technology'],
  cyber: ['computer related', 'information technology', 'identity theft'],
};

export function expandQuery(raw: string): string[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  const expansions = [raw.trim()];
  for (const [key, alts] of Object.entries(SYNONYM_EXPANSIONS)) {
    if ((key.includes(' ') && q === key) || q === key) {
      for (const alt of alts) expansions.push(alt);
    }
  }
  return [...new Set(expansions)];
}

function toFtsQuery(text: string): string {
  const tokens = text
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean);
  if (!tokens.length) return '';
  return tokens.map((t) => `"${t}"`).join(' AND ');
}

interface SectionHit {
  id: number;
  number: string;
  title: string | null;
  body: string;
  summary: string | null;
  act_id: number;
  act_title: string;
  act_slug: string;
  snippet: string;
  sortorder: number;
  exact: number;
}

interface ArticleHit {
  id: number;
  number: string;
  title: string | null;
  body: string;
  part_title: string;
  snippet: string;
  sortorder: number;
  exact: number;
}

export async function unifiedSearch(
  db: SQLiteDatabase,
  rawQuery: string,
  type: SearchType = 'all',
): Promise<SearchResult[]> {
  const queries = expandQuery(rawQuery);
  if (!queries.length) return [];
  const results: SearchResult[] = [];

  if (type === 'all' || type === 'section') {
    const hits = await searchSections(db, queries);
    for (const h of hits) {
      results.push({
        type: 'section',
        section: {
          id: h.id,
          act_id: h.act_id,
          chapter_id: null,
          number: h.number,
          title: h.title,
          body: h.body,
          summary: h.summary,
          sort_order: 0,
          last_amended: null,
        },
        actTitle: h.act_title,
        actSlug: h.act_slug,
        highlight: h.snippet,
      } satisfies SearchResultSection);
    }
  }

  if (type === 'all' || type === 'article') {
    const hits = await searchArticles(db, queries);
    for (const h of hits) {
      results.push({
        type: 'article',
        article: {
          id: h.id,
          part_id: 0,
          number: h.number,
          title: h.title,
          body: h.body,
          summary: null,
          sort_order: 0,
        },
        partTitle: h.part_title,
        highlight: h.snippet,
      } satisfies SearchResultArticle);
    }
  }

  if (type === 'all' || type === 'act') {
    const actHits = await searchActs(db, queries);
    for (const a of actHits) {
      results.push({ type: 'act', act: a, highlight: a.short_title } satisfies SearchResultAct);
    }
  }

  results.sort((a, b) => rankOf(a) - rankOf(b));
  return results;
}

function rankOf(r: SearchResult): number {
  switch (r.type) {
    case 'section':
      return r.section.number === cleanNumberQuery(r.highlight) ? 0 : r.section.id ? 10 : 10;
    case 'article':
      return r.article.id ? 20 : 20;
    case 'act':
      return r.act.id ? 30 : 30;
  }
}

function cleanNumberQuery(x: string): string {
  return x.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
}

async function searchSections(db: SQLiteDatabase, queries: string[]): Promise<SectionHit[]> {
  const perQuery: SectionHit[][] = [];
  for (const q of queries) {
    const fts = toFtsQuery(q);
    if (!fts) continue;
    let rows: SectionHit[] = [];
    try {
      rows = await db.getAllAsync<SectionHit>(
        `SELECT s.id, s.number, s.title, s.body, s.summary, s.act_id,
                a.short_title AS act_title, a.slug AS act_slug,
                snippet(sections_fts, 2, '[', ']', '…', 14) AS snippet,
                1 AS sortorder,
                CASE WHEN s.number = ? THEN 0 ELSE 1 END AS exact
         FROM sections_fts
         JOIN sections s ON s.id = sections_fts.rowid
         JOIN acts a ON a.id = s.act_id
         WHERE sections_fts MATCH ?
           AND s.body NOT LIKE '[Content pending%'
         ORDER BY exact ASC, bm25(sections_fts, 10.0, 5.0, 1.0, 2.0) ASC
         LIMIT 30`,
        q.trim(),
        fts,
      );
    } catch {
      // FTS error (e.g. query too short/diacritic issues) — fall through
    }
    perQuery.push(rows);
  }
  return mergeDedup(perQuery);
}

async function searchArticles(db: SQLiteDatabase, queries: string[]): Promise<ArticleHit[]> {
  const perQuery: ArticleHit[][] = [];
  for (const q of queries) {
    const fts = toFtsQuery(q);
    if (!fts) continue;
    let rows: ArticleHit[] = [];
    try {
      rows = await db.getAllAsync<ArticleHit>(
        `SELECT ar.id, ar.number, ar.title, ar.body, p.title AS part_title,
                snippet(articles_fts, 2, '[', ']', '…', 14) AS snippet,
                1 AS sortorder,
                CASE WHEN ar.number = ? THEN 0 ELSE 1 END AS exact
         FROM articles_fts
         JOIN articles ar ON ar.id = articles_fts.rowid
         JOIN parts p ON p.id = ar.part_id
         WHERE articles_fts MATCH ?
           AND ar.body NOT LIKE '[Content pending%'
         ORDER BY exact ASC, bm25(articles_fts, 10.0, 5.0, 1.0, 2.0) ASC
         LIMIT 20`,
        q.trim(),
        fts,
      );
    } catch {
      // no-op
    }
    perQuery.push(rows);
  }
  return mergeDedup(perQuery);
}

async function searchActs(db: SQLiteDatabase, queries: string[]): Promise<import('../../types').ActRow[]> {
  const seen = new Set<number>();
  const out: import('../../types').ActRow[] = [];
  for (const q of queries) {
    const like = `%${q}%`;
    const rows = await db.getAllAsync<import('../../types').ActRow>(
      `SELECT * FROM acts WHERE short_title LIKE ? OR description LIKE ?
       ORDER BY CASE WHEN short_title LIKE ? THEN 0 ELSE 1 END
       LIMIT 20`,
      like,
      like,
      `%${q}%`,
    );
    for (const r of rows) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      out.push(r);
    }
  }
  return out.slice(0, 20);
}

function mergeDedup<T extends { id: number }>(groups: T[][]): T[] {
  const seen = new Set<number>();
  const out: T[] = [];
  for (const group of groups) {
    for (const item of group) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
  }
  return out;
}