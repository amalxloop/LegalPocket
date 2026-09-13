import type { SQLiteDatabase } from 'expo-sqlite';
import type { BookmarkItemType, BookmarkedItem, BookmarkRow } from '../../types';

export async function isBookmarked(
  db: SQLiteDatabase,
  itemType: BookmarkItemType,
  itemId: number,
): Promise<boolean> {
  const row = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM bookmarks WHERE item_type = ? AND item_id = ?`,
    itemType,
    itemId,
  );
  return row != null;
}

export async function addBookmark(
  db: SQLiteDatabase,
  itemType: BookmarkItemType,
  itemId: number,
): Promise<void> {
  await db.runAsync(
    `INSERT OR IGNORE INTO bookmarks (item_type, item_id) VALUES (?, ?)`,
    itemType,
    itemId,
  );
}

export async function removeBookmark(
  db: SQLiteDatabase,
  itemType: BookmarkItemType,
  itemId: number,
): Promise<void> {
  await db.runAsync(
    `DELETE FROM bookmarks WHERE item_type = ? AND item_id = ?`,
    itemType,
    itemId,
  );
}

export async function toggleBookmark(
  db: SQLiteDatabase,
  itemType: BookmarkItemType,
  itemId: number,
): Promise<boolean> {
  const exists = await isBookmarked(db, itemType, itemId);
  if (exists) {
    await removeBookmark(db, itemType, itemId);
    return false;
  }
  await addBookmark(db, itemType, itemId);
  return true;
}

export interface BookmarkedRow extends BookmarkRow {
  title: string | null;
  subtitle: string | null;
  body_preview: string | null;
}

export async function listBookmarks(db: SQLiteDatabase): Promise<BookmarkedItem[]> {
  const rows = await db.getAllAsync<BookmarkedRow>(`
    SELECT b.id, b.item_type, b.item_id, b.created_at,
           b.note,
           CASE b.item_type
             WHEN 'act'     THEN (SELECT short_title FROM acts a WHERE a.id = b.item_id)
             WHEN 'section' THEN 'Section ' || (SELECT s.number FROM sections s WHERE s.id = b.item_id)
             WHEN 'article' THEN 'Article ' || (SELECT ar.number FROM articles ar WHERE ar.id = b.item_id)
             WHEN 'part'    THEN (SELECT p.title FROM parts p WHERE p.id = b.item_id)
           END AS title,
           CASE b.item_type
             WHEN 'act'     THEN (SELECT a.category FROM acts a WHERE a.id = b.item_id)
             WHEN 'section' THEN (SELECT a.short_title FROM sections s JOIN acts a ON a.id = s.act_id WHERE s.id = b.item_id)
             WHEN 'article' THEN (SELECT p.title FROM articles ar JOIN parts p ON p.id = ar.part_id WHERE ar.id = b.item_id)
             WHEN 'part'    THEN CAST(p.number AS TEXT)
           END AS subtitle,
           CASE b.item_type
             WHEN 'act'     THEN (SELECT a.description FROM acts a WHERE a.id = b.item_id)
             WHEN 'section' THEN (SELECT s.body FROM sections s WHERE s.id = b.item_id)
             WHEN 'article' THEN (SELECT ar.body FROM articles ar WHERE ar.id = b.item_id)
             WHEN 'part'    THEN NULL
           END AS body_preview
    FROM bookmarks b
    ORDER BY b.created_at DESC
  `);
  return rows.map((r) => ({
    bookmarkId: r.id,
    createdAt: r.created_at,
    itemType: r.item_type,
    itemId: r.item_id,
    title: r.title ?? '',
    subtitle: r.subtitle ?? '',
    bodyPreview: r.body_preview ?? null,
  }));
}

export async function bookmarksCount(db: SQLiteDatabase): Promise<number> {
  const row = await db.getFirstAsync<{ c: number }>(`SELECT COUNT(*) AS c FROM bookmarks`);
  return row?.c ?? 0;
}