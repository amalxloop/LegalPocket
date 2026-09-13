import type { SQLiteDatabase } from 'expo-sqlite';
import type { CompareSetRow, CompareMappingRow, ActRow } from '../../types';

export interface CompareSetWithActs extends CompareSetRow {
  old_act: ActRow;
  new_act: ActRow;
}

export async function listCompareSets(db: SQLiteDatabase): Promise<CompareSetWithActs[]> {
  const sets = await db.getAllAsync<CompareSetRow>(
    `SELECT * FROM compare_sets ORDER BY id`,
  );
  const result: CompareSetWithActs[] = [];
  for (const s of sets) {
    const oldAct = await db.getFirstAsync<ActRow>(
      `SELECT * FROM acts WHERE id = ?`,
      s.old_act_id,
    );
    const newAct = await db.getFirstAsync<ActRow>(
      `SELECT * FROM acts WHERE id = ?`,
      s.new_act_id,
    );
    if (oldAct && newAct) {
      result.push({ ...s, old_act: oldAct, new_act: newAct });
    }
  }
  return result;
}

export async function getCompareSet(
  db: SQLiteDatabase,
  id: number,
): Promise<CompareSetWithActs | null> {
  const s = await db.getFirstAsync<CompareSetRow>(
    `SELECT * FROM compare_sets WHERE id = ?`,
    id,
  );
  if (!s) return null;
  const oldAct = await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, s.old_act_id);
  const newAct = await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, s.new_act_id);
  if (!oldAct || !newAct) return null;
  return { ...s, old_act: oldAct, new_act: newAct };
}

export async function listMappings(
  db: SQLiteDatabase,
  setId: number,
): Promise<CompareMappingRow[]> {
  return db.getAllAsync<CompareMappingRow>(
    `SELECT * FROM compare_mappings WHERE set_id = ? ORDER BY sort_order, id`,
    setId,
  );
}

export interface SectionCrossRef {
  set: CompareSetRow;
  mapping: CompareMappingRow;
  isNew: boolean;
  setOldAct: ActRow | null;
  setNewAct: ActRow | null;
}

export async function crossReferencesForSection(
  db: SQLiteDatabase,
  actId: number,
  sectionNumber: string,
): Promise<SectionCrossRef[]> {
  const sets = await db.getAllAsync<CompareSetRow>(
    `SELECT * FROM compare_sets WHERE old_act_id = ? OR new_act_id = ?`,
    actId,
    actId,
  );
  const out: SectionCrossRef[] = [];
  for (const set of sets) {
    const mappings = await db.getAllAsync<CompareMappingRow>(
      `SELECT * FROM compare_mappings
       WHERE set_id = ? AND (old_section = ? OR new_section = ?)
       ORDER BY sort_order, id`,
      set.id,
      sectionNumber,
      sectionNumber,
    );
    for (const m of mappings) {
      const isNew = m.new_section === sectionNumber;
      const oldAct =
        (await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, set.old_act_id)) ?? null;
      const newAct =
        (await db.getFirstAsync<ActRow>(`SELECT * FROM acts WHERE id = ?`, set.new_act_id)) ?? null;
      out.push({ set, mapping: m, isNew, setOldAct: oldAct, setNewAct: newAct });
    }
  }
  return out;
}