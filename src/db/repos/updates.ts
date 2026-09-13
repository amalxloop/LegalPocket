import type { SQLiteDatabase } from 'expo-sqlite';
import type {
  ActRow,
  LegislationUpdate,
  SectionVersion,
  UpdateKind,
  UpdateRefType,
  UpdateStatus,
} from '../../types';

export interface IngestInput {
  updateKind: UpdateKind;
  refType: UpdateRefType;
  actSlug?: string | null;
  sectionNumber?: string | null;
  articleId?: number | null;
  title: string;
  summary?: string | null;
  officialUrl?: string | null;
  gazetteId?: string | null;
}

export interface PublishOptions {
  effectiveFrom?: string | null;
  newBody?: string | null;
  newTitle?: string | null;
}

function localStamp(): string {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export interface UpdateFeedRow extends LegislationUpdate {
  act_slug: string | null;
  act_short_title: string | null;
  act_category: string | null;
  act_last_updated: string | null;
  act_official_url: string | null;
  act_status: ActRow['status'] | null;
  act_year: number | null;
  act_number: string | null;
  act_jurisdiction: string | null;
  act_description: string | null;
}

export async function listUpdates(
  db: SQLiteDatabase,
  opts: { status?: UpdateStatus; excludeRejected?: boolean; limit?: number } = {},
): Promise<UpdateFeedRow[]> {
  const clauses: string[] = [];
  const args: (string | number)[] = [];
  if (opts.status) {
    clauses.push('u.status = ?');
    args.push(opts.status);
  }
  if (opts.excludeRejected) {
    clauses.push('u.status != ?');
    args.push('rejected');
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const limit = opts.limit ?? 100;
  return db.getAllAsync<UpdateFeedRow>(
    `SELECT u.*, a.slug AS act_slug, a.short_title AS act_short_title,
            a.category AS act_category, a.last_updated AS act_last_updated,
            a.official_url AS act_official_url, a.status AS act_status,
            a.year AS act_year, a.act_number AS act_number,
            a.jurisdiction AS act_jurisdiction, a.description AS act_description
     FROM legislation_updates u
     LEFT JOIN acts a ON a.id = u.act_id
     ${where}
     ORDER BY COALESCE(u.published_at, u.under_review_at, u.detected_at) DESC
     LIMIT ${limit}`,
    ...args,
  );
}

export interface UpdateWithAct extends LegislationUpdate {
  act: ActRow | null;
}

export async function getUpdate(db: SQLiteDatabase, id: number): Promise<UpdateWithAct | null> {
  const rows = await db.getAllAsync<LegislationUpdate>(
    `SELECT * FROM legislation_updates WHERE id = ? LIMIT 1`,
    id,
  );
  const u = rows[0];
  if (!u) return null;
  const act = u.act_id != null
    ? await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, u.act_id)
    : null;
  return { ...u, act };
}

export async function ingestUpdate(db: SQLiteDatabase, input: IngestInput): Promise<number> {
  let actId: number | null = null;
  if (input.actSlug) {
    const row = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM acts WHERE slug = ?`,
      input.actSlug,
    );
    actId = row?.id ?? null;
  }
  const res = await db.runAsync(
    `INSERT INTO legislation_updates
       (update_kind, ref_type, ref_id, act_id, section_number, title, summary, official_url, gazette_id, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'detected')`,
    input.updateKind,
    input.refType,
    input.articleId ?? null,
    actId,
    input.sectionNumber ?? null,
    input.title,
    input.summary ?? null,
    input.officialUrl ?? null,
    input.gazetteId ?? null,
  );
  return Number(res.lastInsertRowId);
}

export async function setUnderReview(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync(
    `UPDATE legislation_updates SET status = 'under_review', under_review_at = ? WHERE id = ?`,
    localStamp(),
    id,
  );
}

export async function approveUpdate(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync(
    `UPDATE legislation_updates SET status = 'approved', reviewed_at = ? WHERE id = ?`,
    localStamp(),
    id,
  );
}

export async function rejectUpdate(db: SQLiteDatabase, id: number, reason?: string): Promise<void> {
  await db.runAsync(
    `UPDATE legislation_updates SET status = 'rejected', reviewer_note = ?, reviewed_at = ? WHERE id = ?`,
    reason ?? null,
    localStamp(),
    id,
  );
}

async function nextVersionNo(db: SQLiteDatabase, table: string, idColumn: string, id: number): Promise<number> {
  const row = await db.getFirstAsync<{ m: number }>(
    `SELECT COALESCE(MAX(version_no), 0) AS m FROM ${table} WHERE ${idColumn} = ?`,
    id,
  );
  return (row?.m ?? 0) + 1;
}

export async function publishUpdate(
  db: SQLiteDatabase,
  id: number,
  opts: PublishOptions = {},
): Promise<void> {
  const update = await getUpdate(db, id);
  if (!update) throw new Error(`Update ${id} not found`);
  if (update.status === 'published') return;

  const effective = opts.effectiveFrom ?? localStamp().slice(0, 10);
  let changedSections: string | null = null;

  if (update.update_kind === 'amendment' && update.ref_type === 'section' && update.act_id && update.section_number) {
    const section = await db.getFirstAsync<{ id: number; number: string; title: string | null; body: string }>(
      `SELECT id, number, title, body FROM sections WHERE act_id = ? AND number = ?`,
      update.act_id,
      update.section_number,
    );
    if (section) {
      const next = await nextVersionNo(db, 'section_versions', 'section_id', section.id);
      await db.runAsync(
        `INSERT INTO section_versions (section_id, version_no, old_body, new_body, effective_from, source_url, gazette_id, note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        section.id,
        next,
        section.body,
        opts.newBody ?? section.body,
        effective,
        update.official_url,
        update.gazette_id,
        update.title,
      );
      if (opts.newBody != null) {
        await db.runAsync(`UPDATE sections SET body = ?, title = COALESCE(?, title), last_amended = ? WHERE id = ?`,
          opts.newBody,
          opts.newTitle ?? null,
          effective,
          section.id,
        );
      } else {
        await db.runAsync(`UPDATE sections SET last_amended = ? WHERE id = ?`, effective, section.id);
      }
      changedSections = String(section.number);
    }
  }

  if (update.act_id != null) {
    const act = await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, update.act_id);
    if (act) {
      const next = await nextVersionNo(db, 'act_versions', 'act_id', act.id);
      await db.runAsync(
        `INSERT INTO act_versions (act_id, version_no, effective_from, note, source_url, gazette_id, changed_sections)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        act.id,
        next,
        effective,
        update.title,
        update.official_url,
        update.gazette_id,
        changedSections,
      );
      let statusClause = `last_updated = ?`;
      const args: (string | number)[] = [effective];
      if (update.update_kind === 'commencement') {
        statusClause = `status = 'active', last_updated = ?`;
      } else if (update.update_kind === 'repeal') {
        statusClause = `status = 'repealed', last_updated = ?`;
      }
      await db.runAsync(`UPDATE acts SET ${statusClause} WHERE id = ?`, ...args, act.id);
    }
  }

  await db.runAsync(
    `UPDATE legislation_updates
     SET status = 'published',
         published_at = ?,
         version_no = COALESCE(version_no, ?),
         reviewed_at = COALESCE(reviewed_at, ?)
     WHERE id = ?`,
    localStamp(),
    1,
    localStamp(),
    id,
  );
}

export async function sectionVersionHistory(db: SQLiteDatabase, sectionId: number): Promise<SectionVersion[]> {
  return db.getAllAsync<SectionVersion>(
    `SELECT * FROM section_versions WHERE section_id = ? ORDER BY version_no DESC`,
    sectionId,
  );
}

export async function actVersionHistory(
  db: SQLiteDatabase,
  actId: number,
): Promise<{ id: number; version_no: number; effective_from: string | null; note: string | null; source_url: string | null; gazette_id: string | null; changed_sections: string | null; created_at: string }[]> {
  return db.getAllAsync(
    `SELECT * FROM act_versions WHERE act_id = ? ORDER BY version_no DESC`,
    actId,
  );
}