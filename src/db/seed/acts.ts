import type { ActRow, ChapterRow, SectionRow } from '../../types';

/**
 * MVP seed content for the Bare Acts library.
 *
 * NOTE: Demonstration seed data for the MVP scaffold. Actors under the 2023
 * criminal-law reform (BNS/BNSS/BSA) and repealed statutes (IPC/CrPC/Evidence)
 * include condensed/no-frills provision text. The production pipeline must
 * ingest full official text from India Code / the e-Gazette and verify each
 * section editorially before publishing (PRD sections 3D/3E). Sections whose
 * body is null are seeded with a PENDING placeholder.
 */

export interface SectionSeed {
  n: string;
  title: string | null;
  body: string | null;
  lastAmended?: string | null;
}

export interface ChapterSeed {
  number: string;
  title: string;
  sections?: SectionSeed[];
}

export interface ActSeed {
  slug: string;
  shortTitle: string;
  year: number;
  actNumber?: string | null;
  jurisdiction?: 'central' | 'state';
  category: string;
  status?: 'active' | 'repealed' | 'not-in-force';
  description: string | null;
  lastUpdated?: string | null;
  officialUrl?: string | null;
  provenance?: string | null;
  chapters?: ChapterSeed[];
  standaloneSections?: SectionSeed[];
}

export const DEFAULT_PROVENANCE = 'India Code, Ministry of Law and Justice (indiacode.gov.in)';

const PENDING = `[Content pending verification and seeding from the official India Code repository (PRD section 3D). Provision structure is in place; full text will be added by the content ingestion pipeline.]`;

