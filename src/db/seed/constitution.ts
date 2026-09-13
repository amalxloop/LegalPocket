import type { ArticleRow, PartRow } from '../../types';

export interface ArticleSeed {
  n: string;
  title: string | null;
  body: string | null;
  summary?: string | null;
}

export interface PartSeed {
  number: string;
  title: string;
  displayTitle: string;
  articles: ArticleSeed[];
}

/**
 * MVP seed content for the Constitution of India.
 *
 * NOTE: This is demonstration seed data for the MVP scaffold, written to mirror
 * the official text of the Constitution of India (as amended). The production
 * pipeline must replace this with text ingested from the official India Code
 * repository (indiacode.gov.in) and verified editorially, per PRD sections 3D/3E.
 * Sections marked PENDING have a placeholder body.
 */
export const PREAMBLE = `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
JUSTICE, social, economic and political;
LIBERTY of thought, expression, belief, faith and worship;
EQUALITY of status and of opportunity;
and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;
IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.`;

const FULL = (body: string) => body;

export const CONSTITUTION_PARTS: PartSeed[] = [
  {
    number: 'I',
    title: 'The Union and its Territory',
    displayTitle: 'PART I',
    articles: [
      {
        n: '1',
        title: 'Name and territory of the Union',
        body: FULL(`(1) India, that is Bharat, shall be a Union of States.
(2) The States and the territories thereof shall be as specified in the First Schedule.
(3) The territory of India shall comprise —
  (a) the territories of the States;
  (b) the Union territories specified in the First Schedule; and
  (c) such other territories as may be acquired.`),
      },
      {
        n: '2',
        title: 'Admission or establishment of new States',
        body: FULL(`Parliament may by law admit into the Union, or establish, new States on such terms and conditions, as it thinks fit.`),
      },
      {
        n: '3',
        title: 'Formation of new States and alteration of areas, boundaries or names of existing States',
        body: FULL(`Parliament may by law —
  (a) form a new State by separation of territory from any State or by uniting two or more States or parts of States or by uniting any territory to a part of any State;
  (b) increase the area of any State;
  (c) diminish the area of any State;
  (d) alter the boundaries of any State;
  (e) alter the name of any State:
Provided that no Bill for the purpose shall be introduced in either House of Parliament except on the recommendation of the President and unless, where the proposal contained in the Bill affects the area, boundaries or name of any of the States, the Bill has been referred by the President to the Legislature of that State for expressing its views thereon within such period as may be specified in the reference or within such further period as the President may allow and the period so specified or allowed has expired.`),
      },
      {
        n: '4',
        title: 'Laws made under articles 2 and 3 to provide for the amendment of the First and the Fourth Schedules and supplemental, incidental and consequential matters',
        body: FULL(`(1) Any law referred to in article 2 or article 3 shall contain such provisions for the amendment of the First Schedule and the Fourth Schedule as may be necessary to give effect to the provisions of the law and may also contain such supplemental, incidental and consequential provisions (including provisions as to representation in Parliament and in the Legislatures of the States or either House thereof) as Parliament may deem necessary.
(2) No such law as aforesaid shall be deemed to be an amendment of this Constitution for the purposes of article 368.`),
      },
    ],
  },
  {
    number: 'II',
    title: 'Citizenship',
    displayTitle: 'PART II',
    articles: [
      {
        n: '5',
        title: 'Citizenship at the commencement of the Constitution',
        body: FULL(`At the commencement of this Constitution, every person who has his domicile in the territory of India and —
  (a) who was born in the territory of India; or
  (b) either of whose parents was born in the territory of India; or
  (c) who has been ordinarily resident in the territory of India for not less than five years immediately preceding such commencement,
shall be a citizen of India.`),
      },
      {
        n: '6',
        title: 'Rights of citizenship of certain persons who have migrated to India from Pakistan',
        body: FULL(`Notwithstanding anything in article 5, a person who has migrated to the territory of India from the territory now included in Pakistan shall be deemed to be a citizen of India at the commencement of this Constitution if —
  (a) he or either of his parents or any of his grandparents was born in India as defined in the Government of India Act, 1935 (as originally enacted); and
  (b) (i) in the case where such person has so migrated before the nineteenth day of July, 1948, he has been ordinarily resident in the territory of India since the date of his migration, or
  (ii) in the case where such person has so migrated on or after the nineteenth day of July, 1948, he has been registered as a citizen of India by an officer appointed in that behalf by the Government of the Dominion of India on an application made by him therefor to such officer before the commencement of this Constitution.
Provided that no person shall be so registered unless he has been resident in the territory of India for at least six months immediately preceding the date of his application.`),
      },
      {
        n: '7',
        title: 'Rights of citizenship of certain migrants to Pakistan',
        body: FULL(`Notwithstanding anything in articles 5 and 6, a person who has after the first day of March, 1947, migrated from the territory of India to the territory now included in Pakistan shall not be deemed to be a citizen of India:
Provided that nothing in this article shall apply to a person who, after having so migrated to the territory now included in Pakistan, has returned to the territory of India under a permit for resettlement or permanent return issued by or under the authority of any law and every such person shall for the purposes of clause (b) of article 6 be deemed to have migrated to the territory of India after the nineteenth day of July, 1948.`),
      },
      {
        n: '8',
        title: 'Rights of citizenship of certain persons of Indian origin residing outside India',
        body: FULL(`Notwithstanding anything in article 5, any person who or either of whose parents or any of whose grandparents was born in India as defined in the Government of India Act, 1935 (as originally enacted), and who is ordinarily residing in any country outside India as so defined shall be deemed to be a citizen of India if he has been registered as a citizen of India by the diplomatic or consular representative of India in the country where he is for the time being residing on an application made by him therefor to such diplomatic or consular representative, whether before or after the commencement of this Constitution, in accordance with the rules made by the Government of the Dominion of India or the Government of India.`),
      },
      {
        n: '9',
        title: 'Persons voluntarily acquiring citizenship of a foreign State not to be citizens',
        body: FULL(`No person shall be a citizen of India by virtue of article 5, or be entitled to the rights of a citizen of India by virtue of article 6 or article 8, if he has voluntarily acquired the citizenship of any foreign State.`),
      },
      {
        n: '10',
        title: 'Continuance of the rights of citizenship',
        body: FULL(`Every person who is or is deemed to be a citizen of India under any of the foregoing provisions of this Part shall, subject to the provisions of any law that may be made by Parliament, continue to be such citizen.`),
      },
      {
        n: '11',
        title: 'Parliament to regulate the right of citizenship by law',
        body: FULL(`Nothing in the foregoing provisions of this Part shall derogate from the power of Parliament to make any provision with respect to the acquisition and termination of citizenship and all other matters relating to citizenship.`),
      },
    ],
  },
  {
    number: 'III',
    title: 'Fundamental Rights',
    displayTitle: 'PART III',
    articles: [
      {
        n: '12',
        title: 'Definition',
        body: FULL(`In this Part, unless the context otherwise requires, "the State" includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.`),
      },
      {
        n: '13',
        title: 'Laws inconsistent with or in derogation of the fundamental rights',
        body: FULL(`(1) All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void.
(2) The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void.
(3) In this article, unless the context otherwise requires, "law" includes any Ordinance, order, bye-law, rule, regulation, notification, custom or usage having in the territory of India the force of law.
(4) Nothing in this article shall apply to any amendment of this Constitution made under article 368.`),
      },
      {
        n: '14',
        title: 'Equality before law',
        body: FULL(`The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.`),
      },
      {
        n: '15',
        title: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth',
        body: FULL(`(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.
(2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to —
  (a) access to shops, public restaurants, hotels and places of public entertainment; or
  (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public.
(3) Nothing in this article shall prevent the State from making any special provision for women and children.
(4) Nothing in this article or in clause (2) of article 29 shall prevent the State from making any special provision for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes and the Scheduled Tribes.
(5) Nothing in this article or in sub-clause (g) of clause (1) of article 19 shall prevent the State from making any special provision, by law, for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes or the Scheduled Tribes in so far as such special provisions relate to their admission to educational institutions including private educational institutions, whether aided or unaided by the State, other than the minority educational institutions referred to in clause (1) of article 30.`),
      },
      {
        n: '16',
        title: 'Equality of opportunity in matters of public employment',
        body: FULL(`(1) There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.
(2) No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State.
(3) Nothing in this article shall prevent Parliament from making any law prescribing, in regard to a class or classes of employment or appointment to an office under the Government of, or any local or other authority within, a State or Union territory, any requirement as to residence within that State or Union territory prior to such employment or appointment.
(4) Nothing in this article shall prevent the State from making any provision for the reservation of appointments or posts in favour of any backward class of citizens which, in the opinion of the State, is not adequately represented in the services under the State.
(4A) Nothing in this article shall prevent the State from making any provision for reservation in matters of promotion, with consequential seniority, to any class or classes of posts in the services under the State in favour of the Scheduled Castes and the Scheduled Tribes which, in the opinion of the State, are not adequately represented in the services under the State.
(5) Nothing in this article shall affect the operation of any law which provides that the incumbent of an office in connection with the affairs of any religious or denominational institution or any member of the governing body thereof shall be a person professing a particular religion or belonging to a particular denomination.`),
      },
      {
        n: '17',
        title: 'Abolition of Untouchability',
        body: FULL(`"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.`),
      },
      {
        n: '18',
        title: 'Abolition of titles',
        body: FULL(`(1) No title, not being a military or academic distinction, shall be conferred by the State.
(2) No citizen of India shall accept any title from any foreign State.
(3) No person who is not a citizen of India shall, while he holds any office of profit or trust under the State, accept without the consent of the President any title from any foreign State.
(4) No person holding any office of profit or trust under the State shall, without the consent of the President, accept any present, emolument, or office of any kind from or under any foreign State.`),
      },
      {
        n: '19',
        title: 'Protection of certain rights regarding freedom of speech, etc.',
        body: FULL(`(1) All citizens shall have the right —
  (a) to freedom of speech and expression;
  (b) to assemble peaceably and without arms;
  (c) to form associations or unions;
  (d) to move freely throughout the territory of India;
  (e) to reside and settle in any part of the territory of India;
  (f) to practise any profession, or to carry on any occupation, trade or business.
(2) Nothing in sub-clause (a) of clause (1) shall affect the operation of any existing law, or prevent the State from making any law, in so far as such law imposes reasonable restrictions on the exercise of the right conferred by the said sub-clause in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality or in relation to contempt of court, defamation or incitement to an offence.
(3) Nothing in sub-clause (b) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, in the interests of the sovereignty and integrity of India or public order, reasonable restrictions on the exercise of the right conferred by the said sub-clause.
(4) Nothing in sub-clause (c) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, in the interests of the sovereignty and integrity of India or public order or morality, reasonable restrictions on the exercise of the right conferred by the said sub-clause.
(5) Nothing in sub-clause (d) and (e) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, reasonable restrictions on the exercise of any of the rights conferred by the said sub-clauses either in the interests of the general public or for the protection of the interests of any Scheduled Tribe.
(6) Nothing in sub-clause (g) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, in the interests of the general public, reasonable restrictions on the exercise of the right conferred by the said sub-clause, and, in particular, nothing in the said sub-clause shall affect the operation of any existing law in so far as it relates to, or prevent the State from making any law relating to —
  (i) the professional or technical qualifications necessary for practising any profession or carrying on any occupation, trade or business, or
  (ii) the carrying on by the State, or by a corporation owned or controlled by the State, of any trade, business, industry or service, whether to the exclusion, complete or partial, of citizens or otherwise.`),
      },
      {
        n: '20',
        title: 'Protection in respect of conviction for offences',
        body: FULL(`(1) No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence.
(2) No person shall be prosecuted and punished for the same offence more than once.
(3) No person accused of any offence shall be compelled to be a witness against himself.`),
      },
      {
        n: '21',
        title: 'Protection of life and personal liberty',
        body: FULL(`No person shall be deprived of his life or personal liberty except according to procedure established by law.`),
      },
      {
        n: '21A',
        title: 'Right to education',
        body: FULL(`The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.`),
      },
      {
        n: '22',
        title: 'Protection against arrest and detention in certain cases',
        body: FULL(`(1) No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice.
(2) Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate.
(3) Nothing in clauses (1) and (2) shall apply —
  (a) to any person who for the time being is an enemy alien; or
  (b) to any person who is arrested or detained under any law providing for preventive detention.
(4) No law providing for preventive detention shall authorise the detention of a person for a longer period than three months unless an Advisory Board consisting of persons who are, or have been, or are qualified to be appointed as, Judges of a High Court has reported before the expiration of the said period of three months that there is in its opinion sufficient cause for such detention: Provided that nothing in this clause shall authorise the detention of any person beyond the maximum period prescribed by any law made by Parliament under sub-clause (b) of clause (7).
(5) When any person is detained in pursuance of an order made under any law providing for preventive detention, the authority making the order shall, as soon as may be, communicate to such person the grounds on which the order has been made and shall afford him the earliest opportunity of making a representation against the order.
(6) Nothing in clause (5) shall require the authority making any such order as is referred to in that clause to disclose facts which such authority considers to be against the public interest to disclose.
(7) Parliament may by law prescribe —
  (a) the circumstances under which, and the class or classes of cases in which, a person may be detained for a period longer than three months under any law providing for preventive detention without obtaining the opinion of an Advisory Board in accordance with the provisions of clause (4);
  (b) the maximum period for which any person may in any class or classes of cases be detained under any law providing for preventive detention; and
  (c) the procedure to be followed by an Advisory Board in an inquiry under clause (4).`),
      },
      {
        n: '23',
        title: 'Prohibition of traffic in human beings and forced labour',
        body: FULL(`(1) Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law.
(2) Nothing in this article shall prevent the State from imposing compulsory service for public purposes, and in imposing such service the State shall not make any discrimination on grounds only of religion, race, caste or class or any of them.`),
      },
      {
        n: '24',
        title: 'Prohibition of employment of children in factories, etc.',
        body: FULL(`No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.`),
      },
      {
        n: '25',
        title: 'Freedom of conscience and free profession, practice and propagation of religion',
        body: FULL(`(1) Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.
(2) Nothing in this article shall affect the operation of any existing law or prevent the State from making any law —
  (a) regulating or restricting any economic, financial, political or other secular activity which may be associated with religious practice;
  (b) providing for social welfare and reform or the throwing open of Hindu religious institutions of a public character to all classes and sections of Hindus.`),
      },
      {
        n: '26',
        title: 'Freedom to manage religious affairs',
        body: FULL(`Subject to public order, morality and health, every religious denomination or any section thereof shall have the right —
  (a) to establish and maintain institutions for religious and charitable purposes;
  (b) to manage its own affairs in matters of religion;
  (c) to own and acquire movable and immovable property; and
  (d) to administer such property in accordance with law.`),
      },
      {
        n: '27',
        title: 'Freedom as to payment of taxes for promotion of any particular religion',
        body: FULL(`No person shall be compelled to pay any taxes, the proceeds of which are specifically appropriated in payment of expenses for the promotion or maintenance of any particular religion or religious denomination.`),
      },
      {
        n: '28',
        title: 'Freedom as to attendance at religious instruction or religious worship in certain educational institutions',
        body: FULL(`(1) No religious instruction shall be provided in any educational institution wholly maintained out of State funds.
(2) Nothing in clause (1) shall apply to an educational institution which is administered by the State but has been established under any endowment or trust which requires that religious instruction shall be imparted in such institution.
(3) No person attending any educational institution recognised by the State or receiving aid out of State funds shall be required to take part in any religious instruction that may be imparted in such institution or to attend any religious worship that may be conducted in such institution or in any premises attached thereto unless such person or, if such person is a minor, his guardian has given his consent thereto.`),
      },
      {
        n: '29',
        title: 'Protection of interests of minorities',
        body: FULL(`(1) Any section of the citizens residing in the territory of India or any part thereof having a distinct language, script or culture of its own shall have the right to conserve the same.
(2) No citizen shall be denied admission into any educational institution maintained by the State or receiving aid out of State funds on grounds only of religion, race, caste, language or any of them.`),
      },
      {
        n: '30',
        title: 'Right of minorities to establish and administer educational institutions',
        body: FULL(`(1) All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice.
(1A) In making any law providing for the compulsory acquisition of any property of an educational institution established and administered by a minority, referred to in clause (1), the State shall ensure that the amount fixed by or determined under such law for the acquisition of such property is such as would not restrict or abrogate the right guaranteed under that clause.
(2) The State shall not, in granting aid to educational institutions, discriminate against any educational institution on the ground that it is under the management of a minority, whether based on religion or language.`),
      },
      {
        n: '31',
        title: 'Compulsory acquisition of property [Repealed]',
        body: FULL(`[Repealed by the Constitution (Forty-fourth Amendment) Act, 1978, section 6 (w.e.f. 20-6-1979). The right to property ceased to be a fundamental right; it now exists as a constitutional right under article 300A.]`),
      },
      {
        n: '32',
        title: 'Remedies for enforcement of rights conferred by this Part',
        body: FULL(`(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.
(2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part.
(3) Without prejudice to the powers conferred on the Supreme Court by clauses (1) and (2), Parliament may by law empower any other court to exercise within the local limits of its jurisdiction all or any of the powers exercisable by the Supreme Court under clause (2).
(4) The right guaranteed by this article shall not be suspended except as otherwise provided for by this Constitution.`),
      },
      {
        n: '32A',
        title: '[Repealed, Constitution (Forty-third Amendment) Act, 1977]',
        body: null,
      },
      {
        n: '33',
        title: 'Power of Parliament to modify the rights conferred by this Part in their application to Forces, etc.',
        body: FULL(`Parliament may, by law, determine to what extent any of the rights conferred by this Part shall, in their application to —
  (a) the members of the Armed Forces; or
  (b) the members of the Forces charged with the maintenance of public order; or
  (c) persons employed in any bureau or other organisation established by the State for purposes of intelligence or counter intelligence; or
  (d) persons employed in, or in connection with, the telecommunication systems set up for the purposes of any Force, bureau or organisation referred to in clauses (a) to (c),
be restricted or abrogated so as to ensure the proper discharge of their duties and the maintenance of discipline among them.`),
      },
      {
        n: '34',
        title: 'Restriction on rights conferred by this Part while martial law is in force in any area',
        body: FULL(`Notwithstanding anything in the foregoing provisions of this Part, Parliament may by law indemnify any person in the service of the Union or of a State or any other person in respect of any act done by him in connection with the maintenance or restoration of order in any area within the territory of India where martial law was in force or validate any sentence passed, punishment inflicted, forfeiture ordered or other act done under martial law in such area.`),
      },
      {
        n: '35',
        title: 'Legislation to give effect to the provisions of this Part',
        body: FULL(`Notwithstanding anything in this Constitution —
  (a) Parliament shall have, and the Legislature of a State shall not have, power to make laws —
    (i) with respect to any of the matters which under clause (3) of article 16, clause (3) of article 32, article 33 and article 34 may be provided for by law made by Parliament; and
    (ii) for prescribing punishment for those acts which are declared to be offences under this Part; and Parliament shall, as soon as may be after the commencement of this Constitution, make laws for prescribing punishment for the acts referred to in sub-clause (ii);
  (b) any law in force immediately before the commencement of this Constitution in the territory of India with respect to any of the matters referred to in sub-clause (i) of clause (a) or providing for punishment for any act referred to in sub-clause (ii) of clause (a) shall, subject to the terms thereof and to any adaptations and modifications that may be made therein under article 372, continue in force until altered or repealed or amended by Parliament.`),
      },
    ],
  },
  {
    number: 'IV',
    title: 'Directive Principles of State Policy',
    displayTitle: 'PART IV',
    articles: [
      {
        n: '36',
        title: 'Definition',
        body: FULL(`In this Part, unless the context otherwise requires, "the State" has the same meaning as in Part III.`),
      },
      {
        n: '37',
        title: 'Application of the principles contained in this Part',
        body: FULL(`The provisions contained in this Part shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws.`),
      },
      {
        n: '38',
        title: 'State to secure a social order for the promotion of welfare of the people',
        body: FULL(`(1) The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life.
(2) The State shall, in particular, strive to minimise the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities, not only amongst individuals but also amongst groups of people residing in different areas or engaged in different vocations.`),
      },
      {
        n: '39',
        title: 'Certain principles of policy to be followed by the State',
        body: FULL(`The State shall, in particular, direct its policy towards securing —
  (a) that the citizens, men and women equally, have the right to an adequate means of livelihood;
  (b) that the ownership and control of the material resources of the community are so distributed as best to subserve the common good;
  (c) that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment;
  (d) that there is equal pay for equal work for both men and women;
  (e) that the health and strength of workers, men and women, and the tender age of children are not abused and that citizens are not forced by economic necessity to enter avocations unsuited to their age or strength;
  (f) that children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity and that childhood and youth are protected against exploitation and against moral and material abandonment.`),
      },
      {
        n: '39A',
        title: 'Equal justice and free legal aid',
        body: FULL(`The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.`),
      },
      {
        n: '40',
        title: 'Organisation of village panchayats',
        body: FULL(`The State shall take steps to organise village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government.`),
      },
      {
        n: '41',
        title: 'Right to work, to education and to public assistance in certain cases',
        body: FULL(`The State shall, within the limits of its economic capacity and development, make effective provision for securing the right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement, and in other cases of undeserved want.`),
      },
      {
        n: '42',
        title: 'Provision for just and humane conditions of work and maternity relief',
        body: FULL(`The State shall make provision for securing just and humane conditions of work and for maternity relief.`),
      },
      {
        n: '43',
        title: 'Living wage, etc., for workers',
        body: FULL(`The State shall endeavour to secure, by suitable legislation or economic organisation or in any other way, to all workers, agricultural, industrial or otherwise, work, a living wage, conditions of work ensuring a decent standard of life and full enjoyment of leisure and social and cultural opportunities and, in particular, the State shall endeavour to promote cottage industries on an individual or co-operative basis in rural areas.`),
      },
      {
        n: '43A',
        title: 'Participation of workers in management of industries',
        body: FULL(`The State shall take steps, by suitable legislation or in any other way, to secure the participation of workers in the management of undertakings, establishments or other organisations engaged in any industry.`),
      },
      {
        n: '44',
        title: 'Uniform civil code for the citizens',
        body: FULL(`The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.`),
      },
      {
        n: '45',
        title: 'Provision for early childhood care and education to children below the age of six years',
        body: FULL(`The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years.`),
      },
      {
        n: '46',
        title: 'Promotion of educational and economic interests of Scheduled Castes, Scheduled Tribes and other weaker sections',
        body: FULL(`The State shall promote with special care the educational and economic interests of the weaker sections of the people, and, in particular, of the Scheduled Castes and the Scheduled Tribes, and shall protect them from social injustice and all forms of exploitation.`),
      },
      {
        n: '47',
        title: 'Duty of the State to raise the level of nutrition and the standard of living and to improve public health',
        body: FULL(`The State shall regard the raising of the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties and, in particular, the State shall endeavour to bring about prohibition of the consumption except for medicinal purposes of intoxicating drinks and of drugs which are injurious to health.`),
      },
      {
        n: '48',
        title: 'Organisation of agriculture and animal husbandry',
        body: FULL(`The State shall endeavour to organise agriculture and animal husbandry on modern and scientific lines and shall, in particular, take steps for preserving and improving the breeds, and prohibiting the slaughter, of cows and calves and other milch and draught cattle.`),
      },
      {
        n: '48A',
        title: 'Protection and improvement of environment and safeguarding of forests and wild life',
        body: FULL(`The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.`),
      },
      {
        n: '49',
        title: 'Protection of monuments and places and objects of national importance',
        body: FULL(`It shall be the obligation of the State to protect every monument or place or object of artistic or historic interest, declared by or under law made by Parliament to be of national importance, from spoliation, disfigurement, destruction, removal, disposal or export, as the case may be.`),
      },
      {
        n: '50',
        title: 'Separation of judiciary from executive',
        body: FULL(`The State shall take steps to separate the judiciary from the executive in the public services of the State.`),
      },
      {
        n: '51',
        title: 'Promotion of international peace and security',
        body: FULL(`The State shall endeavour to —
  (a) promote international peace and security;
  (b) maintain just and honourable relations between nations;
  (c) foster respect for international law and treaty obligations in the dealings of organised peoples with one another; and
  (d) encourage settlement of international disputes by arbitration.`),
      },
    ],
  },
  {
    number: 'IVA',
    title: 'Fundamental Duties',
    displayTitle: 'PART IVA',
    articles: [
      {
        n: '51A',
        title: 'Fundamental duties',
        body: FULL(`It shall be the duty of every citizen of India —
  (a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem;
  (b) to cherish and follow the noble ideals which inspired our national struggle for freedom;
  (c) to uphold and protect the sovereignty, unity and integrity of India;
  (d) to defend the country and render national service when called upon to do so;
  (e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women;
  (f) to value and preserve the rich heritage of our composite culture;
  (g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures;
  (h) to develop the scientific temper, humanism and the spirit of inquiry and reform;
  (i) to safeguard public property and to abjure violence;
  (j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement;
  (k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.`),
      },
    ],
  },
  {
    number: 'V',
    title: 'The Union',
    displayTitle: 'PART V',
    articles: [
      { n: '52', title: 'The President of India', body: FULL(`There shall be a President of India.`) },
      {
        n: '53',
        title: 'Executive power of the Union',
        body: FULL(`(1) The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him in accordance with this Constitution.
(2) Without prejudice to the generality of the foregoing provision, the supreme command of the Defence Forces of the Union shall be vested in the President and the exercise thereof shall be regulated by law.
(3) Nothing in this article shall —
  (a) be deemed to transfer to the President any functions conferred by any existing law on the Government of any State or other authority; or
  (b) prevent Parliament from conferring by law functions on authorities other than the President.`),
      },
      { n: '54', title: 'Election of President', body: null },
      { n: '55', title: 'Manner of election of President', body: null },
      { n: '56', title: 'Term of office of President', body: null },
      { n: '57', title: 'Eligibility for re-election', body: null },
      { n: '58', title: 'Qualifications for election as President', body: null },
      { n: '59', title: 'Conditions of President\'s office', body: null },
      { n: '60', title: 'Oath or affirmation by the President', body: null },
      { n: '61', title: 'Procedure for impeachment of the President', body: null },
      { n: '62', title: 'Time of holding election to fill vacancy in the office of President and the term of office of person elected to fill casual vacancy', body: null },
      { n: '63', title: 'The Vice-President of India', body: null },
      { n: '64', title: 'The Vice-President to be ex officio Chairman of the Council of States', body: null },
      { n: '65', title: 'The Vice-President to act as President or to discharge his functions during casual vacancies in the office, or during the absence, of President', body: null },
      { n: '66', title: 'Election of Vice-President', body: null },
      { n: '67', title: 'Term of office of Vice-President', body: null },
      { n: '68', title: 'Time of election to fill vacancy in the office of Vice-President and the term of office of person elected to fill the casual vacancy', body: null },
      { n: '69', title: 'Oath or affirmation by the Vice-President', body: null },
      { n: '70', title: 'Discharge of President\'s functions in other contingencies', body: null },
      { n: '71', title: 'Matters relating to, or connected with, the election of a President or Vice-President', body: null },
      { n: '72', title: 'Power of President to grant pardons, etc., and to suspend, remit or commute sentences in certain cases', body: FULL(`(1) The President shall have the power to grant pardons, reprieves, respites or remissions of punishment or to suspend, remit or commute the sentence of any person convicted of any offence —
  (a) in all cases where the punishment or sentence is by a Court Martial;
  (b) in all cases where the punishment or sentence is for an offence against any law relating to a matter to which the executive power of the Union extends;
  (c) in all cases where the sentence is a sentence of death.
(2) Nothing in sub-clause (a) of clause (1) shall affect the power conferred by law on any officer of the Armed Forces of the Union to suspend, remit or commute a sentence passed by a Court Martial.
(3) Nothing in sub-clause (c) of clause (1) shall affect the power to suspend, remit or commute a sentence of death exercisable by the Governor of a State under any law for the time being in force.`) },
      { n: '73', title: 'Extent of executive power of the Union', body: null },
      {
        n: '74',
        title: 'Council of Ministers to aid and advise President',
        body: FULL(`(1) There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice: Provided that the President may require the Council of Ministers to reconsider such advice, either generally or otherwise, and the President shall act in accordance with the advice tendered after such reconsideration.
(2) The question whether any, and if so what, advice was tendered by Ministers to the President shall not be inquired into in any court.`),
      },
      {
        n: '75',
        title: 'Other provisions as to Ministers',
        body: FULL(`(1) The Prime Minister shall be appointed by the President and the other Ministers shall be appointed by the President on the advice of the Prime Minister.
(1A) The total number of Ministers, including the Prime Minister, in the Council of Ministers shall not exceed fifteen per cent. of the total number of members of the House of the People.
(2) The Ministers shall hold office during the pleasure of the President.
(3) The Council of Ministers shall be collectively responsible to the House of the People.
(4) Before a Minister enters upon his office, the President shall administer to him the oaths of office and of secrecy according to the forms set out for the purpose in the Third Schedule.
(5) A Minister who for any period of six consecutive months is not a member of either House of Parliament shall at the expiration of that period cease to be a Minister.`),
      },
      {
        n: '76',
        title: 'Attorney-General for India',
        body: FULL(`(1) The President shall appoint a person who is qualified to be appointed a Judge of the Supreme Court to be Attorney-General for India.
(2) It shall be the duty of the Attorney-General for India to give advice to the Government of India upon such legal matters, and to perform such other duties of a legal character, as may from time to time be referred or assigned to him by the President, and to discharge the functions conferred on him by or under this Constitution or any other law for the time being in force.
(3) In the performance of his duties the Attorney-General shall have right of audience in all courts in the territory of India.
(4) The Attorney-General shall hold office during the pleasure of the President, and shall receive such remuneration as the President may determine.`),
      },
      { n: '77', title: 'Conduct of business of the Government of India', body: null },
      { n: '78', title: 'Duties of Prime Minister as respects the furnishing of information to the President, etc.', body: null },
      {
        n: '79',
        title: 'Constitution of Parliament',
        body: FULL(`There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States and the House of the People.`),
      },
      {
        n: '80',
        title: 'Composition of the Council of States',
        body: FULL(`(1) The Council of States shall consist of —
  (a) twelve members to be nominated by the President in accordance with the provisions of clause (3); and
  (b) not more than two hundred and thirty-eight representatives of the States and of the Union territories.
(2) The allocation of seats in the Council of States to be filled by representatives of the States and of the Union territories shall be in accordance with the provisions in that behalf contained in the Fourth Schedule.
(3) The members to be nominated by the President under sub-clause (a) of clause (1) shall consist of persons having special knowledge or practical experience in respect of such matters as the following, namely: Literature, science, art and social service.
(4) The representatives of States in the Council of States shall be elected by the elected members of the Legislative Assembly of the State concerned in accordance with the system of proportional representation by means of the single transferable vote.
(5) The representatives of the Union territories in the Council of States shall be chosen in such manner as Parliament may by law prescribe.`),
      },
      { n: '81', title: 'Composition of the House of the People', body: null },
      { n: '82', title: 'Readjustment after each census', body: null },
      { n: '83', title: 'Duration of Houses of Parliament', body: null },
      { n: '84', title: 'Qualification for membership of Parliament', body: null },
      { n: '85', title: 'Sessions of Parliament, prorogation and dissolution', body: null },
      { n: '86', title: 'Right of President to address and send messages to Houses', body: null },
      { n: '87', title: 'Special address by the President', body: null },
      { n: '88', title: 'Rights of Ministers and Attorney-General as respects Houses', body: null },
      { n: '89', title: 'The Chairman and Deputy Chairman of the Council of States', body: null },
      { n: '90', title: 'Vacation and resignation of, and removal from, the office of Deputy Chairman', body: null },
      { n: '91', title: 'Power of the Deputy Chairman or other person to perform the duties of the office of, or to act as, Chairman', body: null },
      { n: '92', title: 'The Chairman or the Deputy Chairman not to preside while a resolution for his removal from office is under consideration', body: null },
      { n: '93', title: 'The Speaker and Deputy Speaker of the House of the People', body: null },
      { n: '94', title: 'Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker', body: null },
      { n: '95', title: 'Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker', body: null },
      { n: '96', title: 'The Speaker or the Deputy Speaker not to preside while a resolution for his removal from office is under consideration', body: null },
      { n: '97', title: 'Salaries and allowances of the Chairman and Deputy Chairman and the Speaker and Deputy Speaker', body: null },
      { n: '98', title: 'Secretariat of Parliament', body: null },
      { n: '99', title: 'Oath or affirmation by members', body: null },
      { n: '100', title: 'Voting in Houses, power of Houses to act notwithstanding vacancies and quorum', body: null },
      { n: '101', title: 'Vacation of seats', body: null },
      { n: '102', title: 'Disqualifications for membership', body: null },
      { n: '103', title: 'Decision on questions as to disqualifications of members', body: null },
      { n: '104', title: 'Penalty for sitting and voting before making oath or affirmation under article 99 or when not qualified or when disqualified', body: null },
      { n: '105', title: 'Powers, privileges, etc., of the Houses of Parliament and of the members and committees thereof', body: null },
      { n: '106', title: 'Salaries and allowances of members', body: null },
      { n: '107', title: 'Provisions as to introduction and passing of Bills', body: null },
      { n: '108', title: 'Joint sitting of both Houses in certain cases', body: null },
      { n: '109', title: 'Special procedure in respect of Money Bills', body: null },
      {
        n: '110',
        title: 'Definition of "Money Bills"',
        body: FULL(`(1) For the purposes of this Chapter, a Bill shall be deemed to be a Money Bill if it contains only provisions dealing with all or any of the following matters, namely —
  (a) the imposition, abolition, remission, alteration or regulation of any tax;
  (b) the regulation of the borrowing of money or the giving of any guarantee by the Government of India, or the amendment of the law with respect to any financial obligations undertaken or to be undertaken by the Government of India;
  (c) the custody of the Consolidated Fund of India or the Contingency Fund of India, the payment of moneys into or the withdrawal of moneys from any such Fund;
  (d) the appropriation of moneys out of the Consolidated Fund of India;
  (e) the declaring of any expenditure to be expenditure charged on the Consolidated Fund of India or the increasing of the amount of any such expenditure;
  (f) the receipt of money on account of the Consolidated Fund of India or the public account of India or the custody or issue of such money or the receipt of money on account of, or the custody or issue of, a Contingency Fund of India or the audit of the accounts of the Union or of a State.
(2) A Bill shall not be deemed to be a Money Bill by reason only that it provides for the imposition of fines or other pecuniary penalties, or for the demand or payment of fees for licences or licences for services, or by reason that it provides for the imposition, abolition, remission, alteration or regulation of any tax by any local authority or body for local purposes.
(3) If any question arises whether a Bill is a Money Bill or not, the decision of the Speaker of the House of the People thereon shall be final.
(4) There shall be endorsed on every Money Bill when it is transmitted to the Council of States under article 109, and when it is presented to the President for assent under article 111, the certificate of the Speaker of the House of the People signed by him that it is a Money Bill.`),
      },
      { n: '111', title: 'Assent to Bills', body: null },
      {
        n: '112',
        title: 'Annual financial statement',
        body: FULL(`(1) The President shall in respect of every financial year cause to be laid before both the Houses of Parliament a statement of the estimated receipts and expenditure of the Government of India for that year, in this Part referred to as the "annual financial statement".
(2) The estimates of expenditure embodied in the annual financial statement shall show separately —
  (a) the sums required to meet expenditure described by this Constitution as expenditure charged upon the Consolidated Fund of India; and
  (b) the sums required to meet other expenditure proposed to be made from the Consolidated Fund of India,
and shall distinguish expenditure on revenue account from other expenditure.
(3) The following expenditure shall be expenditure charged on the Consolidated Fund of India —
  (a) the emoluments and allowances of the President and other expenditure relating to his office;
  (b) the salaries and allowances of the Chairman and the Deputy Chairman of the Council of States and the Speaker and the Deputy Speaker of the House of the People;
  (c) debt charges for which the Government of India is liable including interest, sinking fund charges and redemption charges, and other expenditure relating to the raising of loans and the service and redemption of debt;
  (d) (i) the salaries, allowances and pensions payable to or in respect of Judges of the Supreme Court;
  (ii) the pensions payable to or in respect of Judges of any High Court;
  (iii) the pensions payable to or in respect of Judges of any court of final jurisdiction in India;
  (e) the salary, allowances and pension payable to or in respect of the Comptroller and Auditor-General of India;
  (f) any sums required to satisfy any judgment, decree or award of any court or arbitral tribunal;
  (g) any other expenditure declared by this Constitution or by Parliament by law to be so charged.`),
      },
      { n: '113', title: 'Procedure in Parliament with respect to estimates', body: null },
      { n: '114', title: 'Appropriation Bills', body: null },
      { n: '115', title: 'Supplementary, additional or excess grants', body: null },
      { n: '116', title: 'Votes on account, votes of credit and exceptional grants', body: null },
      { n: '117', title: 'Special provisions as to financial Bills', body: null },
      { n: '118', title: 'Rules of procedure', body: null },
      { n: '119', title: 'Regulation by law of procedure in Parliament in relation to financial business', body: null },
      { n: '120', title: 'Language to be used in Parliament', body: null },
      { n: '121', title: 'Restriction on discussion in Parliament', body: null },
      { n: '122', title: 'Courts not to inquire into proceedings of Parliament', body: null },
      {
        n: '123',
        title: 'Power of President to promulgate Ordinances during recess of Parliament',
        body: FULL(`(1) If at any time, except when both Houses of Parliament are in session, the President is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate such Ordinances as the circumstances appear to him to require.
(2) An Ordinance promulgated under this article shall have the same force and effect as an Act of Parliament, but every such Ordinance shall be laid before both Houses of Parliament and shall cease to operate at the expiration of six weeks from the reassembly of Parliament, or, if before the expiration of that period a resolution disapproving it is passed by both Houses, upon the passing of that resolution; and may be withdrawn at any time by the President.
(3) If and so far as an Ordinance under this article makes any provision which Parliament would not under this Constitution be competent to enact, it shall be void.`),
      },
      {
        n: '124',
        title: 'Establishment and constitution of Supreme Court',
        body: FULL(`(1) There shall be a Supreme Court of India consisting of a Chief Justice of India and, until Parliament by law prescribes a larger number, of not more than seven other Judges.
(2) Every Judge of the Supreme Court shall be appointed by the President by warrant under his hand and seal after consultation with such of the Judges of the Supreme Court and of the High Courts in the States as the President may deem necessary for the purpose and shall hold office until he attains the age of sixty-five years: Provided that in the case of appointment of a Judge other than the Chief Justice, the Chief Justice of India shall always be consulted.
(3) A person shall not be qualified for appointment as a Judge of the Supreme Court unless he is a citizen of India and —
  (a) has been for at least five years a Judge of a High Court or of two or more such Courts in succession; or
  (b) has been for at least ten years an advocate of a High Court or of two or more such Courts in succession; or
  (c) is, in the opinion of the President, a distinguished jurist.
(4) A Judge of the Supreme Court shall not be removed from his office except by an order of the President passed after an address by each House of Parliament supported by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting has been presented to the President in the same session for such removal on the ground of proved misbehaviour or incapacity.
(5) Parliament may by law regulate the procedure for the presentation of an address and for the investigation and proof of the misbehaviour or incapacity of a Judge under clause (4).
(6) Every person appointed to be a Judge of the Supreme Court shall, before he enters upon his office, make and subscribe before the President, or some person appointed in that behalf by him, an oath or affirmation according to the form set out for the purpose in the Third Schedule.
(7) No person who has held office as a Judge of the Supreme Court shall plead or act in any court or before any authority within the territory of India.`),
      },
      { n: '125', title: 'Salaries, etc., of Judges', body: null },
      {
        n: '126',
        title: 'Appointment of acting Chief Justice',
        body: FULL(`When the office of Chief Justice of India is vacant or when the Chief Justice is, by reason of absence or otherwise, unable to perform the duties of his office, the duties of the office shall be performed by such one of the other Judges of the Court as the President may appoint for the purpose.`),
      },
      { n: '127', title: 'Appointment of ad hoc judges', body: null },
      { n: '128', title: 'Attendance of retired Judges at sittings of the Supreme Court', body: null },
      { n: '129', title: 'Supreme Court to be a court of record', body: null },
      { n: '130', title: 'Seat of Supreme Court', body: null },
      { n: '131', title: 'Original jurisdiction of the Supreme Court', body: null },
      { n: '132', title: 'Appellate jurisdiction of Supreme Court in appeals from High Courts in certain cases', body: null },
      { n: '133', title: 'Appellate jurisdiction of Supreme Court in appeals from High Courts in regard to civil matters', body: null },
      { n: '134', title: 'Appellate jurisdiction of Supreme Court in regard to criminal matters', body: null },
      { n: '134A', title: 'Certificate for appeal to the Supreme Court', body: null },
      { n: '135', title: 'Jurisdiction and powers of the Federal Court under existing law to be exercisable by the Supreme Court', body: null },
      { n: '136', title: 'Special leave to appeal by the Supreme Court', body: null },
      {
        n: '137',
        title: 'Review of judgments or orders by the Supreme Court',
        body: FULL(`Subject to the provisions of any law made by Parliament or any rules made under article 145, the Supreme Court shall have power to review any judgment pronounced or order made by it.`),
      },
      { n: '138', title: 'Enlargement of the jurisdiction of the Supreme Court', body: null },
      { n: '139', title: 'Conferment on the Supreme Court of powers to issue certain writs', body: null },
      { n: '139A', title: 'Transfer of certain cases', body: null },
      { n: '140', title: 'Ancillary powers of Supreme Court', body: null },
      {
        n: '141',
        title: 'Law declared by Supreme Court to be binding on all courts',
        body: FULL(`The law declared by the Supreme Court shall be binding on all courts within the territory of India.`),
      },
      {
        n: '142',
        title: 'Enforcement of decrees and orders of Supreme Court and orders as to discovery, etc.',
        body: FULL(`(1) The Supreme Court in the exercise of its jurisdiction may pass such decree or make such order as is necessary for doing complete justice in any cause or matter pending before it, and any decree so passed or order so made shall be enforceable throughout the territory of India in such manner as may be prescribed by or under any law made by Parliament and, until provision in that behalf is so made, in such manner as the President may by order prescribe.
(2) Subject to the provisions of any law made in this behalf by Parliament, the Supreme Court shall, as respects the whole of the territory of India, have all and every power to make any order for the purpose of securing the attendance of any person, the production or discovery of any documents, or the investigation or punishment of any contempt of itself.`),
      },
      { n: '143', title: 'Power of President to consult Supreme Court', body: null },
      { n: '144', title: 'Civil and judicial authorities to act in aid of the Supreme Court', body: null },
      { n: '145', title: 'Rules of Court, etc.', body: null },
      { n: '146', title: 'Officers and servants and the expenses of the Supreme Court', body: null },
      { n: '147', title: 'Interpretation', body: null },
      { n: '148', title: 'Comptroller and Auditor-General of India', body: null },
      { n: '149', title: 'Duties and powers of the Comptroller and Auditor-General', body: null },
      { n: '150', title: 'Form of accounts of the Union and of the States', body: null },
      { n: '151', title: 'Audit reports', body: null },
    ],
  },
  {
    number: 'VI',
    title: 'The States',
    displayTitle: 'PART VI',
    articles: [
      { n: '152', title: 'Definition', body: null },
      { n: '153', title: 'Governors of States', body: null },
      { n: '154', title: 'Executive power of State', body: null },
      { n: '155', title: 'Appointment of Governor', body: null },
      { n: '156', title: 'Term of office of Governor', body: null },
      { n: '157', title: 'Qualifications for appointment as Governor', body: null },
      { n: '158', title: 'Conditions of Governor\'s office', body: null },
      { n: '159', title: 'Oath or affirmation by the Governor', body: null },
      { n: '160', title: 'Discharge of the functions of the Governor in certain contingencies', body: null },
      { n: '161', title: 'Power of Governor to grant pardons, etc., and to suspend, remit or commute sentences in certain cases', body: null },
      { n: '162', title: 'Extent of executive power of State', body: null },
      { n: '163', title: 'Council of Ministers to aid and advise Governor', body: null },
      { n: '164', title: 'Other provisions as to Ministers', body: null },
      { n: '165', title: 'Advocate-General for the State', body: null },
      { n: '166', title: 'Conduct of business of the Government of a State', body: null },
      { n: '167', title: 'Duties of Chief Minister as respects the furnishing of information to Governor, etc.', body: null },
      { n: '168', title: 'Constitution of Legislatures in States', body: null },
      { n: '169', title: 'Abolition or creation of Legislative Councils in States', body: null },
      { n: '170', title: 'Composition of the Legislative Assemblies', body: null },
      { n: '171', title: 'Composition of the Legislative Councils', body: null },
      { n: '172', title: 'Duration of State Legislatures', body: null },
      { n: '173', title: 'Qualification for membership of the State Legislature', body: null },
      { n: '174', title: 'Sessions of the State Legislature, prorogation and dissolution', body: null },
      { n: '175', title: 'Right of Governor to address and send messages to the House or Houses', body: null },
      { n: '176', title: 'Special address by the Governor', body: null },
      { n: '177', title: 'Rights of Ministers and Advocate-General as respects the Houses', body: null },
      { n: '178', title: 'The Speaker and Deputy Speaker of the Legislative Assembly', body: null },
      { n: '179', title: 'Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker', body: null },
      { n: '180', title: 'Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker', body: null },
      { n: '181', title: 'The Speaker or the Deputy Speaker not to preside while a resolution for his removal from office is under consideration', body: null },
      { n: '182', title: 'The Chairman and Deputy Chairman of the Legislative Council', body: null },
      { n: '183', title: 'Vacation and resignation of, and removal from, the offices of Chairman and Deputy Chairman', body: null },
      { n: '184', title: 'Power of the Deputy Chairman or other person to perform the duties of the office of, or to act as, Chairman', body: null },
      { n: '185', title: 'The Chairman or the Deputy Chairman not to preside while a resolution for his removal from office is under consideration', body: null },
      { n: '186', title: 'Salaries and allowances of the Speaker and Deputy Speaker and the Chairman and Deputy Chairman', body: null },
      { n: '187', title: 'Secretariat of State Legislature', body: null },
      { n: '188', title: 'Oath or affirmation by members', body: null },
      { n: '189', title: 'Voting in Houses, power of Houses to act notwithstanding vacancies and quorum', body: null },
      { n: '190', title: 'Vacation of seats', body: null },
      { n: '191', title: 'Disqualifications for membership', body: null },
      { n: '192', title: 'Decision on questions as to disqualifications of members', body: null },
      { n: '193', title: 'Penalty for sitting and voting before making oath or affirmation under article 188 or when not qualified or when disqualified', body: null },
      { n: '194', title: 'Powers, privileges, etc., of the Houses of Legislatures and of the members and committees thereof', body: null },
      { n: '195', title: 'Salaries and allowances of members', body: null },
      { n: '196', title: 'Provisions as to introduction and passing of Bills', body: null },
      { n: '197', title: 'Restriction on powers of Legislative Council as to Bills other than Money Bills', body: null },
      { n: '198', title: 'Special procedure in respect of Money Bills', body: null },
      { n: '199', title: 'Definition of "Money Bills"', body: null },
      { n: '200', title: 'Assent to Bills', body: null },
      { n: '201', title: 'Bills reserved for consideration', body: null },
      { n: '202', title: 'Annual financial statement', body: null },
      { n: '203', title: 'Procedure in Legislature with respect to estimates', body: null },
      { n: '204', title: 'Appropriation Bills', body: null },
      { n: '205', title: 'Supplementary, additional or excess grants', body: null },
      { n: '206', title: 'Votes on account, votes of credit and exceptional grants', body: null },
      { n: '207', title: 'Special provisions as to financial Bills', body: null },
      { n: '208', title: 'Rules of procedure', body: null },
      { n: '209', title: 'Regulation by law of procedure in the Legislature of the State in relation to financial business', body: null },
      { n: '210', title: 'Language to be used in the Legislature', body: null },
      { n: '211', title: 'Restriction on discussion in the Legislature', body: null },
      { n: '212', title: 'Courts not to inquire into proceedings of the Legislature', body: null },
      { n: '213', title: 'Power of Governor to promulgate Ordinances during recess of Legislature', body: null },
      { n: '214', title: 'High Courts for States', body: null },
      { n: '215', title: 'High Courts to be courts of record', body: null },
      { n: '216', title: 'Constitution of High Courts', body: null },
      { n: '217', title: 'Appointment and conditions of the office of a Judge of a High Court', body: null },
      { n: '218', title: 'Application of certain provisions relating to Supreme Court to High Courts', body: null },
      { n: '219', title: 'Oath or affirmation by Judges of High Courts', body: null },
      { n: '220', title: 'Restriction on practice after being a permanent Judge', body: null },
      { n: '221', title: 'Salaries, etc., of Judges', body: null },
      { n: '222', title: 'Transfer of a Judge from one High Court to another', body: null },
      { n: '223', title: 'Appointment of acting Chief Justice', body: null },
      { n: '224', title: 'Appointment of additional and acting Judges', body: null },
      { n: '224A', title: 'Appointment of retired Judges at sittings of High Courts', body: null },
      { n: '225', title: 'Jurisdiction of existing High Courts', body: null },
      {
        n: '226',
        title: 'Power of High Courts to issue certain writs',
        body: FULL(`(1) Notwithstanding anything in article 32, every High Court shall have power, throughout the territory in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, or any of them, for the enforcement of any of the rights conferred by Part III and for any other purpose.
(2) The power conferred by clause (1) to issue directions, orders or writs to any Government, authority or person may, in any case where a Government, authority or person resides or is located anywhere out of the territories in relation to which the High Court exercises jurisdiction, be exercised by such High Court to issue to such Government, authority or person directions, orders or writs if the cause of action, wholly or in part, arises for the exercise of such power notwithstanding that the seat of such Government or authority or the residence of such person is not within those territories.`),
      },
      {
        n: '227',
        title: 'Power of superintendence over all courts by the High Court',
        body: FULL(`(1) Every High Court shall have superintendence over all courts and tribunals throughout the territories in relation to which it exercises jurisdiction.
(2) Without prejudice to the generality of the foregoing provision, the High Court may —
  (a) call for returns from such courts;
  (b) make and issue general rules and prescribe forms for regulating the practice and proceedings of such courts; and
  (c) prescribe forms in which books, entries and accounts shall be kept by the officers of any such courts.`),
      },
      { n: '228', title: 'Transfer of certain cases to High Court', body: null },
      { n: '228A', title: '[Repealed]', body: null },
      { n: '229', title: 'Officers and servants and the expenses of High Courts', body: null },
      { n: '230', title: 'Extension of jurisdiction of, and transfer of, High Courts to Union territories', body: null },
      { n: '231', title: 'Establishment of a common High Court for two or more States', body: null },
      { n: '232', title: '[Repealed]', body: null },
      { n: '233', title: 'Appointment of district judges', body: null },
      { n: '233A', title: 'Validation of appointments of, and judgments, etc., delivered by, certain district judges', body: null },
      { n: '234', title: 'Recruitment of persons other than district judges to the judicial service', body: null },
      { n: '235', title: 'Control over subordinate courts', body: null },
      { n: '236', title: 'Interpretation', body: null },
      { n: '237', title: 'Application of the provisions of this Chapter to certain class or classes of magistrates', body: null },
    ],
  },
  {
    number: 'VII',
    title: 'The States in Part B of the First Schedule [Repealed]',
    displayTitle: 'PART VII',
    articles: [{ n: '238', title: '[Repealed by the Constitution (Seventh Amendment) Act, 1956]', body: null }],
  },
  {
    number: 'VIII',
    title: 'The Union Territories',
    displayTitle: 'PART VIII',
    articles: [
      { n: '239', title: 'Administration of Union territories', body: null },
      { n: '239A', title: 'Creation of local Legislatures or Council of Ministers or both for certain Union territories', body: null },
      { n: '239AA', title: 'Special provisions with respect to Delhi', body: null },
      { n: '239AB', title: 'Provision in case of failure of constitutional machinery', body: null },
      { n: '239B', title: 'Power of the administrator to promulgate Ordinances during recess of the Legislature', body: null },
      { n: '240', title: 'Power of President to make regulations for certain Union territories', body: null },
      { n: '241', title: 'High Courts for Union territories', body: null },
      { n: '242', title: '[Repealed]', body: null },
    ],
  },
  {
    number: 'IX',
    title: 'The Panchayats',
    displayTitle: 'PART IX',
    articles: [
      { n: '243', title: 'Definitions', body: null },
      { n: '243A', title: 'Gram Sabha', body: null },
      { n: '243B', title: 'Constitution of Panchayats', body: null },
      { n: '243C', title: 'Composition of Panchayats', body: null },
      { n: '243D', title: 'Reservation of seats', body: null },
      { n: '243E', title: 'Duration of Panchayats, etc.', body: null },
      { n: '243F', title: 'Disqualifications for membership', body: null },
      { n: '243G', title: 'Powers, authority and responsibilities of Panchayats', body: null },
      { n: '243H', title: 'Powers to impose taxes by, and Funds of, the Panchayats', body: null },
      { n: '243I', title: 'Constitution of Finance Commission to review financial position', body: null },
      { n: '243J', title: 'Audit of accounts of Panchayats', body: null },
      { n: '243K', title: 'Elections to the Panchayats', body: null },
      { n: '243L', title: 'Application to Union territories', body: null },
      { n: '243M', title: 'Part not to apply to certain areas', body: null },
      { n: '243N', title: 'Continuance of existing laws and Panchayats', body: null },
      { n: '243-O', title: 'Bar to interference by courts in electoral matters', body: null },
    ],
  },
  {
    number: 'IXA',
    title: 'The Municipalities',
    displayTitle: 'PART IXA',
    articles: [
      { n: '243P', title: 'Definitions', body: null },
      { n: '243Q', title: 'Constitution of Municipalities', body: null },
      { n: '243R', title: 'Composition of Municipalities', body: null },
      { n: '243S', title: 'Constitution and composition of Wards Committees, etc.', body: null },
      { n: '243T', title: 'Reservation of seats', body: null },
      { n: '243U', title: 'Duration of Municipalities, etc.', body: null },
      { n: '243V', title: 'Disqualifications for membership', body: null },
      { n: '243W', title: 'Powers, authority and responsibilities of Municipalities, etc.', body: null },
      { n: '243X', title: 'Power to impose taxes by, and Funds of, the Municipalities', body: null },
      { n: '243Y', title: 'Finance Commission', body: null },
      { n: '243Z', title: 'Audit of accounts of Municipalities', body: null },
      { n: '243ZA', title: 'Elections to the Municipalities', body: null },
      { n: '243ZB', title: 'Application to Union territories', body: null },
      { n: '243ZC', title: 'Part not to apply to certain areas', body: null },
      { n: '243ZD', title: 'Committee for district planning', body: null },
      { n: '243ZE', title: 'Committee for Metropolitan planning', body: null },
      { n: '243ZF', title: 'Continuance of existing laws and Municipalities', body: null },
      { n: '243ZG', title: 'Bar to interference by courts in electoral matters', body: null },
    ],
  },
  {
    number: 'IXB',
    title: 'The Co-operative Societies',
    displayTitle: 'PART IXB',
    articles: [
      { n: '243ZH', title: 'Definitions', body: null },
      { n: '243ZI', title: 'Incorporation of co-operative societies', body: null },
      { n: '243ZJ', title: 'Number and term of members of the board and its office bearers', body: null },
      { n: '243ZK', title: 'Election of members of board', body: null },
      { n: '243ZL', title: 'Supersession and suspension of the board and interim management', body: null },
      { n: '243ZM', title: 'Audit of accounts of co-operative societies', body: null },
      { n: '243ZN', title: 'Convening of general body meetings', body: null },
      { n: '243ZO', title: 'Right of a member to get information', body: null },
      { n: '243ZP', title: 'Returns', body: null },
      { n: '243ZQ', title: 'Offences and penalties', body: null },
      { n: '243ZR', title: 'Application to multi-State co-operative societies', body: null },
      { n: '243ZS', title: 'Application to Union territories', body: null },
      { n: '243ZT', title: 'Continuance of existing laws', body: null },
    ],
  },
  {
    number: 'X',
    title: 'The Scheduled and Tribal Areas',
    displayTitle: 'PART X',
    articles: [
      { n: '244', title: 'Administration of Scheduled Areas and Tribal Areas', body: null },
      { n: '244A', title: 'Formation of an autonomous State comprising certain tribal areas in Assam and creation of local Legislature or Council of Ministers or both therefor', body: null },
    ],
  },
  {
    number: 'XI',
    title: 'Relations between the Union and the States',
    displayTitle: 'PART XI',
    articles: [
      {
        n: '245',
        title: 'Extent of laws made by Parliament and by the Legislatures of States',
        body: FULL(`(1) Subject to the provisions of this Constitution, Parliament may make laws for the whole or any part of the territory of India, and the Legislature of a State may make laws for the whole or any part of the State.
(2) No law made by Parliament shall be deemed to be invalid on the ground that it would have extra-territorial operation.`),
      },
      {
        n: '246',
        title: 'Subject-matter of laws made by Parliament and by the Legislatures of States',
        body: FULL(`(1) Notwithstanding anything in clauses (2) and (3), Parliament has exclusive power to make laws with respect to any of the matters enumerated in List I in the Seventh Schedule (in this Constitution, referred to as the "Union List").
(2) Notwithstanding anything in clause (3), Parliament, and, subject to clause (1), the Legislature of any State also, have power to make laws with respect to any of the matters enumerated in List III in the Seventh Schedule (in this Constitution, referred to as the "Concurrent List").
(3) Subject to clauses (1) and (2), the Legislature of any State has exclusive power to make laws for such State or any part thereof with respect to any of the matters enumerated in List II in the Seventh Schedule (in this Constitution, referred to as the "State List").
(4) Parliament has power to make laws with respect to any matter for any part of the territory of India not included in a State notwithstanding that such matter is a matter enumerated in the State List.`),
      },
      { n: '247', title: 'Power of Parliament to provide for the establishment of certain additional courts', body: null },
      { n: '248', title: 'Residuary powers of legislation', body: null },
      { n: '249', title: 'Power of Parliament to legislate with respect to a matter in the State List in the national interest', body: null },
      { n: '250', title: 'Power of Parliament to legislate with respect to any matter in the State List if a Proclamation of Emergency is in operation', body: null },
      { n: '251', title: 'Inconsistency between laws made by Parliament under articles 249 and 250 and laws made by the Legislatures of States', body: null },
      { n: '252', title: 'Power of Parliament to legislate for two or more States by consent and adoption of such legislation by any other State', body: null },
      { n: '253', title: 'Legislation for giving effect to international agreements', body: null },
      {
        n: '254',
        title: 'Inconsistency between laws made by Parliament and laws made by the Legislatures of States',
        body: FULL(`(1) If any provision of a law made by the Legislature of a State is repugnant to any provision of a law made by Parliament which Parliament is competent to enact, or to any provision of an existing law with respect to one of the matters enumerated in the Concurrent List, then, subject to the provisions of clause (2), the law made by Parliament, whether passed before or after the law made by the Legislature of such State, or, as the case may be, the prior law, shall prevail and the law made by the Legislature of the State shall, to the extent of the repugnancy, be void.
(2) Where a law made by the Legislature of a State with respect to one of the matters enumerated in the Concurrent List contains any provision repugnant to the earlier law made by Parliament or an existing law with respect to that matter, then, the law so made by the Legislature of such State shall, if it has been reserved for the consideration of the President and has received his assent, prevail in that State: Provided that nothing in this clause shall prevent Parliament from enacting at any time any law with respect to the same matter including a law adding to, amending, varying or repealing the law so made by the State Legislature.`),
      },
      { n: '255', title: 'Requirements as to recommendations and previous sanctions to be regarded as matters of procedure only', body: null },
      { n: '256', title: 'Obligation of States and the Union', body: null },
      { n: '257', title: 'Control of the Union over States in certain cases', body: null },
      { n: '257A', title: '[Repealed]', body: null },
      { n: '258', title: 'Power of the Union to confer powers, etc., on States in certain cases', body: null },
      { n: '258A', title: 'Power of the States to entrust functions to the Union', body: null },
      { n: '259', title: '[Repealed]', body: null },
      { n: '260', title: 'Jurisdiction of the Union in relation to territories outside India', body: null },
      { n: '261', title: 'Public acts, records and judicial proceedings', body: null },
      { n: '262', title: 'Adjudication of disputes relating to waters of inter-State rivers or river valleys', body: null },
      { n: '263', title: 'Provisions with respect to an inter State Council', body: null },
    ],
  },
  {
    number: 'XII',
    title: 'Finance, Property, Contracts and Suits',
    displayTitle: 'PART XII',
    articles: [
      { n: '264', title: 'Interpretation', body: null },
      { n: '265', title: 'Taxes not to be imposed save by authority of law', body: FULL(`No tax shall be levied or collected except by authority of law.`) },
      { n: '266', title: 'Consolidated Funds and public accounts of India and of the States', body: null },
      { n: '267', title: 'Contingency Fund', body: null },
      { n: '268', title: 'Duties levied by the Union but collected and appropriated by the States', body: null },
      { n: '268A', title: 'Service tax levied by Union and collected and appropriated by the Union and the States [Repealed]', body: null },
      { n: '269', title: 'Taxes levied and collected by the Union but assigned to the States', body: null },
      { n: '269A', title: 'Levy and collection of goods and services tax in the course of inter-State trade or commerce', body: null },
      { n: '270', title: 'Taxes levied and distributed between the Union and the States', body: null },
      { n: '271', title: 'Surcharge on certain duties and taxes for purposes of the Union', body: null },
      { n: '272', title: '[Repealed]', body: null },
      { n: '273', title: 'Grants in lieu of export duty on jute and jute products', body: null },
      { n: '274', title: 'Prior recommendation of President required to Bills affecting taxation in which States are interested', body: null },
      { n: '275', title: 'Grants from the Union to certain States', body: null },
      { n: '276', title: 'Taxes on professions, trades, callings and employments', body: null },
      { n: '277', title: 'Savings', body: null },
      { n: '278', title: '[Repealed]', body: null },
      { n: '279', title: 'Calculation of "net proceeds", etc.', body: null },
      { n: '279A', title: 'Goods and Services Tax Council', body: null },
      { n: '280', title: 'Finance Commission', body: null },
      { n: '281', title: 'Recommendations of the Finance Commission', body: null },
      { n: '282', title: 'Miscellaneous financial provisions', body: null },
      { n: '283', title: 'Custody, etc., of Consolidated Funds, Contingency Funds and moneys credited to the public accounts', body: null },
      { n: '284', title: 'Custody of suitors\' deposits and other moneys received by public servants and courts', body: null },
      { n: '285', title: 'Exemption of property of the Union from State taxation', body: null },
      { n: '286', title: 'Restrictions as to imposition of tax on the sale or purchase of goods', body: null },
      { n: '287', title: 'Exemption from taxes on electricity', body: null },
      { n: '288', title: 'Exemption from taxation by States in respect of water or electricity in certain cases', body: null },
      { n: '289', title: 'Exemption of property and income of a State from Union taxation', body: null },
      { n: '290', title: 'Adjustment in respect of certain expenses and pensions', body: null },
      { n: '290A', title: 'Annual payment to certain Devaswom Funds', body: null },
      { n: '291', title: '[Repealed]', body: null },
      { n: '292', title: 'Borrowing by the Government of India', body: null },
      { n: '293', title: 'Borrowing by States', body: null },
      { n: '294', title: 'Succession to property, assets, rights, liabilities and obligations in certain cases', body: null },
      { n: '295', title: 'Succession to property, assets, rights, liabilities and obligations in other cases', body: null },
      { n: '296', title: 'Property accruing by escheat or lapse or as bona vacantia', body: null },
      { n: '297', title: 'Things of value within territorial waters or continental shelf and resources of the exclusive economic zone to vest in the Union', body: null },
      { n: '298', title: 'Power to carry on trade, etc.', body: null },
      { n: '299', title: 'Contracts', body: null },
      { n: '300', title: 'Suits and proceedings', body: null },
      {
        n: '300A',
        title: 'Right to property',
        body: FULL(`No person shall be deprived of his property save by authority of law.`),
      },
    ],
  },
  {
    number: 'XIII',
    title: 'Trade, Commerce and Intercourse within the Territory of India',
    displayTitle: 'PART XIII',
    articles: [
      { n: '301', title: 'Freedom of trade, commerce and intercourse', body: FULL(`Subject to the other provisions of this Part, trade, commerce and intercourse throughout the territory of India shall be free.`) },
      { n: '302', title: 'Power of Parliament to impose restrictions on trade, commerce and intercourse', body: null },
      { n: '303', title: 'Restrictions on the legislative powers of the Union and of the States with regard to trade and commerce', body: null },
      { n: '304', title: 'Restrictions on trade, commerce and intercourse among States', body: null },
      { n: '305', title: 'Saving of existing laws and laws providing for State monopolies', body: null },
      { n: '306', title: '[Repealed]', body: null },
      { n: '307', title: 'Appointment of authority for carrying out the purposes of articles 301 to 304', body: null },
    ],
  },
  {
    number: 'XIV',
    title: 'Services under the Union and the States',
    displayTitle: 'PART XIV',
    articles: [
      { n: '308', title: 'Interpretation', body: null },
      { n: '309', title: 'Recruitment and conditions of service of persons serving the Union or a State', body: null },
      { n: '310', title: 'Tenure of office of persons serving the Union or a State', body: null },
      {
        n: '311',
        title: 'Dismissal, removal or reduction in rank of persons employed in civil capacities under the Union or a State',
        body: FULL(`(1) No person who is a member of a civil service of the Union or an all-India service or a civil service of a State or holds a civil post under the Union or a State shall be dismissed or removed by an authority subordinate to that by which he was appointed.
(2) No such person as aforesaid shall be dismissed or removed or reduced in rank except after an inquiry in which he has been informed of the charges against him and given a reasonable opportunity of being heard in respect of those charges: Provided that where it is proposed after such inquiry to impose upon him any such penalty, such penalty may be imposed on the basis of the evidence adduced during such inquiry and it shall not be necessary to give such person any opportunity of making representation on the penalty proposed: Provided further that this clause shall not apply —
  (a) where a person is dismissed or removed or reduced in rank on the ground of conduct which has led to his conviction on a criminal charge; or
  (b) where the authority empowered to dismiss or remove or reduce in rank a person is satisfied that for some reason, to be recorded by that authority in writing, it is not reasonably practicable to hold such inquiry; or
  (c) where the President or the Governor, as the case may be, is satisfied that in the interest of the security of the State it is not expedient to hold such inquiry.
(3) If, in respect of any such person as aforesaid, a question arises whether it is reasonably practicable to hold such inquiry as is referred to in clause (2), the decision thereon of the authority empowered to dismiss or remove or reduce in rank such person shall be final.`),
      },
      { n: '312', title: 'All-India services', body: null },
      { n: '312A', title: 'Power of Parliament to vary or revoke conditions of service of officers of certain services', body: null },
      { n: '313', title: 'Transitional provisions', body: null },
      { n: '314', title: 'Provision for protection of existing officers of certain services [Repealed]', body: null },
    ],
  },
  {
    number: 'XIVA',
    title: 'Tribunals',
    displayTitle: 'PART XIVA',
    articles: [
      { n: '323A', title: 'Administrative tribunals', body: null },
      { n: '323B', title: 'Tribunals for other matters', body: null },
    ],
  },
  {
    number: 'XV',
    title: 'Elections',
    displayTitle: 'PART XV',
    articles: [
      {
        n: '324',
        title: 'Superintendence, direction and control of elections to be vested in an Election Commission',
        body: FULL(`(1) The superintendence, direction and control of the preparation of the electoral rolls for, and the conduct of, all elections to Parliament and to the Legislature of every State and of elections to the offices of President and Vice-President held under this Constitution shall be vested in a Commission (referred to in this Constitution as the Election Commission).
(2) The Election Commission shall consist of the Chief Election Commissioner and such number of other Election Commissioners, if any, as the President may from time to time fix and the appointment of the Chief Election Commissioner and other Election Commissioners shall, subject to the provisions of any law made in that behalf by Parliament, be made by the President.
(3) When any other Election Commissioner is so appointed the Chief Election Commissioner shall act as the Chairman of the Election Commission.
(4) Before each general election to the House of the People and to the Legislative Assembly of each State, and before the first general election and thereafter before each biennial election to the Legislative Council of each State having such Council, the President may also appoint after consultation with the Election Commission such Regional Commissioners as he may consider necessary to assist the Election Commission in the performance of the functions conferred on the Commission by clause (1).
(5) Subject to the provisions of any law made by Parliament, the conditions of service and tenure of office of the Election Commissioners and the Regional Commissioners shall be such as the President may by rule determine: Provided that the Chief Election Commissioner shall not be removed from his office except in like manner and on the like grounds as a Judge of the Supreme Court and the conditions of service of the Chief Election Commissioner shall not be varied to his disadvantage after his appointment.
(6) The President, or the Governor of a State, shall, when so requested by the Election Commission, make available to the Election Commission or to a Regional Commissioner such staff as may be necessary for the discharge of the functions conferred on the Commission by clause (1).`),
      },
      { n: '325', title: 'No person to be ineligible for inclusion in, or to claim to be included in a special, electoral roll on grounds of religion, race, caste or sex', body: null },
      {
        n: '326',
        title: 'Elections to the House of the People and to the Legislative Assemblies of States to be on the basis of adult suffrage',
        body: FULL(`The elections to the House of the People and to the Legislative Assembly of every State shall be on the basis of adult suffrage; that is to say, every person who is a citizen of India and who is not less than eighteen years of age on such date as may be fixed in that behalf by or under any law made by the appropriate Legislature and is not otherwise disqualified under this Constitution or any law made by the appropriate Legislature on the ground of non-residence, unsoundness of mind, crime or corrupt or illegal practice, shall be entitled to be registered as a voter at any such election.`),
      },
      { n: '327', title: 'Power of Parliament to make provision with respect to elections to Legislatures', body: null },
      { n: '328', title: 'Power of Legislature of a State to make provision with respect to elections to such Legislature', body: null },
      { n: '329', title: 'Bar to interference by courts in electoral matters', body: null },
      { n: '329A', title: '[Repealed]', body: null },
    ],
  },
  {
    number: 'XVI',
    title: 'Special Provisions Relating to Certain Classes',
    displayTitle: 'PART XVI',
    articles: [
      { n: '330', title: 'Reservation of seats for Scheduled Castes and Scheduled Tribes in the House of the People', body: null },
      { n: '331', title: 'Representation of the Anglo-Indian community in the House of the People', body: null },
      { n: '332', title: 'Reservation of seats for Scheduled Castes and Scheduled Tribes in the Legislative Assemblies of the States', body: null },
      { n: '333', title: 'Representation of the Anglo-Indian community in the Legislative Assemblies of the States', body: null },
      { n: '334', title: 'Reservation of seats and special representation to cease after seventy years', body: null },
      { n: '335', title: 'Claims of Scheduled Castes and Scheduled Tribes to services and posts', body: null },
      { n: '336', title: 'Special provision for Anglo-Indian community in certain services', body: null },
      { n: '337', title: 'Special provision with respect to educational grants for the benefit of the Anglo-Indian community', body: null },
      { n: '338', title: 'National Commission for Scheduled Castes', body: null },
      { n: '338A', title: 'National Commission for Scheduled Tribes', body: null },
      { n: '338B', title: 'National Commission for Backward Classes', body: null },
      { n: '339', title: 'Control of the Union over the Administration of Scheduled Areas and the welfare of Scheduled Tribes', body: null },
      { n: '340', title: 'Appointment of a Commission to investigate the conditions of backward classes', body: null },
      { n: '341', title: 'Scheduled Castes', body: null },
      { n: '342', title: 'Scheduled Tribes', body: null },
    ],
  },
  {
    number: 'XVII',
    title: 'Official Language',
    displayTitle: 'PART XVII',
    articles: [
      { n: '343', title: 'Official language of the Union', body: FULL(`(1) The official language of the Union shall be Hindi in Devanagari script. The form of numerals to be used for the official purposes of the Union shall be the international form of Indian numerals.
(2) Notwithstanding anything in clause (1), for a period of fifteen years from the commencement of this Constitution, the English language shall continue to be used for all the official purposes of the Union for which it was being used immediately before such commencement: Provided that the President may, during the said period, by order authorise the use of the Hindi language in addition to the English language and of the Devanagari form of numerals in addition to the international form of Indian numerals for any of the official purposes of the Union.
(3) Notwithstanding anything in this article, Parliament may by law provide for the use, after the said period of fifteen years, of — (a) the English language, or (b) the Devanagari form of numerals, for such purposes as may be prescribed by law.`) },
      { n: '344', title: 'Commission and Committee of Parliament on official language', body: null },
      { n: '345', title: 'Official language or languages of a State', body: null },
      { n: '346', title: 'Official language for communication between one State and another or between a State and the Union', body: null },
      { n: '347', title: 'Special provision relating to language spoken by a section of the population of a State', body: null },
      { n: '348', title: 'Language to be used in the Supreme Court and in the High Courts and for Acts, Bills, etc.', body: null },
      { n: '349', title: 'Special procedure for enactment of certain laws relating to language', body: null },
      { n: '350', title: 'Language to be used in representations for redress of grievances', body: null },
      { n: '350A', title: 'Facilities for instruction in mother-tongue at primary stage', body: null },
      { n: '350B', title: 'Special Officer for linguistic minorities', body: null },
      { n: '351', title: 'Directive for development of the Hindi language', body: null },
    ],
  },
  {
    number: 'XVIII',
    title: 'Emergency Provisions',
    displayTitle: 'PART XVIII',
    articles: [
      {
        n: '352',
        title: 'Proclamation of Emergency',
        body: FULL(`(1) If the President is satisfied that a grave emergency exists whereby the security of India or of any part of the territory thereof is threatened, whether by war or external aggression or armed rebellion, he may, by Proclamation, make a declaration to that effect in respect of the whole of India or of such part of the territory thereof as may be specified in the Proclamation.
(2) A Proclamation issued under clause (1) may be varied or revoked by a subsequent Proclamation.
(3) The President shall not issue a Proclamation under clause (1) or a Proclamation varying such Proclamation unless the decision of the Union Cabinet (that is to say, the Council consisting of the Prime Minister and other Ministers of Cabinet rank appointed under article 75) that such a Proclamation may be issued has been communicated to him in writing.
(4) Every Proclamation issued under this article shall be laid before each House of Parliament and shall, except where it is a Proclamation revoking a previous Proclamation, cease to operate at the expiration of one month unless before the expiration of that period it has been approved by resolutions of both Houses of Parliament: Provided that if any resolution for the approval of the Proclamation is passed by the House of the People but is rejected by the Council of States, the Proclamation shall cease to operate at the expiration of one month from the date on which the resolution of the House of the People is passed.`),
      },
      { n: '353', title: 'Effect of Proclamation of Emergency', body: null },
      { n: '354', title: 'Application of provisions relating to distribution of revenues while a Proclamation of Emergency is in operation', body: null },
      { n: '355', title: 'Duty of the Union to protect States against external aggression and internal disturbance', body: null },
      {
        n: '356',
        title: 'Provisions in case of failure of constitutional machinery in States',
        body: FULL(`(1) If the President, on receipt of a report from the Governor of a State or otherwise, is satisfied that a situation has arisen in which the government of the State cannot be carried on in accordance with the provisions of this Constitution, the President may by Proclamation —
  (a) assume to himself all or any of the functions of the Government of the State and all or any of the powers vested in or exercisable by the Governor or any body or authority in the State other than the Legislature of the State;
  (b) declare that the powers of the Legislature of the State shall be exercisable by or under the authority of Parliament;
  (c) make such incidental and consequential provisions as appear to the President to be necessary or desirable for giving effect to the objects of the Proclamation, including provisions for suspending in whole or in part the operation of any provisions of this Constitution relating to any body or authority in the State: Provided that nothing in this clause shall authorise the President to assume to himself any of the powers vested in or exercisable by a High Court, or to suspend in whole or in part the operation of any provision of this Constitution relating to High Courts.
(2) Any such Proclamation may be revoked or varied by a subsequent Proclamation.
(3) Every Proclamation under this article shall be laid before each House of Parliament and shall, except where it is a Proclamation revoking a previous Proclamation, cease to operate at the expiration of two months unless before the expiration of that period it has been approved by resolutions of both Houses of Parliament: Provided that if the approval of the Proclamation is given by resolutions of both Houses of Parliament, it shall, unless revoked, cease to operate on the expiration of a period of six months from the date of the passing of the second of those resolutions: Provided further that if and so often as a resolution for the continuance in force of such a Proclamation is passed by both Houses of Parliament, the Proclamation shall, unless revoked, continue in force for a further period of six months from the date of the passing of the second of those resolutions.`),
      },
      { n: '357', title: 'Exercise of legislative powers under Proclamation issued under article 356', body: null },
      { n: '358', title: 'Suspension of provisions of article 19 during emergencies', body: null },
      { n: '359', title: 'Suspension of the enforcement of the rights conferred by Part III during emergencies', body: null },
      { n: '359A', title: '[Repealed]', body: null },
      { n: '360', title: 'Provisions as to financial emergency', body: null },
    ],
  },
  {
    number: 'XIX',
    title: 'Miscellaneous',
    displayTitle: 'PART XIX',
    articles: [
      { n: '361', title: 'Protection of President and Governors and Rajpramukhs', body: null },
      { n: '361A', title: 'Protection of publication of proceedings of Parliament and State Legislatures', body: null },
      { n: '361B', title: 'Disqualification for appointment on remunerative political post', body: null },
      { n: '362', title: '[Repealed]', body: null },
      { n: '363', title: 'Bar to interference by courts in disputes arising out of certain treaties, agreements, etc.', body: null },
      { n: '363A', title: 'Recognition granted to Rulers of Indian States to cease and privy purses to be abolished', body: null },
      { n: '364', title: 'Special provisions as to major ports and aerodromes', body: null },
      { n: '365', title: 'Effect of failure to comply with, or to give effect to, directions given by the Union', body: null },
      { n: '366', title: 'Definitions', body: null },
      { n: '367', title: 'Interpretation', body: null },
    ],
  },
  {
    number: 'XX',
    title: 'Amendment of the Constitution',
    displayTitle: 'PART XX',
    articles: [
      {
        n: '368',
        title: 'Power of Parliament to amend the Constitution and procedure therefor',
        body: FULL(`(1) Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article.
(2) An amendment of this Constitution may be initiated only by the introduction of a Bill for the purpose in either House of Parliament, and when the Bill is passed in each House by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting, it shall be presented to the President who shall give his assent to the Bill and thereupon the Constitution shall stand amended in accordance with the terms of the Bill:
Provided that if such amendment seeks to make any change in —
  (a) article 54, article 55, article 73, article 162 or article 241, or
  (b) Chapter IV of Part V, Chapter V of Part VI, or Chapter I of Part XI, or
  (c) any of the Lists in the Seventh Schedule, or
  (d) the representation of States in Parliament, or
  (e) the provisions of this article,
the amendment shall also require to be ratified by the Legislatures of not less than one-half of the States by resolutions to that effect passed by those Legislatures before the Bill making provision for such amendment is presented to the President for assent.
(3) Nothing in article 13 shall apply to any amendment made under this article.`),
      },
    ],
  },
  {
    number: 'XXI',
    title: 'Temporary, Transitional and Special Provisions',
    displayTitle: 'PART XXI',
    articles: [
      { n: '369', title: 'Temporary power to Parliament to make laws with respect to certain matters in the State List as if they were matters in the Concurrent List', body: null },
      { n: '370', title: 'Temporary provisions with respect to the State of Jammu and Kashmir [Repealed — see note]', body: FULL(`The special status provision for Jammu and Kashmir under article 370 stands abrogated by the Constitution (Application to Jammu and Kashmir) Order, 2019 read with the Constitution (One Hundred and Third Amendment) Act, 2019, pursuant to which the whole of the Constitution applies to the State of Jammu and Kashmir (now the Union territories of Jammu and Kashmir and Ladakh).`) },
      { n: '371', title: 'Special provision with respect to the States of Maharashtra and Gujarat', body: null },
      { n: '371A', title: 'Special provision with respect to the State of Nagaland', body: null },
      { n: '371B', title: 'Special provision with respect to the State of Assam', body: null },
      { n: '371C', title: 'Special provision with respect to the State of Manipur', body: null },
      { n: '371D', title: 'Special provisions with respect to the State of Andhra Pradesh', body: null },
      { n: '371E', title: 'Establishment of Central University in Andhra Pradesh', body: null },
      { n: '371F', title: 'Special provisions with respect to the State of Sikkim', body: null },
      { n: '371G', title: 'Special provision with respect to the State of Mizoram', body: null },
      { n: '371H', title: 'Special provision with respect to the State of Arunachal Pradesh', body: null },
      { n: '371-I', title: 'Special provision with respect to the State of Goa', body: null },
      { n: '371J', title: 'Special provision with respect to the State of Karnataka', body: null },
      { n: '372', title: 'Continuance in force of existing laws and their adaptation', body: null },
      { n: '372A', title: 'Power of the President to adapt laws', body: null },
      { n: '373', title: 'Power of President to make order in respect of persons under preventive detention in certain cases', body: null },
      { n: '374', title: 'Provisions as to Judges of the Federal Court and proceedings pending in the Federal Court or before His Majesty in Council', body: null },
      { n: '375', title: 'Courts, authorities and officers to continue to function subject to the provisions of the Constitution', body: null },
      { n: '376', title: 'Provisions as to Judges of High Courts', body: null },
      { n: '377', title: 'Provisions as to Comptroller and Auditor-General of India', body: null },
      { n: '378', title: 'Provisions as to Public Service Commissions', body: null },
      { n: '378A', title: 'Special provision as to duration of Andhra Pradesh Legislative Assembly', body: null },
      { n: '379', title: '[Repealed]', body: null },
      { n: '380', title: '[Repealed]', body: null },
      { n: '381', title: '[Repealed]', body: null },
      { n: '382', title: '[Repealed]', body: null },
      { n: '383', title: '[Repealed]', body: null },
      { n: '384', title: '[Repealed]', body: null },
      { n: '385', title: '[Repealed]', body: null },
      { n: '386', title: '[Repealed]', body: null },
      { n: '387', title: '[Repealed]', body: null },
      { n: '388', title: '[Repealed]', body: null },
      { n: '389', title: '[Repealed]', body: null },
      { n: '390', title: '[Repealed]', body: null },
      { n: '391', title: '[Repealed]', body: null },
      { n: '392', title: 'Power of the President to remove difficulties', body: null },
    ],
  },
  {
    number: 'XXII',
    title: 'Short Title, Commencement, Authoritative Text in Hindi and Repeals',
    displayTitle: 'PART XXII',
    articles: [
      { n: '393', title: 'Short title', body: FULL(`This Constitution may be called the Constitution of India.`) },
      {
        n: '394',
        title: 'Commencement',
        body: FULL(`This article and articles 5, 6, 7, 8, 9, 60, 324, 366, 367, 379, 380, 388, 391, 392 and 393 shall come into force at once, and the remaining provisions of this Constitution shall come into force on the twenty-sixth day of January, 1950, which day is referred to in this Constitution as the commencement of this Constitution.`),
      },
      {
        n: '395',
        title: 'Repeals',
        body: FULL(`The Indian Independence Act, 1947, and the Government of India Act, 1935, together with all enactments amending or supplementing the latter Act, but not including the Abolition of Privy Council Jurisdiction Act, 1949, are hereby repealed.`),
      },
    ],
  },
];

