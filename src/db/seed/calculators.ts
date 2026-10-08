import type { SQLiteDatabase } from 'expo-sqlite';
import {
  COURT_FEE_SEED,
  type CourtFeeSeedJurisdiction,
} from './court-fees-data';
import {
  LIMITATION_SEED,
  type LimitationSeedEntry,
  type LimitationSeedRef,
} from './limitation-data';

// PRD 3A: court fee & limitation calculator data. Rows ship as
// content_status='placeholder' / verified=0 via schema defaults so the
// editorial pipeline (Section 3E) can review them before marking verified.

export function buildCourtFeeRows(): CourtFeeSeedJurisdiction[] {
  return COURT_FEE_SEED;
}

export function buildLimitationEntries(): LimitationSeedEntry[] {
  return LIMITATION_SEED.entries;
}

export function buildLimitationRefs(): LimitationSeedRef[] {
  return LIMITATION_SEED.refs;
}

export async function seedCalculators(db: SQLiteDatabase): Promise<void> {
  const feeCount = await db.getFirstAsync<{ c: number }>(
    `SELECT COUNT(*) AS c FROM court_fee_rules`,
  );
  if (!feeCount || feeCount.c === 0) {
    for (const j of COURT_FEE_SEED) {
      await db.runAsync(
        `INSERT INTO court_fee_rules (slug, name, statute, basis, status, confidence, bands, cap, source_url, as_of, note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        j.slug,
        j.name,
        j.statute,
        j.basis,
        j.status,
        j.confidence,
        JSON.stringify(j.bands),
        j.cap,
        j.source_url,
        j.as_of,
        j.note,
      );
    }
  }

  const entryCount = await db.getFirstAsync<{ c: number }>(
    `SELECT COUNT(*) AS c FROM limitation_entries`,
  );
  if (!entryCount || entryCount.c === 0) {
    for (const e of LIMITATION_SEED.entries) {
      await db.runAsync(
        `INSERT INTO limitation_entries (slug, label, article, kind, period, period_value, period_unit, court_type, division, accrual, exceptions, related_articles, source_url, source_secondary, as_of, confidence)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        e.slug,
        e.label,
        e.article,
        e.kind,
        e.period,
        e.period_value,
        e.period_unit,
        e.court_type,
        e.division,
        e.accrual,
        JSON.stringify(e.exceptions),
        JSON.stringify(e.related_articles),
        e.source_url,
        e.source_secondary,
        e.as_of,
        e.confidence,
      );
    }
  }

  const refCount = await db.getFirstAsync<{ c: number }>(
    `SELECT COUNT(*) AS c FROM limitation_refs`,
  );
  if (!refCount || refCount.c === 0) {
    for (const r of LIMITATION_SEED.refs) {
      await db.runAsync(
        `INSERT INTO limitation_refs (kind, ref_key, title, body, exceptions, source_url, as_of, confidence)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        r.kind,
        r.ref_key,
        r.title,
        r.body,
        r.exceptions ? JSON.stringify(r.exceptions) : null,
        r.source_url,
        r.as_of,
        r.confidence,
      );
    }
  }
}
