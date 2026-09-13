import type { CompareMappingRow, CompareSetRow } from '../../types';

/**
 * MVP seed content for the Compare Laws module (old vs new statute mapping).
 *
 * NOTE: These section mappings reflect the widely published old→new equivalences
 * (IPC↔BNS, CrPC↔BNSS, IEA↔BSA). They are seeds for the MVP scaffold only and are
 * flagged `pending_verification`. The production pipeline must verify every mapping
 * against the official commencement/gazette material and India Code consolidated
 * text before any mapping is shown as verified (PRD sections 3D/3E/3F).
 */

export interface CompareSetSeed {
  slug: string;
  name: string;
  oldActSlug: string;
  newActSlug: string;
  description: string;
  relevance: string;
  mappings: { old: string; new: string | null; status?: CompareMappingRow['status']; note: string }[];
}

export const COMPARE_SETS: CompareSetSeed[] = [
  {
    slug: 'ipc-bns',
    name: 'IPC → BNS',
    oldActSlug: 'indian-penal-code-1860',
    newActSlug: 'bns-2023',
    description:
      'Section-by-section correspondence between the Indian Penal Code, 1860 (repealed) and the Bharatiya Nyaya Sanhita, 2023 (in force from 1 July 2024).',
    relevance:
      'Transitional: offences committed before 1 July 2024 continue to be governed by the IPC; offences after that date by the BNS.',
    mappings: [
      { old: '34', new: '3(5)', note: 'Acts done by several persons in furtherance of common intention — now expressed as a construction rule in the definitions clause.' },
      { old: '120B', new: '61', note: 'Punishment of criminal conspiracy.' },
      { old: '268', new: '285', note: 'Public nuisance.' },
      { old: '279', new: '281', note: 'Rash driving or riding on a public way.' },
      { old: '300', new: '102', note: 'Murder — definition unchanged in substance.' },
      { old: '302', new: '103', note: 'Punishment for murder. New: death or life imprisonment (murder committed by a group on grounds of race, caste etc. attracts mandatory compensation to victim family).' },
      { old: '304', new: '106', note: 'Culpable homicide not amounting to murder.' },
      { old: '307', new: '109', note: 'Attempt to murder. New: also covers attempt by a group acting in concert.' },
      { old: '326', new: '118', note: 'Voluntarily causing grievous hurt by dangerous weapons or means.' },
      { old: '354', new: '74', note: 'Assault or use of criminal force to a woman to outrage her modesty.' },
      { old: '354A', new: '75', note: 'Sexual harassment.' },
      { old: '363', new: '137', note: 'Kidnapping.' },
      { old: '375', new: '63', note: 'Rape — definition substantially modified (removes marriage exception for women aged 18+ in the new scheme).' },
      { old: '376', new: '64', note: 'Punishment for rape. New: mandatory minimum 10 years, extends to life; aggravated categories in 65–69.' },
      { old: '377', new: '68', note: 'Unnatural offences.' },
      { old: '378', new: '303', note: 'Theft — definition.' },
      { old: '380', new: '304', note: 'Theft in dwelling house, etc. — punishment.' },
      { old: '392', new: '309', note: 'Robbery — definition and punishment.' },
      { old: '395', new: '310', note: 'Dacoity — punishment.' },
      { old: '405', new: '315', note: 'Criminal breach of trust — definition.' },
      { old: '406', new: '316', note: 'Punishment for criminal breach of trust.' },
      { old: '415', new: '317', note: 'Cheating — definition.' },
      { old: '419', new: '319', note: 'Punishment for cheating by personation.' },
      { old: '420', new: '318', note: 'Cheating and dishonestly inducing delivery of property.' },
      { old: '441', new: '329', note: 'Criminal trespass.' },
      { old: '499', new: '356', note: 'Defamation — definition and punishment.' },
      { old: '511', new: '484', note: 'Attempts to commit offences punishable with life imprisonment or other imprisonment.' },
      { old: '124A', new: '152', note: 'The erstwhile sedition provision is replaced by the offence endangering sovereignty or unity and integrity of India (BNS s.152), omitting "sedition" terminology.' },
      { old: 'introduction', new: '1–2', note: 'Preliminary provisions; definitions largely carried over with additions (e.g. "community service" introduced as a punishment in s.4(f)).' },
    ],
  },
  {
    slug: 'crpc-bnss',
    name: 'CrPC → BNSS',
    oldActSlug: 'crpc-1973',
    newActSlug: 'bnss-2023',
    description:
      'Section-by-section correspondence between the Code of Criminal Procedure, 1973 (repealed) and the Bharatiya Nagarik Suraksha Sanhita, 2023 (in force from 1 July 2024).',
    relevance:
      'Procedural: pending proceedings and investigations in progress as of 1 July 2024 continue under the CrPC where so provided by the prescribing authority.',
    mappings: [
      { old: '41', new: '34', note: 'When police may arrest without warrant.' },
      { old: '41A', new: '35', note: 'Notice of appearance before police officer (arrest-avoidance).' },
      { old: '41C', new: '37', note: 'Control room at districts.' },
      { old: '46', new: '44', note: 'Arrest: mode and how made.' },
      { old: '154', new: '173', note: 'FIR — information in cognizable offences.' },
      { old: '156', new: '175', note: 'Police power to investigate cognizable offence.' },
      { old: '160', new: '179', note: 'Police to require attendance of witnesses.' },
      { old: '161', new: '183', note: 'Oral examination of persons acquainted with the facts.' },
      { old: '167', new: '187', note: 'Procedural notice when investigation not completed in 24 hours; detention limits.' },
      { old: '173', new: '193', note: 'Report of police officer on completion of investigation (charge sheet).' },
      { old: '190', new: '208', note: 'Cognizance of offences by Magistrates.' },
      { old: '200', new: '223', note: 'Examination of complainant by Magistrate.' },
      { old: '202', new: '224', note: 'Postponement of issue of process.' },
      { old: '207', new: '232', note: 'Supply to accused of a copy of police report and documents.' },
      { old: '251', new: '285', note: 'Substance of accusation to be stated to accused when offence is trlaied summarily.' },
      { old: '320', new: '359', note: 'Compounding of certain offences.' },
      { old: '357', new: '395', note: 'Order to pay compensation to victims.' },
      { old: '357A', new: '396', note: 'Victim compensation scheme.' },
      { old: '436', new: '479', note: 'Bail in bailable offences.' },
      { old: '437', new: '480', note: 'Bail when may be taken in non-bailable cases.' },
      { old: '439', new: '483', note: 'Special powers of High Court/Court of Session regarding bail.' },
      { old: '441', new: '484', note: 'Bond of accused and sureties.' },
      { old: '482', new: '528', note: 'Saving of inherent powers of High Court.' },
    ],
  },
  {
    slug: 'iea-bsa',
    name: 'Evidence Act → BSA',
    oldActSlug: 'indian-evidence-act-1872',
    newActSlug: 'bsa-2023',
    description:
      'Section-by-section correspondence between the Indian Evidence Act, 1872 (repealed) and the Bharatiya Sakshya Adhiniyam, 2023 (in force from 1 July 2024).',
    relevance:
      'Transitional relevance for pending trials; evidences recorded before 1 July 2024 continue under the repealed Act.',
    mappings: [
      { old: '3', new: '2', note: 'Definitions of "evidence", "fact", "relevant", "proved", etc.' },
      { old: '4', new: '3', note: 'Presumptions of fact and of law ("may presume", "shall presume", "conclusive proof").' },
      { old: '5', new: '4', note: 'Evidence of facts in issue and relevant facts.' },
      { old: '17', new: '15', note: 'Admission defined.' },
      { old: '18', new: '16', note: 'Admission by party to proceeding or his agent.' },
      { old: '24', new: '22', note: 'Confession caused by inducement, threat or promise, when irrelevant.' },
      { old: '25', new: '23', note: 'Confession to police officer not to be proved.' },
      { old: '26', new: '24', note: 'Confession by accused while in custody of police not to be proved against him.' },
      { old: '27', new: '25', note: 'How much of information received from accused may be proved (discovery of fact).' },
      { old: '30', new: '26', note: 'Consideration of proved confession affecting person making it and others jointly under trial.' },
      { old: '45', new: '39', note: 'Opinions of experts.' },
      { old: '56', new: '31', note: 'Facts judicially noticeable need not be proved.' },
      { old: '60', new: '35', note: 'Oral evidence must be direct.' },
      { old: '61', new: '36', note: 'Proof of contents of documents.' },
      { old: '65B', new: '63', note: 'Admissibility of electronic records.' },
      { old: '91', new: '90', note: 'Evidence of terms of contracts, grants and other dispositions of property to be reduced to form of document.' },
      { old: '101', new: '99', note: 'Burden of proof.' },
      { old: '118', new: '127', note: 'Who may testify.' },
      { old: '119', new: '128', note: 'Witness unable to communicate verbally.' },
      { old: '120', new: '129', note: 'Parties to civil suit and their wives or husbands — who need not testify.' },
      { old: '121', new: '130', note: 'Judges and Magistrates.' },
      { old: '122', new: '131', note: 'Communications during marriage.' },
      { old: '159', new: '159', note: 'Refreshing memory.' },
    ],
  },
];