export const ACT_SEEDS: ActSeed[] = [
  {
    slug: 'bnss-2023',
    shortTitle: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)',
    year: 2023,
    actNumber: '46 of 2023',
    category: 'Criminal',
    status: 'active',
    lastUpdated: '2024-07-01',
    description: 'The new Code of Criminal Procedure, in force from 1 July 2024, repealing the Code of Criminal Procedure, 1973.',
    officialUrl: 'https://www.indiacode.gov.in',
    chapters: [
      {
        number: 'I',
        title: 'Preliminary',
        sections: [
          {
            n: '1',
            title: 'Short title and commencement',
            body: `(1) This Act may be called the Bharatiya Nagarik Suraksha Sanhita, 2023.
(2) It shall come into force on such date as the Central Government may appoint by notification in the Official Gazette.`,
            lastAmended: '2024-07-01',
          },
          { n: '2', title: 'Definitions', body: PENDING },
        ],
      },
      {
        number: 'II',
        title: 'Arrest, apprehension and rights of arrested persons',
        sections: [
          {
            n: '35',
            title: 'Notice of appearance before police officer',
            body: `(1) The police officer may, in all cases where the arrest of a person is not required under the provisions of sub-section (1) of section 34, issue a notice directing the person against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists that he has committed a cognizable offence, to appear before him or at such other place as may be specified in the notice.
(2) Where such a notice is issued to any person, it shall be the duty of that person to comply with the terms of the notice. The police officer may, at any time, declare the notice to be void if he is satisfied that it had been issued mistakenly or in error.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '43',
            title: 'Rights of arrested person',
            body: `Every person arrested shall be informed, as soon as may be, of the grounds of his arrest and shall be entitled to consult and be defended by a legal practitioner of his choice; and every person arrested shall, unless he is an accused who appears in a personal bond, be produced before the nearest Magistrate within twenty-four hours of his arrest, excluding the time necessary for the journey from the place of arrest to the court of the Magistrate, and no such person shall be detained in custody beyond the said period without the authority of a Magistrate.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'XIII',
        title: 'Information to the police and their powers to investigate',
        sections: [
          {
            n: '173',
            title: 'Information in cognizable offences',
            body: `(1) Every information relating to the commission of a cognizable offence, whether given in writing or reduced to writing by the officer in charge of the police station, shall be recorded and signed by the person giving it, and the substance thereof shall be entered in a book to be kept by such officer in such form as the State Government may prescribe in this behalf.
(2) A copy of the information as recorded under sub-section (1) shall be given forthwith, free of cost to the informant.
(3) Any person aggrieved by a refusal on the part of an officer in charge of a police station to record the information referred to in sub-section (1), may send the substance of such information, in writing and by post, to the Superintendent of Police concerned.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '175',
            title: 'Power of police officer to investigate cognizable offences',
            body: `Any officer in charge of a police station may, without the order of a Magistrate, investigate any cognizable offence which a court having jurisdiction over the local area within the limits of such station would have power to inquire into or try under the provisions of this Sanhita.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '187',
            title: 'Procedure when investigation cannot be completed in twenty-four hours',
            body: `(1) When any person is arrested and detained in custody, and it appears that the investigation cannot be completed within twenty-four hours, the officer in charge of the police station shall transmit to the nearest Judicial Magistrate a copy of the entries in the diary relating to the case, and shall at the same time forward the accused to such Magistrate.
(2) No Magistrate shall authorise the detention of the accused person in custody under this section for a total period exceeding — (a) fifteen days at a time; or (b) sixty days in the whole, where the investigation relates to an offence punishable with death, imprisonment for life or imprisonment for a term of not less than ten years.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'XXXIV',
        title: 'Suppression of certain rules of practice and procedures relating to bail',
        sections: [
          {
            n: '480',
            title: 'Power to grant bail',
            body: `When any person accused of, or suspected of, the commission of any non-bailable offence is arrested or detained without warrant by an officer in charge of a police station or appears or is brought before a Court, he may be released on bail by such officer or Court, subject to the conditions in Chapter XXXIV; provided that such person shall not be so released if there appear reasonable grounds for believing that he has been guilty of an offence punishable with death or imprisonment for life.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '483',
            title: 'Special powers of High Court or Court of Session regarding bail',
            body: `A High Court or Court of Session may, under this Sanhita, direct that any person accused of an offence and in custody be released on bail, and if the offence is of the nature specified in section 480, may impose any condition which it considers necessary for the purposes mentioned in that section.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '528',
            title: 'Saving of inherent powers of High Court',
            body: `Nothing in this Sanhita shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Sanhita, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
    ],
  },
  {
    slug: 'bns-2023',
    shortTitle: 'Bharatiya Nyaya Sanhita (BNS)',
    year: 2023,
    actNumber: '45 of 2023',
    category: 'Criminal',
    status: 'active',
    lastUpdated: '2024-07-01',
    description: 'The new Indian Penal Code, in force from 1 July 2024, replacing the Indian Penal Code, 1860.',
    officialUrl: 'https://www.indiacode.gov.in',
    chapters: [
      {
        number: 'I',
        title: 'Preliminary',
        sections: [
          {
            n: '1',
            title: 'Short title and commencement',
            body: `(1) This Act may be called the Bharatiya Nyaya Sanhita, 2023.
(2) It shall come into force on such date as the Central Government may appoint by notification in the Official Gazette.`,
            lastAmended: '2024-07-01',
          },
          { n: '2', title: 'Definitions', body: PENDING },
          {
            n: '3',
            title: 'Variation of punishment... [Repeal of IPC]',
            body: `The Indian Penal Code (45 of 1860) is hereby repealed. Provided that: (i) subject to the provisions of this Sanhita, the repeal shall not affect section 6 of the General Clauses Act, 1897; (ii) for a period of six months from the commencement of this Sanhita, penal provisions in any other law that refer to an offence or punishment under the IPC shall be construed as referring to the corresponding provision of this Sanhita.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'III',
        title: 'Of punishments',
        sections: [
          {
            n: '4',
            title: 'Punishments',
            body: `The punishments to which offenders are liable under the provisions of this Sanhita are: (a) death; (b) imprisonment for life; (c) imprisonment, which is of two descriptions, namely rigorous and simple; (d) forfeiture of property; (e) fine; (f) community service.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'V',
        title: 'Of offences against woman and child',
        sections: [
          {
            n: '64',
            title: 'Punishment for rape',
            body: `(1) Whoever, except in the cases provided for in sub-section (2), commits rape, shall be punished with rigorous imprisonment of not less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.
(2) Whoever, being a police officer, public servant, member of the armed forces, or the management or staff of a jail, remand home, or hospital, commits rape on a woman in his custody or under his care, or under the care of any such authority, shall be punished with rigorous imprisonment of not less than ten years, but which may extend to imprisonment for life.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '74',
            title: 'Assault or use of criminal force to woman with intent to outrage her modesty',
            body: `Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment of either description for a term which shall not be less than one year but which may extend to five years, and shall also be liable to fine.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'VI',
        title: 'Of offences affecting the human body',
        sections: [
          {
            n: '103',
            title: 'Punishment for murder',
            body: `(1) Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.
(2) When a group of five or more persons acting in concert commits murder on grounds of race, caste or community, sex, place of birth, language, personal belief or any other similar ground, each member of such group shall be punished with death or imprisonment for life and shall also be liable to fine, and such group shall be liable to pay just compensation to the family of the victim.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '109',
            title: 'Attempt to murder',
            body: `(1) Whoever does any act with such intention or knowledge, and under such circumstances that if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine; and if hurt is caused to any person by such act, the offender shall be liable either to imprisonment for life, or to such punishment as is hereinbefore mentioned.
(2) When on an offence relating to murder or attempt to murder is committed by a group of five or more persons acting in concert, each member of the group shall be punished for a distinct offence.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '115',
            title: 'Voluntarily causing hurt',
            body: `Whoever, except in the case provided for by sub-section (2) of section 117, voluntarily causes hurt, shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '152',
            title: 'Harbouring, engaging or assembling in an activity endangering sovereignty or unity and integrity of India',
            body: `Whoever promotes, or attempts to promote, feelings of enmity, hatred or ill-will between different groups of people on grounds of religion, race, place of birth, residence, language, caste or community, or commits any act which is prejudicial to the maintenance of harmony, and thereby endangering the sovereignty or unity and integrity of India, shall be punished with imprisonment for life or for a term which may extend to seven years, and shall also be liable to fine.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'XVII',
        title: 'Of offences against property',
        sections: [
          { n: '303', title: 'Theft', body: PENDING },
          { n: '304', title: 'Punishment for theft', body: `Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.`, lastAmended: '2024-07-01' },
          { n: '305', title: 'Snatching', body: PENDING },
          { n: '315', title: 'Criminal breach of trust', body: PENDING },
          {
            n: '318',
            title: 'Cheating and dishonestly inducing delivery of property',
            body: `Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'XXI',
        title: 'Of defamation',
        sections: [
          {
            n: '356',
            title: 'Defamation',
            body: `(1) Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said, except in the cases hereinafter expected, to defame that person.
(2) Defamation is punishable with simple imprisonment for a term which may extend to two years, or with fine, or with both.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
    ],
  },
  {
    slug: 'bsa-2023',
    shortTitle: 'Bharatiya Sakshya Adhiniyam (BSA)',
    year: 2023,
    actNumber: '47 of 2023',
    category: 'Criminal',
    status: 'active',
    lastUpdated: '2024-07-01',
    description: 'The new law of evidence, in force from 1 July 2024, replacing the Indian Evidence Act, 1872.',
    officialUrl: 'https://www.indiacode.gov.in',
    chapters: [
      {
        number: 'II',
        title: 'Relevancy of facts',
        sections: [
          {
            n: '23',
            title: 'Relevancy of certain evidence for proving, in subsequent proceeding, the truth of facts therein stated',
            body: `Statements, written or verbal, of relevant facts made by a person who is dead, or who cannot be found, or who has become incapable of giving evidence, are themselves relevant facts in the cases enumerated in the Adhiniyam (including statements relating to cause of death, made in course of business, against interest, and as to existence of relationship).`,
            lastAmended: '2024-07-01',
          },
        ],
      },
      {
        number: 'III',
        title: 'Facts which need not be proved',
        sections: [{ n: '32', title: 'Facts judicially noticeable need not be proved', body: PENDING }],
      },
      {
        number: 'IV',
        title: 'Production and effect of evidence',
        sections: [
          {
            n: '39',
            title: 'Opinions of experts',
            body: `When the Court has to form an opinion upon a point of foreign law, or of science or art, or as to identity of handwriting or finger impressions, the opinions upon that point of persons specially skilled in such foreign law, science or art, or in questions as to identity of handwriting or finger impressions are relevant facts.`,
            lastAmended: '2024-07-01',
          },
          {
            n: '63',
            title: 'Admissibility of electronic records',
            body: `(1) Notwithstanding anything contained in this Adhiniyam, any information contained in an electronic record which is printed on paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document, if the conditions mentioned in this section are satisfied, and shall be admissible in any proceedings, without further proof or production of the original.
(2) The conditions referred to in sub-section (1) relate to the computer producing the electronic record having been used for the storage or processed of the information during the relevant period, and the electronic record having been produced by such computer in the course of its ordinary use.`,
            lastAmended: '2024-07-01',
          },
        ],
      },
    ],
  },
  {
    slug: 'indian-penal-code-1860',
    shortTitle: 'Indian Penal Code (IPC)',
    year: 1860,
    actNumber: '45 of 1860',
    category: 'Criminal',
    status: 'repealed',
    lastUpdated: '2024-07-01',
    description: 'Repealed with effect from 1 July 2024 and replaced by the Bharatiya Nyaya Sanhita, 2023. Retained in LegalPocket for historical reference and the Compare Laws module.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '124A',
        title: 'Sedition [repealed]',
        body: `Section 124A of the IPC (relating to sedition) stands repealed by the BNS, 2023, and replaced by the corresponding provision on endangering sovereignty or unity and integrity of India. [Historical reference text pending India Code verification.]`,
      },
      {
        n: '302',
        title: 'Punishment for murder [repealed]',
        body: `Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. [Corresponds to section 103 of the BNS.]`,
      },
      {
        n: '376',
        title: 'Punishment for rape [repealed]',
        body: `Whoever commits rape shall be punished with rigorous imprisonment for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine. [Corresponds to section 64 of the BNS.]`,
      },
      {
        n: '420',
        title: 'Cheating and dishonestly inducing delivery of property [repealed]',
        body: `Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine. [Corresponds to section 318 of the BNS.]`,
      },
    ],
  },
  {
    slug: 'crpc-1973',
    shortTitle: 'Code of Criminal Procedure (CrPC)',
    year: 1973,
    actNumber: '2 of 1974',
    category: 'Criminal',
    status: 'repealed',
    lastUpdated: '2024-07-01',
    description: 'Repealed with effect from 1 July 2024 and replaced by the Bharatiya Nagarik Suraksha Sanhita, 2023. Retained for historical reference and the Compare Laws module.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '154', title: 'Information in cognizable cases [repealed]', body: `Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him and read over to the informant, and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the person giving it. [Corresponds to section 173 of the BNSS.]` },
      { n: '41A', title: 'Notice of appearance before police officer [repealed]', body: `The police officer may, in all cases where the arrest of a person is not required under the provisions of sub-section (1) of section 41, issue a notice directing the person against whom a reasonable complaint has been made to appear before him. [Corresponds to section 35 of the BNSS.]` },
      { n: '167', title: 'Procedure when investigation cannot be completed in twenty-four hours [repealed]', body: `When any person is arrested and detained in custody, and it appears that the investigation cannot be completed within twenty-four hours, the officer in charge of the police station shall transmit to the nearest Judicial Magistrate a copy of the entries in the diary relating to the case, and shall at the same time forward the accused to such Magistrate. [Corresponds to section 187 of the BNSS.]` },
      { n: '437', title: 'When bail may be taken in case of non-bailable offence [repealed]', body: `When any person accused of, or suspected of, the commission of any non-bailable offence is arrested or detained without warrant by an officer in charge of a police station or appears or is brought before a Court other than the High Court or Court of Session, he may be released on bail. [Corresponds to section 480 of the BNSS.]` },
      { n: '482', title: 'Saving of inherent powers of High Court [repealed]', body: `Nothing in this Code shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Code, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice. [Corresponds to section 528 of the BNSS.]` },
    ],
  },
  {
    slug: 'indian-evidence-act-1872',
    shortTitle: 'Indian Evidence Act',
    year: 1872,
    actNumber: '1 of 1872',
    category: 'Criminal',
    status: 'repealed',
    lastUpdated: '2024-07-01',
    description: 'Repealed with effect from 1 July 2024 and replaced by the Bharatiya Sakshya Adhiniyam, 2023. Retained for historical reference and the Compare Laws module.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Interpretation-clause [repealed]', body: `"Evidence" means and includes all statements which the Court permits or requires to be made before it by witnesses, in relation to matters of fact under inquiry, and all documents produced for the inspection of the Court. "Fact" means and includes any thing, state of things, or relation of things capable of being perceived by the senses. [Replaced by section 2 of the BSA.]` },
      { n: '32', title: 'Cases in which statement of relevant fact by person who is dead or cannot be found, etc., is relevant [repealed]', body: `Statements, written or verbal, of relevant facts made by a person who is dead, or who cannot be found, or who has become incapable of giving evidence, or whose attendance cannot be procured without an amount of delay or expense which under the circumstances of the case appears to the Court unreasonable, are themselves relevant facts in the cases enumerated in the section. [Replaced by section 23 of the BSA.]` },
      { n: '45', title: 'Opinions of experts [repealed]', body: `When the Court has to form an opinion upon a point of foreign law, or of science or art, or as to identity of handwriting or finger impressions, the opinions upon that point of persons specially skilled are relevant facts. [Replaced by section 39 of the BSA.]` },
      { n: '65B', title: 'Admissibility of electronic records [repealed]', body: `Any information contained in an electronic record printed on paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document and admissible in proceedings without further proof or production of the original, subject to the conditions enumerated in the section. [Replaced by section 63 of the BSA.]` },
    ],
  },
  {
    slug: 'code-of-civil-procedure-1908',
    shortTitle: 'Code of Civil Procedure',
    year: 1908,
    actNumber: '5 of 1908',
    category: 'Civil',
    status: 'active',
    description: 'The general law for the administration of civil proceedings in India, including the structure of suits, pleadings, and appeals.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '9', title: 'Courts to try all civil suits unless barred', body: `The Courts shall (subject to the provisions herein contained) have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred, and every suit shall be instituted in the Court of the lowest grade competent to try it.` },
      { n: '96', title: 'Appeal from original decree', body: `Save where otherwise expressly provided in the body of this Code or by any other law for the time being in force, an appeal shall lie from every decree passed by any Court exercising original jurisdiction to the Court authorised to hear appeals from the decisions of such Court.` },
      { n: '100', title: 'Second appeal', body: `(1) Save as otherwise expressly provided in the body of this Code or by any other law for the time being in force, an appeal shall lie to the High Court from every decree passed in appeal by any Court subordinate to the High Court, if the High Court is satisfied that the case involves a substantial question of law.` },
      { n: '149', title: 'Power to make up deficiency of court-fees', body: `Where the whole or any part of any fee prescribed for any document by the law for the time being in force relating to court-fees has not been paid, the Court may, in its discretion, at any stage, allow the person, by whom such fee is payable, to pay the same or the deficiency within a time to be fixed by it.` },
    ],
  },
  {
    slug: 'indian-contract-act-1872',
    shortTitle: 'Indian Contract Act',
    year: 1872,
    actNumber: '9 of 1872',
    category: 'Civil',
    status: 'active',
    description: 'The law governing agreements, promises, consideration, voidable contracts, and breach in India.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '2', title: 'Interpretation-clause', body: `In this Act the following words and expressions are used in the following senses: (a) When one person signifies to another his willingness to do or to abstain from doing anything, with a view to obtaining the assent of that other to such act or abstinence, he is said to make a proposal; ... (h) An agreement enforceable by law is a contract.` },
      { n: '10', title: 'What agreements are contracts', body: `All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.` },
      { n: '14', title: 'Free consent', body: `Consent is said to be free when it is not caused by — (1) coercion, (2) undue influence, as defined in section 16, (3) fraud, as defined in section 17, (4) misrepresentation, as defined in section 18, (5) mistake, subject to the provisions of sections 20, 21 and 22.` },
      { n: '73', title: 'Compensation for loss or damage caused by breach of contract', body: `When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach, or which the parties knew, when they made the contract, to be likely to result from the breach of it.` },
    ],
  },
  {
    slug: 'limitation-act-1963',
    shortTitle: 'Limitation Act',
    year: 1963,
    actNumber: '36 of 1963',
    category: 'Civil',
    status: 'active',
    description: 'Prescribes the periods of limitation for suits, appeals, and applications, and the law relating to extensions and exceptions.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Bar of limitation', body: `Subject to the provisions contained in sections 4 to 24 (inclusive), every suit instituted, appeal preferred, and application made after the period of limitation prescribed therefor by the Schedule shall be dismissed, although limitation has not been set up as a defence.` },
      { n: '12', title: 'Exclusion of time in legal proceedings', body: `In computing the period of limitation for any suit, appeal or application, the day from which such period is to be reckoned shall be excluded, and, in the case of an appeal or an application for leave to appeal or for revision or for review of a judgment, the time requisite for obtaining a copy of the judgment, decree or order shall also be excluded.` },
    ],
  },
  {
    slug: 'negotiable-instruments-act-1881',
    shortTitle: 'Negotiable Instruments Act',
    year: 1881,
    actNumber: '26 of 1881',
    category: 'Commercial',
    status: 'active',
    description: 'The law governing promissory notes, bills of exchange, and cheques, including the dishonour of cheques.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '13', title: 'Negotiable instrument', body: `(1) A negotiable instrument means a promissory note, bill of exchange or cheque payable either to order or to bearer.` },
      {
        n: '138',
        title: 'Dishonour of cheque for insufficiency, etc., of funds in the account',
        body: `Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person from out of that account for the discharge, in whole or in part, of any debt or other liability, is returned by the bank unpaid, either because of the amount of money standing to the credit of that account is insufficient to honour the cheque or that it exceeds the amount arranged to be paid from that account by an agreement made with that bank, such person shall be deemed to have committed an offence and shall, without prejudice to any other provision of this Act, be punished with imprisonment for a term which may be extended to two years, or with fine which may extend to twice the amount of the cheque, or with both.`,
      },
      { n: '139', title: 'Presumption in favour of holder', body: `It shall be presumed, unless the contrary is proved, that the holder of a cheque received the cheque of the nature referred to in section 138 for the discharge, in whole or in part, of any debt or other liability.` },
      { n: '141', title: 'Offences by companies', body: `If the person committing an offence under section 138 is a company, every person who, at the time the offence was committed, was in charge of, and was responsible to, the company for the conduct of the business of the company, as well as the company, shall be deemed to be guilty of the offence and shall be liable to be proceeded against and punished accordingly.` },
      { n: '142', title: 'Cognizance of offences', body: `Notwithstanding anything contained in the Code of Criminal Procedure, 1973, no court shall take cognizance of any offence punishable under section 138 except upon a complaint, in writing, made by the payee or the holder in due course of the cheque, within one month of the date on which the cause of action arises under clause (c) of proviso to section 138.` },
    ],
  },
  {
    slug: 'rti-act-2005',
    shortTitle: 'Right to Information Act',
    year: 2005,
    actNumber: '22 of 2005',
    category: 'Governance',
    status: 'active',
    description: 'Sets out the regime for citizens to access information under the control of public authorities, and the machinery for its enforcement.',
    officialUrl: 'https://www.indiacode.gov.in',
    chapters: [
      {
        number: 'II',
        title: 'Right to information and obligations of public authorities',
        sections: [
          {
            n: '4',
            title: 'Obligations of public authorities',
            body: `(1) Every public authority shall maintain all its records duly catalogued and indexed, and shall publish within one hundred and twenty days of the enactment of this Act, a compendium of the information including particulars of its organisation, functions and duties, the powers and duties of its officers, the procedure followed in the decision making process, the norms set for the discharge of its functions, the rules, regulations, instructions, manuals, and records held by it, and the manner of execution of subsidy programmes.`,
          },
          {
            n: '6',
            title: 'Request for obtaining information',
            body: `(1) A person, who desires to obtain any information under this Act, shall make a request in writing or through electronic means in English or Hindi or in the official language of the area in which the application is being made, accompanying such fee as may be prescribed, to — (a) the Central Public Information Officer or State Public Information Officer, as the case may be, of the concerned public authority; or (b) the Central Assistant Public Information Officer or State Assistant Public Information Officer.`,
          },
          {
            n: '7',
            title: 'Disposal of request',
            body: `(1) Subject to the proviso to sub-section (2), the Central Public Information Officer or State Public Information Officer, as the case may be, shall dispose of the request for information as expeditiously as possible and in any case within thirty days of the receipt of the request: Provided further that where the information sought for concerns the life or liberty of a person, the same shall be provided within forty-eight hours of the receipt of the request.`,
          },
          {
            n: '8',
            title: 'Exemption from disclosure of information',
            body: `(1) Notwithstanding anything contained in this Act, there shall be no obligation to give any citizen information which would prejudicially affect the sovereignty and integrity of India, the security, strategic, scientific or economic interests of the State, relation with foreign State or lead to incitement of an offence, or information which has been expressly forbidden to be published by any court of law, or which would cause a breach of privilege of Parliament or a State Legislature, or which is in respect of personal information the disclosure of which has no relationship to any public activity and which would cause unwarranted invasion of the privacy of the individual.`,
          },
        ],
      },
      {
        number: 'V',
        title: 'Powers and functions of the Information Commissions, appeal and penalties',
        sections: [
          {
            n: '19',
            title: 'Appeal',
            body: `(1) Any person who, does not receive a decision within the time specified in section 7, or is aggrieved by a decision of the Central Public Information Officer or State Public Information Officer, may prefer an appeal to the First Appellate Authority within thirty days from the expiry of such period or from the receipt of such a decision.
(2) A second appeal against the decision of the First Appellate Authority shall lie within ninety days of the date on which the decision should have been made or was actually received, to the Central Information Commission or the State Information Commission.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'consumer-protection-act-2019',
    shortTitle: 'Consumer Protection Act',
    year: 2019,
    actNumber: '35 of 2019',
    category: 'Consumer',
    status: 'active',
    description: 'Provides protection of the interests of consumers, establishing the Central Consumer Protection Authority and the hierarchy of consumer commissions.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '2',
        title: 'Definitions',
        body: `(7) "consumer" means any person who — (i) buys any goods for a consideration which has been paid or promised... (ii) hires or avails of any services for a consideration... but does not include a person who obtains such goods for resale or for any commercial purpose.
(11) "defect" means any fault, imperfection or shortcoming in the quality, quantity, potency, purity or standard which is required to be maintained by or under any law...
(31) "unfair trade practice" means a trade practice which, for the purpose of promoting the sale, use or supply of any goods or for the provision of any service, adopts any unfair method or unfair or deceptive practice.`,
      },
      {
        n: '35',
        title: 'Complaint to District Commission',
        body: `(1) A complaint, in relation to any goods sold or delivered or agreed to be sold or delivered or any service provided or agreed to be provided, may be filed with a District Commission by — (a) the consumer; (b) any recognised consumer association; (c) more than one consumer, where there are numerous consumers having the same interest; (d) the Central Government or the State Government; or (e) the Central Authority.
(2) Every complaint filed under sub-section (1) shall be accompanied with such fee and payable in such manner as may be prescribed.`,
      },
      {
        n: '100',
        title: 'Appeal against order of District Commission',
        body: `(1) Any person aggrieved by an order made by the District Commission may prefer an appeal against such order to the State Commission on the grounds of facts or law within a period of forty-five days from the date of the order: Provided that the State Commission may entertain an appeal after the said period of forty-five days if it is satisfied that there was sufficient cause for not filing it within that period.`,
      },
      {
        n: '101',
        title: 'Appeal against order of State Commission',
        body: `(1) Any person aggrieved by an order made by the State Commission in exercise of its powers conferred by sub-clause (i) or (ii) of clause (a) of sub-section (1) of section 47 may prefer an appeal against such order to the National Commission within a period of forty-five days.`,
      },
    ],
  },
  {
    slug: 'information-technology-act-2000',
    shortTitle: 'Information Technology Act',
    year: 2000,
    actNumber: '21 of 2000',
    category: 'Cyber',
    status: 'active',
    description: 'The primary law dealing with cybercrime and electronic commerce in India, including intermediary obligations.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '66',
        title: 'Computer related offences',
        body: `If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees or with both.`,
      },
      {
        n: '66C',
        title: 'Identity theft',
        body: `Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.`,
      },
      {
        n: '66D',
        title: 'Cheating by personation by using computer resource',
        body: `Whoever, by means of any communication device or computer resource cheats by personation, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.`,
      },
      {
        n: '79',
        title: 'Exemption from liability of intermediary in certain cases',
        body: `(1) Notwithstanding anything contained in any law for the time being in force but subject to the provisions of sub-sections (2) and (3), an intermediary shall not be liable for any third party information, data, or communication link made available or hosted by him.
(2) The provisions of sub-section (1) shall apply if — (a) the function of the intermediary is limited to providing access to a communication system over which information made available by third parties is transmitted or temporarily stored; and (b) the intermediary observes due diligence while discharging his duties under the Act and the rules framed thereunder.`,
      },
    ],
  },
  {
    slug: 'dpdp-act-2023',
    shortTitle: 'Digital Personal Data Protection Act',
    year: 2023,
    actNumber: '22 of 2023',
    category: 'Cyber',
    status: 'not-in-force',
    description: 'Governs the processing of digital personal data in India, establishing obligations of Data Fiduciaries and rights of Data Principals.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '4', title: 'No processing of personal data without consent', body: `The consent of a Data Principal shall be the lawful basis for the processing of her personal data for any purpose, except where such processing is for a "legitimate use" — namely the provision or issuance of a subsidy, benefit, service, certificate, licence or permit by the State, or compliance with any law, judgment or order.` },
      { n: '6', title: 'Consent', body: `A notice shall be given to the Data Principal, before requesting her consent, in such form and manner as may be prescribed, setting out the purpose for which the personal data is proposed to be processed; consent shall be free, specific, informed, unconditional and unambiguous with a clear affirmative action.` },
      { n: '9', title: 'Processing of personal data of children', body: `A Data Fiduciary shall not process the personal data of a child without verifiable parental consent, and shall not undertake such processing that is likely to cause detrimental effect on the wellbeing of a child, or tracking or behavioural monitoring of a child, or targeted advertising addressed at children — except as permitted by rules made by the Central Government.` },
    ],
  },
  {
    slug: 'pocso-act-2012',
    shortTitle: 'Protection of Children from Sexual Offences Act',
    year: 2012,
    actNumber: '32 of 2012',
    category: 'Criminal',
    status: 'active',
    description: 'Provides protection to children from offences of sexual assault, sexual harassment and pornography, establishing Special Courts for trial.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Penetrative sexual assault', body: `(1) A person is said to commit "penetrative sexual assault" if he — (a) penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a child or makes the child to do so with him or any other person; or (b) inserts, to any extent, any object or part of the body into the vagina, mouth, urethra or anus of a child; or (c) manipulates any part of the body of a child so as to cause penetration... (2) Whoever commits penetrative sexual assault shall be punished with imprisonment of either description for a term which shall not be less than ten years but which may extend to imprisonment for life, and shall also be liable to fine.` },
      { n: '29', title: 'Presumption as to certain offences', body: `Where a person is prosecuted for committing or abetting or attempting to commit any offence under sections 3, 5, 7 and 9 of this Act, the Special Court shall presume that such person has committed or abetted or attempted to commit the offence, as the case may be, unless the contrary is proved.` },
    ],
  },
  {
    slug: 'domestic-violence-act-2005',
    shortTitle: 'Protection of Women from Domestic Violence Act',
    year: 2005,
    actNumber: '43 of 2005',
    category: 'Family',
    status: 'active',
    description: 'Provides protection to women who are victims of domestic violence, including rights to residence, protection orders, and relief.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Definition of domestic violence', body: `For the purposes of this Act, any act, omission or commission or conduct of the respondent shall constitute domestic violence in case it — (a) harms or injures or endangers the health, safety, life, limb or well-being, whether mental or physical, of the aggrieved person or tends to do so and includes causing physical abuse, sexual abuse, verbal and emotional abuse and economic abuse; or (b) harasses, harms, injures or endangers the aggrieved person with a view to coerce her or any other person related to her to meet any unlawful demand for any dowry or other property or valuable security; or (c) has the effect of threatening the aggrieved person or any person related to her by any conduct mentioned in clause (a) or (b).` },
      { n: '12', title: 'Application to Magistrate', body: `An aggrieved person or a Protection Officer or any other person on behalf of the aggrieved person may present an application to the Magistrate seeking one or more reliefs under this Act, in the prescribed form, accompanied by such fee as may be prescribed.` },
    ],
  },
  {
    slug: 'transfer-of-property-act-1882',
    shortTitle: 'Transfer of Property Act',
    year: 1882,
    actNumber: '4 of 1882',
    category: 'Property',
    status: 'active',
    description: 'The law relating to the transfer of property by act of parties, including sale, mortgage, lease, gift, and exchange.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '5', title: 'Transfer of property defined', body: `In the following sections "transfer of property" means an act by which a living person conveys property, in present or in future, to one or more other living persons, or to himself, or to himself and one or more other living persons; and "to transfer property" is to perform such act.` },
      {
        n: '53A',
        title: 'Part performance',
        body: `Where a person contracts to transfer for consideration any immoveable property by writing signed by him or on his behalf from which the terms necessary to constitute the transfer can be ascertained with reasonable certainty, and the transferee has, in part performance of the contract, taken possession of the property or any part thereof, or, being already in possession, continues in possession in part performance of the contract and has done some act in furtherance of the contract, and the transferee has performed or is willing to perform his part of the contract, then, notwithstanding that the contract, though required to be registered, has not been registered, the transferor or any person claiming under him shall be debarred from enforcing against the transferee and persons claiming under him any right in respect of the property of which the transferee has taken or continued in possession.`,
      },
    ],
  },
  {
    slug: 'companies-act-2013',
    shortTitle: 'Companies Act',
    year: 2013,
    actNumber: '18 of 2013',
    category: 'Corporate',
    status: 'active',
    description: 'The primary statute governing the incorporation, management, governance, and winding up of companies in India.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '2', title: 'Definitions', body: `(20) "company" means a company incorporated under this Act or under any previous company law; ... (68) "public company" means a company which is not a private company;` },
      { n: '149', title: 'Company to have Board of Directors', body: `(1) Every company shall have a Board of Directors consisting of individuals as directors and shall have — (a) a minimum number of three directors in the case of a public company, two directors in the case of a private company, and one director in the case of a One Person Company; and (b) a maximum of fifteen directors.` },
    ],
  },
  {
    slug: 'motor-vehicles-act-1988',
    shortTitle: 'Motor Vehicles Act',
    year: 1988,
    actNumber: '59 of 1988',
    category: 'Motor Vehicles',
    status: 'active',
    description: 'Consolidates the law relating to motor vehicles — licensing, registration, insurance, liability, and road safety.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Necessity for driving licence', body: `No person shall drive a motor vehicle in any public place unless he holds an effective driving licence issued to him authorising him to drive the vehicle; and no person shall so drive a motor vehicle as a paid employee or contractor, unless he has a driving licence specifically for that class of vehicle.` },
      { n: '185', title: 'Driving by a person under the influence of drink or drugs', body: `Whoever, while driving, or attempting to drive, a motor vehicle in a public place, in a state of intoxication, shall be liable for the first offence to be punished with imprisonment for a term which may extend to six months, or with fine which may extend to ten thousand rupees, or with both.` },
    ],
  },
  {
    slug: 'general-clauses-act-1897',
    shortTitle: 'General Clauses Act',
    year: 1897,
    actNumber: '10 of 1897',
    category: 'Constitutional',
    status: 'active',
    description: 'Provides rules of general application for the interpretation of Acts and Regulations in India, including definitions and rules about commencement and repeal.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Definitions', body: `In this Act, and in all Central Acts and Regulations made after the commencement of this Act, unless there is anything repugnant in the subject or context — (23) "Government" or "the Government" shall include both the Central Government and any State Government; (42) "person" shall include any company or association or body of individuals, whether incorporated or not;` },
      { n: '6', title: 'Effect of repeal', body: `Where this Act, or any Central Act or Regulation made after the commencement of this Act, repeals any enactment hitherto made or hereafter to be made, then, unless a different intention appears, the repeal shall not — (a) revive anything not in force or existing at the time at which the repeal takes effect; or (b) affect the previous operation of any enactment so repealed or anything duly done or suffered thereunder; or (c) affect any right, privilege, obligation or liability acquired, accrued or incurred under any enactment so repealed.` },
    ],
  },
  {
    slug: 'hindu-marriage-act-1955',
    shortTitle: 'Hindu Marriage Act',
    year: 1955,
    actNumber: '25 of 1955',
    category: 'Family',
    status: 'active',
    description: 'Amends and codifies the law relating to marriage among Hindus, including valid ceremonies, restitution of conjugal rights, judicial separation, and divorce.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '5',
        title: 'Conditions for a Hindu marriage',
        body: `A marriage may be solemnized between any two Hindus, if the following conditions are fulfilled, namely: (i) neither party has a spouse living at the time of the marriage; (ii) at the time of the marriage, neither party is incapable of giving a valid consent to it in consequence of unsoundness of mind, or is suffering from a mental disorder of such a kind or such an extent as to be unfit for marriage and the procreation of children; (iii) the bridegroom has completed the age of twenty-one years and the bride the age of eighteen years at the time of the marriage; (iv) the parties are not within the degrees of prohibited relationship, unless the custom or usage governing each of them permits such marriage; and (v) the parties are not sapindas of each other, unless the custom or usage governing each of them permits such marriage.`,
      },
      {
        n: '13',
        title: 'Divorce',
        body: `(1) Any marriage solemnized, whether before or after the commencement of this Act, may, on a petition presented by either the husband or the wife, be dissolved by a decree of divorce on the ground that the other party — (i) has, after the solemnization of the marriage, had voluntary sexual intercourse with any person other than his or her spouse; (ii) has, after the solemnization of the marriage, treated the petitioner with cruelty; (iii) has deserted the petitioner for a continuous period of not less than two years immediately preceding the presentation of the petition; (iv) has ceased to be a Hindu by conversion to another religion; ...`,
      },
      {
        n: '13B',
        title: 'Divorce by mutual consent',
        body: `(1) Subject to the provisions of this Act, a petition for dissolution of marriage by a decree of divorce may be presented to the district court by both the parties to a marriage together, whether such marriage was solemnized before or after the commencement of the Marriage Laws (Amendment) Act, 1976, on the ground that they have been living separately for a period of one year or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved.`,
      },
    ],
  },
  {
    slug: 'dowry-prohibition-act-1961',
    shortTitle: 'Dowry Prohibition Act',
    year: 1961,
    actNumber: '28 of 1961',
    category: 'Family',
    status: 'active',
    description: 'Prohibits the giving or taking of dowry and prescribes penalties for the demand of dowry.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '3', title: 'Penalty for giving or taking dowry', body: `(1) If any person, after the commencement of this Act, gives or takes or abets the giving or taking of dowry, he shall be punishable with imprisonment for a term which shall not be less than five years, and with fine which shall not be less than fifteen thousand rupees or the amount of the value of such dowry, whichever is more.` },
      { n: '4', title: 'Penalty for demanding dowry', body: `(1) If any person demands, directly or indirectly, from the parents or other relatives or guardian of a bride or bridegroom, as the case may be, any dowry, he shall be punishable with imprisonment for a term which shall not be less than six months, but which may extend to two years and with fine which may extend to ten thousand rupees.` },
    ],
  },
  {
    slug: 'hindu-succession-act-1956',
    shortTitle: 'Hindu Succession Act',
    year: 1956,
    actNumber: '30 of 1956',
    category: 'Family',
    status: 'active',
    description: 'Codifies the law of intestate succession for Hindus, including the rules of devolution on death and the notional partition in respect of coparcenary property.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '6',
        title: 'Devolution of interest in coparcenary property',
        body: `(1) On and from the commencement of the Hindu Succession (Amendment) Act, 2005, in a Joint Hindu family governed by the Mitakshara law, the daughter of a coparcener shall — (a) by birth become a coparcener in her own right in the same manner as the son; (b) have the same rights in the coparcenary property as she would have had if she had been a son; and (c) be subject to the same liabilities and disabilities in respect of such coparcenary property as a son would be subject to.`,
      },
      {
        n: '8',
        title: 'General rules of succession in the case of males',
        body: `The property of a male Hindu dying intestate shall devolve according to the provisions of this Chapter: firstly, upon the heirs, being the relatives specified in Class I of the Schedule; secondly, if there is no Class I heir, upon the heirs, being the relatives specified in Class II of the Schedule; thirdly, if there is no heir of any of the two classes, then upon the agnates of the deceased; and lastly, if there is no agnate, then upon the cognates of the deceased.`,
      },
      {
        n: '15',
        title: 'General rules of succession in the case of females',
        body: `(1) The property of a female Hindu dying intestate shall devolve according to the rules set out in this section — (a) firstly, upon the sons and daughters (including the children of any pre-deceased son or daughter) and the husband; (b) secondly, upon the heirs of the husband; (c) thirdly, upon the mother and the father; (d) fourthly, upon the heirs of the father; and (e) lastly, upon the heirs of the mother.`,
      },
    ],
  },
  {
    slug: 'prevention-of-corruption-act-1988',
    shortTitle: 'Prevention of Corruption Act',
    year: 1988,
    actNumber: '49 of 1988',
    category: 'Governance',
    status: 'active',
    description: 'Consolidates the law relating to the prevention of corruption and the prosecution of public servants, including the offence of taking gratification.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      { n: '7', title: 'Public servant taking gratification other than legal remuneration in respect of an official act', body: `Whoever, being a public servant, accepts or obtains or agrees to accept or attempts to obtain from any person, for himself or for any other person, any gratification whatever, other than legal remuneration, as a motive or reward for doing or forbearing to do any official act or for showing or forbearing to show, in the exercise of his official functions, favour or disfavour to any person, shall be punishable with imprisonment for a term which shall be not less than three years, but which may extend to seven years, and shall also be liable to fine.` },
      {
        n: '13',
        title: 'Criminal misconduct by a public servant',
        body: `(1) A public servant is said to commit the offence of criminal misconduct insofar as he — (a) obtains for himself or for any other person any valuable thing or pecuniary advantage by corrupt or illegal means or by abusing his position as a public servant; (b) enjoys assets disproportionate to his known sources of income; or (c) fraudulently or dishonestly engages in any misconduct during the discharge of his duty.`,
      },
    ],
  },
  {
    slug: 'arbitration-and-conciliation-act-1996',
    shortTitle: 'Arbitration and Conciliation Act',
    year: 1996,
    actNumber: '26 of 1996',
    category: 'Dispute Resolution',
    status: 'active',
    description: 'Consolidates and amends the law relating to domestic arbitration, international commercial arbitration, and enforcement of foreign arbitral awards, with a separate regime for conciliation.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '7',
        title: 'Arbitration agreement',
        body: `(1) "Arbitration agreement" means an agreement by the parties to submit to arbitration all or certain disputes which have arisen or which may arise between them in respect of a defined legal relationship, whether contractual or not.
(2) An arbitration agreement may be in the form of an arbitration clause in a contract or in the form of a separate agreement.
(3) An arbitration agreement shall be in writing.`,
      },
      {
        n: '11',
        title: 'Appointment of arbitrators',
        body: `(1) A person of any nationality may be an arbitrator, unless otherwise agreed by the parties.
(2) The parties are free to agree on a procedure for appointing the arbitrator or arbitrators, and failing such agreement for an even number of arbitrators, the arbitrator shall be appointed by a court upon an application of defaulting party as provided in the section.`,
      },
      {
        n: '48',
        title: 'Grounds for refusing enforcement of foreign awards',
        body: `(1) Enforcement of a foreign award may be refused, at the request of the party against whom it is invoked, only if that party furnishes proof of the grounds enumerated in the section — including incapacity of the parties, invalidity of the arbitration agreement, want of proper notice of the appointment of the arbitrator or of the arbitral proceedings, or the award dealing with a dispute not contemplated by or not falling within the terms of the submission to arbitration.`,
      },
    ],
  },
  {
    slug: 'specific-relief-act-1963',
    shortTitle: 'Specific Relief Act',
    year: 1963,
    actNumber: '47 of 1963',
    category: 'Civil',
    status: 'active',
    description: 'Defines the remedies available for enforcing individual civil rights — specific recovery of possession, specific performance of contracts, and injunctions.',
    officialUrl: 'https://www.indiacode.gov.in',
    standaloneSections: [
      {
        n: '10',
        title: 'Specific performance in respect of contracts',
        body: `Except as otherwise hereinafter provided, the specific performance of any contract shall, when the conditions prescribed in sections 11, 14 and 16 are satisfied, be enforced by the court, in particular for the specific performance of a contract respecting the transfer of immovable property or any interest therein, subject to the discretion of the court in the circumstances of the case.`,
      },
      {
        n: '38',
        title: 'Perpetual injunction when granted',
        body: `(1) Subject to the other provisions contained in or referred to by this Chapter, a perpetual injunction may be granted to the plaintiff to prevent the breach of an obligation existing in his favour, whether expressly or by implication.
(2) When any such obligation arises from contract, the court shall be guided by the rules and provisions contained in Chapter II of this Act.`,
      },
    ],
  },
];

export function buildActRows(): ActRow[] {
  return ACT_SEEDS.map((a, i) => ({
    id: i + 1,
    slug: a.slug,
    short_title: a.shortTitle,
    year: a.year,
    act_number: a.actNumber ?? null,
    jurisdiction: a.jurisdiction ?? 'central',
    category: a.category,
    status: a.status ?? 'active',
    description: a.description,
    last_updated: a.lastUpdated ?? null,
    official_url: a.officialUrl ?? null,
    content_status: 'placeholder',
    provenance: a.provenance ?? DEFAULT_PROVENANCE,
  }));
}

export function buildChapterRows(): { actId: number; chapters: Omit<ChapterRow, 'id'>[] }[] {
  return ACT_SEEDS.map((a, i) => ({
    actId: i + 1,
    chapters: (a.chapters ?? []).map((c, ci) => ({
      act_id: i + 1,
      number: c.number,
      title: c.title,
      display_title: `Chapter ${c.number}`,
      sort_order: ci + 1,
    })),
  }));
}

export function buildSectionRows(): { actId: number; rows: Omit<SectionRow, 'id'>[] }[] {
  return ACT_SEEDS.map((a, i) => {
    const rows: Omit<SectionRow, 'id'>[] = [];
    let chapterIndex = 0;
    for (const chapter of a.chapters ?? []) {
      chapterIndex += 1;
      for (const s of chapter.sections ?? []) {
        rows.push({
          act_id: i + 1,
          chapter_id: chapterIndex,
          number: s.n,
          title: s.title,
          body: s.body ?? PENDING,
          summary: null,
          sort_order: 0,
          last_amended: s.lastAmended ?? null,
          verified: 0,
        });
      }
    }
    for (const s of a.standaloneSections ?? []) {
      rows.push({
        act_id: i + 1,
        chapter_id: null,
        number: s.n,
        title: s.title,
        body: s.body ?? PENDING,
        summary: null,
        sort_order: 0,
        last_amended: s.lastAmended ?? null,
        verified: 0,
      });
    }
    // re-assign sort_order as a running index within the act
    rows.forEach((r, ri) => {
      r.sort_order = ri + 1;
    });
    return { actId: i + 1, rows };
  });
}