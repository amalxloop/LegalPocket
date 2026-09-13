import type { SQLiteDatabase } from 'expo-sqlite';
import type { ActRow, ActWithCount, ChapterRow, SectionRow } from '../../types';

export interface ActWithCountQuery extends ActRow {
  section_count: number;
}

export async function listActs(
  db: SQLiteDatabase,
  opts: { category?: string; jurisdiction?: string; status?: string; search?: string } = {},
): Promise<ActWithCount[]> {
  const clauses: string[] = [];
  const args: (string | number)[] = [];

  if (opts.category && opts.category !== 'All') {
    clauses.push('a.category = ?');
    args.push(opts.category);
  }
  if (opts.jurisdiction) {
    clauses.push('a.jurisdiction = ?');
    args.push(opts.jurisdiction);
  }
  if (opts.status) {
    clauses.push('a.status = ?');
    args.push(opts.status);
  }
  if (opts.search) {
    clauses.push('(a.short_title LIKE ? OR a.description LIKE ?)');
    const like = `%${opts.search}%`;
    args.push(like, like);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = await db.getAllAsync<ActWithCount>(
    `SELECT a.*, (SELECT COUNT(*) FROM sections s WHERE s.act_id = a.id) AS section_count
     FROM acts a
     ${where}
     ORDER BY a.status = 'active' DESC, a.short_title ASC`,
    ...args,
  );
  return rows;
}

export async function getAct(db: SQLiteDatabase, id: number): Promise<ActRow | null> {
  const row = await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, id);
  return row ?? null;
}

export async function getActBySlug(db: SQLiteDatabase, slug: string): Promise<ActRow | null> {
  const row = await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE slug = ?`, slug);
  return row ?? null;
}

export async function listChapters(db: SQLiteDatabase, actId: number): Promise<ChapterRow[]> {
  return db.getAllAsync<ChapterRow>(
    `SELECT * FROM chapters WHERE act_id = ? ORDER BY sort_order, id`,
    actId,
  );
}

export async function listSections(
  db: SQLiteDatabase,
  actId: number,
): Promise<SectionRow[]> {
  return db.getAllAsync<SectionRow>(
    `SELECT * FROM sections WHERE act_id = ? ORDER BY sort_order, id`,
    actId,
  );
}

export async function getSection(db: SQLiteDatabase, id: number): Promise<SectionRow | null> {
  return (await db.getFirstAsync<SectionRow>(`SELECT * FROM sections WHERE id = ?`, id)) ?? null;
}

export async function getChapter(db: SQLiteDatabase, id: number | null): Promise<ChapterRow | null> {
  if (id == null) return null;
  return (await db.getFirstAsync<ChapterRow>(`SELECT * FROM chapters WHERE id = ?`, id)) ?? null;
}

export async function listCategories(db: SQLiteDatabase): Promise<string[]> {
  const rows = await db.getAllAsync<{ category: string }>(
    `SELECT DISTINCT category FROM acts ORDER BY category ASC`,
  );
  return rows.map((r) => r.category);
}