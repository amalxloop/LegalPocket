import type { SQLiteDatabase } from 'expo-sqlite';
import type { ArticleRow, PartRow, PartWithCount } from '../../types';

export async function listParts(db: SQLiteDatabase): Promise<PartWithCount[]> {
  return db.getAllAsync<PartWithCount>(
    `SELECT p.*, (SELECT COUNT(*) FROM articles a WHERE a.part_id = p.id) AS article_count
     FROM parts p ORDER BY p.sort_order, p.id`,
  );
}

export async function getPart(db: SQLiteDatabase, id: number): Promise<PartRow | null> {
  return (await db.getFirstAsync<PartRow>(`SELECT * FROM parts WHERE id = ?`, id)) ?? null;
}

export async function listArticlesInPart(db: SQLiteDatabase, partId: number): Promise<ArticleRow[]> {
  return db.getAllAsync<ArticleRow>(
    `SELECT * FROM articles WHERE part_id = ? ORDER BY sort_order, id`,
    partId,
  );
}

export async function getArticle(db: SQLiteDatabase, id: number): Promise<ArticleRow | null> {
  return (await db.getFirstAsync<ArticleRow>(`SELECT * FROM articles WHERE id = ?`, id)) ?? null;
}

export async function listSchedules(db: SQLiteDatabase): Promise<{ id: number; number: string; title: string; body: string | null }[]> {
  return db.getAllAsync<{ id: number; number: string; title: string; body: string | null }>(
    `SELECT * FROM schedules ORDER BY id`,
  );
}

export async function getPreamble(db: SQLiteDatabase): Promise<ArticleRow | null> {
  return (
    (await db.getFirstAsync<ArticleRow>(
      `SELECT * FROM articles WHERE number = 'Preamble' ORDER BY id LIMIT 1`,
    )) ?? null
  );
}