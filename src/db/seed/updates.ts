import type { SQLiteDatabase } from 'expo-sqlite';

// Section 3E demo records. Published items reflect verified real commencement
// dates; the pending item is an explicit placeholder for the editorial workflow.
export async function seedPipelineSamples(db: SQLiteDatabase): Promise<void> {
  const count = await db.getFirstAsync<{ c: number }>(
    `SELECT COUNT(*) AS c FROM legislation_updates`,
  );
  if (count && count.c > 0) return;

  const actId = async (slug: string): Promise<number | null> => {
    const row = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM acts WHERE slug = ?`,
      slug,
    );
    return row?.id ?? null;
  };

  const bnsId = await actId('bns-2023');
  const bnssId = await actId('bnss-2023');
  const bsaId = await actId('bsa-2023');
  const niId = await actId('negotiable-instruments-act-1881');

  const source = 'https://www.egazette.gov.in';

  if (bnsId != null) {
    await db.runAsync(
      `INSERT INTO legislation_updates (update_kind, ref_type, act_id, title, summary, official_url, gazette_id, status, detected_at, published_at, version_no)
       VALUES ('commencement', 'act', ?, ?, ?, ?, ?, 'published', '2024-07-01 00:00:00', '2024-07-01 00:00:00', 1)`,
      bnsId,
      'Bharatiya Nyaya Sanhita (BNS), 2023 came into force',
      'The BNS replaced the Indian Penal Code, 1860 and came into force on 1 July 2024 via a commencement notification.',
      source,
      'S.O. 2641(E), dated 17 December 2023',
    );
  }

  if (bnssId != null) {
    await db.runAsync(
      `INSERT INTO legislation_updates (update_kind, ref_type, act_id, title, summary, official_url, gazette_id, status, detected_at, published_at, version_no)
       VALUES ('commencement', 'act', ?, ?, ?, ?, ?, 'published', '2024-07-01 00:00:00', '2024-07-01 00:00:00', 1)`,
      bnssId,
      'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 came into force',
      'The BNSS replaced the Code of Criminal Procedure, 1973 and came into force on 1 July 2024 via a commencement notification.',
      source,
      'S.O. 2641(E), dated 17 December 2023',
    );
  }

  if (bsaId != null) {
    await db.runAsync(
      `INSERT INTO legislation_updates (update_kind, ref_type, act_id, title, summary, official_url, gazette_id, status, detected_at, published_at, version_no)
       VALUES ('commencement', 'act', ?, ?, ?, ?, ?, 'published', '2024-07-01 00:00:00', '2024-07-01 00:00:00', 1)`,
      bsaId,
      'Bharatiya Sakshya Adhiniyam (BSA), 2023 came into force',
      'The BSA replaced the Indian Evidence Act, 1872 and came into force on 1 July 2024 via a commencement notification.',
      source,
      'S.O. 2641(E), dated 17 December 2023',
    );
  }

  if (niId != null) {
    await db.runAsync(
      `INSERT INTO legislation_updates (update_kind, ref_type, act_id, section_number, title, summary, official_url, status, detected_at, under_review_at)
       VALUES ('amendment', 'section', ?, '138', 'PENDING REVIEW — Update to Negotiable Instruments Act, 1881 §138', 'Placeholder record demonstrating the Section 3E editorial-review workflow. Replace with a verified e-Gazette notification and reviewed text before publishing.', ?, 'under_review', '2026-09-01 09:00:00', '2026-09-02 09:00:00')`,
      niId,
      source,
    );
  }
}