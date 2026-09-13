import type { SQLiteDatabase } from 'expo-sqlite';
import { buildPartRows, buildArticleRows, buildScheduleRows, PREAMBLE } from './constitution';
import { buildActRows, buildChapterRows, buildSectionRows } from './acts';
import { seedCompareSets } from './compare';

export async function runSeed(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('BEGIN;');
  try {
    await seedConstitution(db);
    const actIdsBySlug = await seedActs(db);
    await seedCompare(db, actIdsBySlug);
    await db.execAsync('COMMIT;');
  } catch (e) {
    await db.execAsync('ROLLBACK;');
    throw e;
  }
}

async function seedConstitution(db: SQLiteDatabase): Promise<void> {
  const parts = buildPartRows();

  // Preamble stored as an article with part_id 0 sentinel (not tied to a part).
  await db.runAsync(
    `INSERT INTO parts (number, title, display_title, sort_order) VALUES (?, ?, ?, ?)`,
    'PRE',
    'Preamble',
    'PREAMBLE',
    0,
  );

  for (const p of parts) {
    await db.runAsync(
      `INSERT INTO parts (number, title, display_title, sort_order) VALUES (?, ?, ?, ?)`,
      p.number,
      p.title,
      p.display_title,
      p.sort_order,
    );
  }

  await db.runAsync(
    `INSERT INTO articles (part_id, number, title, body, summary, sort_order)
     VALUES (1, 'Preamble', 'Preamble', ?, ?, 0)`,
    PREAMBLE,
    'The Preamble to the Constitution of India. Note: "socialist", "secular" and "integrity" were added by the Constitution (Forty-Second Amendment) Act, 1976.',
  );

  const articles = buildArticleRows();
  for (const a of articles) {
    await db.runAsync(
      `INSERT INTO articles (part_id, number, title, body, summary, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      a.part_id,
      a.number,
      a.title,
      a.body,
      a.summary,
      a.sort_order,
    );
  }

  const schedules = buildScheduleRows();
  for (const s of schedules) {
    await db.runAsync(
      `INSERT INTO schedules (number, title, body) VALUES (?, ?, ?)`,
      s.number,
      s.title,
      s.body,
    );
  }
}

async function seedActs(db: SQLiteDatabase): Promise<Map<string, number>> {
  const actIdsBySlug = new Map<string, number>();
  for (const a of buildActRows()) {
    const res = await db.runAsync(
      `INSERT INTO acts (slug, short_title, year, act_number, jurisdiction, category, status, description, last_updated, official_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      a.slug,
      a.short_title,
      a.year,
      a.act_number,
      a.jurisdiction,
      a.category,
      a.status,
      a.description,
      a.last_updated,
      a.official_url,
    );
    actIdsBySlug.set(a.slug, res.lastInsertRowId);
  }

  for (const { actId, chapters } of buildChapterRows()) {
    for (const c of chapters) {
      await db.runAsync(
        `INSERT INTO chapters (act_id, number, title, display_title, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        actId,
        c.number,
        c.title,
        c.display_title,
        c.sort_order,
      );
    }
  }

  // Chapter ids are needed for sections; query them back per act.
  const chapterIdsByAct = new Map<number, Map<string, number>>();
  const chapterRows = await db.getAllAsync<{ id: number; act_id: number; number: string }>(
    `SELECT id, act_id, number FROM chapters ORDER BY act_id, sort_order`,
  );
  for (const row of chapterRows) {
    let m = chapterIdsByAct.get(row.act_id);
    if (!m) {
      m = new Map();
      chapterIdsByAct.set(row.act_id, m);
    }
    m.set(row.number, row.id);
  }

  for (const { actId, rows } of buildSectionRows()) {
    for (const s of rows) {
      // resolution of chapter_id handled in buildSectionRows index vs act chapters
      const chapterMap = chapterIdsByAct.get(actId);
      await db.runAsync(
        `INSERT INTO sections (act_id, chapter_id, number, title, body, summary, sort_order, last_amended)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        actId,
        s.chapter_id ?? null,
        s.number,
        s.title,
        s.body,
        s.summary,
        s.sort_order,
        s.last_amended,
      );
      void chapterMap;
    }
  }

  return actIdsBySlug;
}

async function seedCompare(
  db: SQLiteDatabase,
  actIdsBySlug: Map<string, number>,
): Promise<void> {
  const { mappings } = await seedCompareSets(db, actIdsBySlug);
  for (const m of mappings) {
    if (m.id !== -1) continue;
    await db.runAsync(
      `INSERT INTO compare_mappings (set_id, old_section, new_section, description, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      m.set_id,
      m.old_section,
      m.new_section,
      m.description,
      m.status,
      m.sort_order,
    );
  }
}