export const SCHEDULES: { n: string; title: string; body: string | null }[] = [
  { n: '1', title: 'First Schedule', body: `Articles 1 and 4 — The States and the Union territories of India with their territorial extent.` },
  { n: '2', title: 'Second Schedule', body: `Articles 59(3), 65(3), 75(6), 97, 125, 148(3), 158(3), 164(5), 186 and 221 — Provisions as to the emoluments, allowances and privileges of the President, Governors, Judges of the Supreme Court and High Courts, and the Comptroller and Auditor-General of India.` },
  { n: '3', title: 'Third Schedule', body: `Forms of Oaths or Affirmations — Articles 75(4), 99, 124(6), 148(2), 164(3), 188 and 219.` },
  { n: '4', title: 'Fourth Schedule', body: `Articles 4(1) and 80(2) — Allocation of seats in the Council of States.` },
  { n: '5', title: 'Fifth Schedule', body: `Article 244(1) — Provisions as to the Administration and Control of Scheduled Areas and Scheduled Tribes.` },
  { n: '6', title: 'Sixth Schedule', body: `Articles 244(2) and 275(1) — Provisions as to the Administration of Tribal Areas in the States of Assam, Meghalaya, Tripura and Mizoram.` },
  { n: '7', title: 'Seventh Schedule', body: `Article 246 — Lists I (Union List), II (State List) and III (Concurrent List) of subjects on which Parliament and State Legislatures may legislate.` },
  { n: '8', title: 'Eighth Schedule', body: `Articles 344(1) and 351 — The official languages of the Union (22 languages).` },
  { n: '9', title: 'Ninth Schedule', body: `Article 31B — Validation of certain Acts and Regulations.` },
  { n: '10', title: 'Tenth Schedule', body: `Articles 102(2) and 191(2) — Provisions as to disqualification on ground of defection.` },
  { n: '11', title: 'Eleventh Schedule', body: `Article 243G — Powers, authority and responsibilities of Panchayats.` },
  { n: '12', title: 'Twelfth Schedule', body: `Article 243W — Powers, authority and responsibilities of Municipalities.` },
];

const PENDING_BODY = `[Content pending verification and seeding from the official India Code repository. View structure is in place; the full provision text will be added by the content ingestion pipeline (PDR section 3D/3E).]`;

export function buildPartRows(): PartRow[] {
  return CONSTITUTION_PARTS.map((p, i) => ({
    id: i + 1,
    number: p.number,
    title: p.title,
    display_title: p.displayTitle,
    sort_order: i + 1,
  }));
}

export function buildArticleRows(): ArticleRow[] {
  const rows: ArticleRow[] = [];
  CONSTITUTION_PARTS.forEach((p, pi) => {
    p.articles.forEach((a, ai) => {
      rows.push({
        id: rows.length + 1,
        part_id: pi + 1,
        number: a.n,
        title: a.title ?? null,
        body: a.body ?? PENDING_BODY,
        summary: a.summary ?? null,
        sort_order: ai + 1,
      });
    });
  });
  return rows;
}

export function buildScheduleRows(): { number: string; title: string; body: string | null }[] {
  return SCHEDULES.map((s) => ({ number: s.n, title: s.title, body: s.body }));
}