export async function seedCompareSets(
  db: import('expo-sqlite').SQLiteDatabase,
  acts: Map<string, number>,
): Promise<{ sets: CompareSetRow[]; mappings: CompareMappingRow[] }> {
  const sets: CompareSetRow[] = [];
  const mappings: CompareMappingRow[] = [];

  for (const s of COMPARE_SETS) {
    const oldActId = acts.get(s.oldActSlug);
    const newActId = acts.get(s.newActSlug);
    if (oldActId === undefined || newActId === undefined) {
      throw new Error(`CompareSet ${s.slug} references a missing act slug`);
    }
    const inserted = await db.runAsync(
      `INSERT INTO compare_sets (slug, name, old_act_id, new_act_id, description, relevance)
       VALUES (?, ?, ?, ?, ?, ?)`,
      s.slug,
      s.name,
      oldActId,
      newActId,
      s.description,
      s.relevance,
    );
    const setId = inserted.lastInsertRowId;
    const setRow: CompareSetRow = {
      id: setId,
      slug: s.slug,
      name: s.name,
      old_act_id: oldActId,
      new_act_id: newActId,
      description: s.description,
      relevance: s.relevance,
    };
    sets.push(setRow);

    s.mappings.forEach((m, i) => {
      mappings.push({
        id: -1,
        set_id: setId,
        old_section: m.old,
        new_section: m.new,
        description: m.note,
        status: m.status ?? 'pending_verification',
        sort_order: i + 1,
      });
    });
  }

  return { sets, mappings };
}