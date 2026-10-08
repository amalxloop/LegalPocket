// GENERATED from the PRD 3A limitation research dataset (2026-10-06).
// 55 entries (40 suits + 15 appeals/applications) from the Limitation Act, 1963
// schedule as researched, 18 time-exclusion sections (ss.3-24), 7 scope notes.
// period_value/period_unit are parsed from the verbatim period text at build time.

export interface LimitationSeedEntry {
  slug: string;
  label: string;
  article: string;
  kind: 'suit' | 'appeal_application';
  period: string;
  period_value: number;
  period_unit: 'day' | 'month' | 'year';
  court_type: string;
  division: string | null;
  accrual: string;
  exceptions: string[];
  related_articles: string[];
  source_url: string | null;
  source_secondary: string | null;
  as_of: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface LimitationSeedRef {
  kind: 'section' | 'note';
  ref_key: string;
  title: string;
  body: string;
  exceptions: string[] | null;
  source_url: string | null;
  as_of: string;
  confidence: 'high' | 'medium' | 'low';
}

export const LIMITATION_SEED: { entries: LimitationSeedEntry[]; refs: LimitationSeedRef[] } = {
  entries: [
 {
  "slug": "art-1-mutual-open-current-account",
  "label": "Balance due on a mutual, open and current account where there have been reciprocal demands between the parties",
  "article": "Article 1",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part I — Suits relating to Accounts)",
  "accrual": "Close of the year in which the last item admitted or proved is entered in the account; such year to be computed as in the account",
  "exceptions": [
   "Requires mutuality — accounts without reciprocal demands are not covered and fall to the residuary Article 113"
  ],
  "related_articles": [
   "Article 113",
   "Article 26"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-14-goods-sold-and-delivered",
  "label": "Price of goods sold and delivered where no fixed period of credit is agreed upon",
  "article": "Article 14",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "The date of the delivery of the goods",
  "exceptions": [
   "Where a fixed period of credit is agreed, see Article 15 (from expiry of the credit period)",
   "Where payment was to be by a bill that was never given, see Article 16"
  ],
  "related_articles": [
   "Article 15",
   "Article 16",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-19-money-lent",
  "label": "Money payable for money lent",
  "article": "Article 19",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the loan is made",
  "exceptions": [
   "Where the lender gave a cheque for the money, time runs when the cheque is paid (Article 20)",
   "Money lent on demand is covered by Articles 21-22 (demand-based accrual)"
  ],
  "related_articles": [
   "Article 20",
   "Article 21",
   "Article 22"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-24-money-received-for-plaintiff",
  "label": "Money payable by the defendant to the plaintiff for money received by the defendant for the plaintiff's use",
  "article": "Article 24",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the money is received",
  "exceptions": [
   "Covers money-had-and-received claims; money paid out under a mistake of fact has no specific article and is taken residuarily (Article 113) — verify per High Court practice"
  ],
  "related_articles": [
   "Article 113",
   "Article 47"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-26-accounts-stated",
  "label": "Money payable on accounts stated in writing signed by the defendant or his authorised agent",
  "article": "Article 26",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the accounts are stated in writing signed by the defendant or his agent duly authorised — unless the debt is by a simultaneous written agreement made payable at a future time, and then when that time arrives",
  "exceptions": [
   "A writing signed by the party to be charged is essential; an oral statement of account does not attract this article"
  ],
  "related_articles": [
   "Article 1",
   "Article 19",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-31-bill-or-note-payable-fixed-time",
  "label": "Suit on a bill of exchange or promissory note payable at a fixed time after date",
  "article": "Article 31",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the bill or note falls due",
  "exceptions": [
   "Bills payable on demand: Article 35 (from date of the bill or note)",
   "Instalment instruments: Articles 36-37",
   "Holder suits and dishonoured instruments may attract other specific articles (39-41)"
  ],
  "related_articles": [
   "Article 35",
   "Article 36",
   "Article 37"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-36-instalment-note-or-bond",
  "label": "Suit on a promissory note or bond payable by instalments",
  "article": "Article 36",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "The expiration of the first term of payment as to the part then payable, and for the other parts the expiration of the respective terms of payment",
  "exceptions": [
   "Where default makes the whole debt due (acceleration clause), Article 37 applies instead"
  ],
  "related_articles": [
   "Article 37"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-37-instalment-acceleration-clause",
  "label": "Suit on a promissory note or bond payable by instalments which provides that on default the whole becomes due",
  "article": "Article 37",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the default is made, unless where the payee or obligee waives the benefit of the provision, and then when fresh default is made in respect of which there is no such waiver",
  "exceptions": [
   "Waiver of the acceleration clause shifts accrual to the next fresh default not covered by the waiver"
  ],
  "related_articles": [
   "Article 36"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-42-surety-against-principal-debtor",
  "label": "Suit by a surety against the principal debtor",
  "article": "Article 42",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the surety pays the creditor",
  "exceptions": [
   "Suit against a co-surety is separately covered by Article 43 (from when the surety pays in excess of his own share)"
  ],
  "related_articles": [
   "Article 43",
   "Article 74"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-44-insurance-policy",
  "label": "Suit on a policy of insurance (death-proof and loss-proof policies)",
  "article": "Article 44",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "Death policies: the date of the death of the deceased, or where the claim is denied partly or wholly, the date of such denial; loss policies: the date of the occurrence causing the loss, or where the claim is denied, the date of such denial",
  "exceptions": [
   "Third-party motor-accident claims are governed by the Motor Vehicles Act, 1988, not Article 44",
   "Policy wording, insurance statutes and s.29(2) overrides should be checked"
  ],
  "related_articles": [
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-52-arrears-of-rent",
  "label": "Suit for arrears of rent",
  "article": "Article 52",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the arrears become due",
  "exceptions": [
   "State rent-control, tenancy and revenue enactments frequently prescribe shorter periods for recovery of rent and override the Schedule under s.29(2)"
  ],
  "related_articles": [
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-54-specific-performance",
  "label": "Suit for specific performance of a contract",
  "article": "Article 54",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "The date fixed for the performance, or if no such date is fixed, when the plaintiff has noticed that performance is refused",
  "exceptions": [
   "Where a date was fixed, time runs from that date (whether or not performance was tendered)",
   "Rescission/cancellation claims: Article 59; general breach: Article 55"
  ],
  "related_articles": [
   "Article 55",
   "Article 59",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-55-breach-of-contract",
  "label": "Compensation for the breach of any contract, express or implied, not specially provided for in the Schedule",
  "article": "Article 55",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part II — Suits relating to Contracts)",
  "accrual": "When the contract is broken, or where there are successive breaches when the breach in respect of which the suit is instituted occurs, or where the breach is continuing when it ceases",
  "exceptions": [
   "Specific contract actions have their own articles (Articles 6-54) — this is the residuary contract article",
   "Specific performance: Article 54; rescission: Article 59; a wholly unprovided subject matter: Article 113"
  ],
  "related_articles": [
   "Article 54",
   "Article 59",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-57-adoption-invalid",
  "label": "Declaration that an alleged adoption is invalid, or never in fact took place",
  "article": "Article 57",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part III — Suits relating to Declarations)",
  "accrual": "When the alleged adoption becomes known to the plaintiff",
  "exceptions": [
   "A declaration that an adoption is valid falls under Article 58 (any other declaration)"
  ],
  "related_articles": [
   "Article 58",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-58-other-declaration",
  "label": "Suit to obtain any other declaration (not specially provided for in the Schedule)",
  "article": "Article 58",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part III — Suits relating to Declarations)",
  "accrual": "When the right to sue first accrues",
  "exceptions": [
   "Forgery of an issued or registered instrument: Article 56",
   "Invalid adoption: Article 57",
   "Cancellation of an instrument/decree or rescission of contract: Article 59"
  ],
  "related_articles": [
   "Article 56",
   "Article 57",
   "Article 59"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-59-cancel-set-aside-or-rescind",
  "label": "Suit to cancel or set aside an instrument or decree, or for rescission of a contract",
  "article": "Article 59",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IV — Suits relating to Decrees and Instruments)",
  "accrual": "When the facts entitling the plaintiff to have the instrument or decree cancelled or set aside, or the contract rescinded, first become known to him",
  "exceptions": [
   "Rectification of an instrument has no dedicated article — see the rectification entry (low confidence)",
   "Section 17 (fraud or mistake) may further defer the running of time"
  ],
  "related_articles": [
   "Article 58",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-61-mortgagor-redeem",
  "label": "Suit by a mortgagor to redeem or recover possession of mortgaged property",
  "article": "Article 61(a)",
  "kind": "suit",
  "period": "Thirty years",
  "period_value": 30,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part V — Suits relating to Immovable Property)",
  "accrual": "When the right to redeem or to recover possession accrues",
  "exceptions": [
   "Article 61(b): possession against a mortgagee's transfer to a third party for value — Twelve years from when the transfer becomes known to the plaintiff",
   "Article 61(c): surplus collections after the mortgagee is satisfied — Three years from when the mortgagor re-enters",
   "Subject to the Transfer of Property Act and any state amendments on mortgagee rights"
  ],
  "related_articles": [
   "Article 62",
   "Article 63"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-62-secured-money-mortgage",
  "label": "Suit to enforce payment of money secured by a mortgage, or otherwise charged upon immovable property",
  "article": "Article 62",
  "kind": "suit",
  "period": "Twelve years",
  "period_value": 12,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part V — Suits relating to Immovable Property)",
  "accrual": "When the money sued for becomes due",
  "exceptions": [
   "Special shorter periods under state money-lending, tenancy or revenue laws may override via s.29(2)"
  ],
  "related_articles": [
   "Article 61",
   "Article 63"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-63-mortgagee-foreclosure-or-possession",
  "label": "Suit by a mortgagee for foreclosure, or for possession of mortgaged property",
  "article": "Article 63",
  "kind": "suit",
  "period": "Thirty years for foreclosure; Twelve years for possession",
  "period_value": 30,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part V — Suits relating to Immovable Property)",
  "accrual": "Foreclosure: when the money secured by the mortgagee becomes due; possession: when the mortgagee becomes entitled to possession",
  "exceptions": [
   "Mortgagor-side remedies are governed by Article 61"
  ],
  "related_articles": [
   "Article 61",
   "Article 62"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-64-possession-previous-possession",
  "label": "Possession of immovable property based on previous possession (not on title) by a plaintiff dispossessed while in possession",
  "article": "Article 64",
  "kind": "suit",
  "period": "Twelve years",
  "period_value": 12,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part V — Suits relating to Immovable Property)",
  "accrual": "The date of dispossession",
  "exceptions": [
   "Available only where the claim rests on prior possession; where title exists, Article 65 applies"
  ],
  "related_articles": [
   "Article 65",
   "Article 67"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-65-possession-on-title",
  "label": "Possession of immovable property or any interest therein based on title (adverse possession)",
  "article": "Article 65",
  "kind": "suit",
  "period": "Twelve years",
  "period_value": 12,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part V — Suits relating to Immovable Property)",
  "accrual": "When the possession of the defendant becomes adverse to the plaintiff",
  "exceptions": [
   "Explanation (a): for a remainderman, reversioner (other than a landlord) or devisee, possession becomes adverse only when the estate falls into possession",
   "Explanation (b): for a Hindu or Muslim entitled to possession on the death of a Hindu or Muslim female, only when the female dies",
   "Explanation (c): a purchaser at an execution sale where the judgment-debtor was out of possession is deemed the judgment-debtor's representative",
   "Adverse possession cannot be asserted against the Government (Government suits carry 30 years under Article 112)"
  ],
  "related_articles": [
   "Article 64",
   "Article 67",
   "Article 112"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-67-landlord-recover-possession",
  "label": "Suit by a landlord to recover possession from a tenant",
  "article": "Article 67",
  "kind": "suit",
  "period": "Twelve years",
  "period_value": 12,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part V — Suits relating to Immovable Property)",
  "accrual": "When the tenancy is determined",
  "exceptions": [
   "Eviction under rent-control or state tenancy statutes is often subject to shorter statutory periods and special procedure"
  ],
  "related_articles": [
   "Article 65"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-68-specific-movable-property",
  "label": "Suit for specific movable property lost, or acquired by theft, dishonest misappropriation or conversion",
  "article": "Article 68",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VI — Suits relating to Movable Property)",
  "accrual": "When the person having the right to the possession of the property first learns in whose possession it is",
  "exceptions": [
   "Compensation in money instead of recovery of the property: Article 91",
   "Recovery of property deposited or pawned: Articles 70-71"
  ],
  "related_articles": [
   "Article 69",
   "Article 70",
   "Article 91"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-72-act-under-enactment",
  "label": "Compensation for doing or omitting to do an act alleged to be in pursuance of an enactment in force",
  "article": "Article 72",
  "kind": "suit",
  "period": "One year",
  "period_value": 1,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "When the act or omission takes place",
  "exceptions": [
   "Does not apply where the statute relied on itself prescribes a limitation period",
   "Applies to acts done or omitted under colour of statutory authority, including by government officers"
  ],
  "related_articles": [
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-73-false-imprisonment",
  "label": "Compensation for false imprisonment",
  "article": "Article 73",
  "kind": "suit",
  "period": "One year",
  "period_value": 1,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "When the imprisonment ends",
  "exceptions": [
   "For malicious prosecution the accrual point is different (Article 74)"
  ],
  "related_articles": [
   "Article 74"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-74-malicious-prosecution",
  "label": "Compensation for malicious prosecution",
  "article": "Article 74",
  "kind": "suit",
  "period": "One year",
  "period_value": 1,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "When the plaintiff is acquitted or the prosecution is otherwise terminated",
  "exceptions": [
   "Whether time taken in criminal appeals counts depends on when the prosecution is treated as terminated — verify current case law",
   "Delay is not condonable under s.5 (which applies only to appeals and applications)"
  ],
  "related_articles": [
   "Article 73"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-78-inducing-breach-of-contract",
  "label": "Compensation for inducing a person to break a contract with the plaintiff",
  "article": "Article 78",
  "kind": "suit",
  "period": "One year",
  "period_value": 1,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "The date of the breach",
  "exceptions": [
   "Requires proof of the underlying contract and inducement; conspiracy/injunction-related losses may fall under Articles 89-90"
  ],
  "related_articles": [
   "Article 55",
   "Article 90"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-82-fatal-accidents",
  "label": "Suit by executors, administrators or representatives under the Indian Fatal Accidents Act, 1855 (dependency claim)",
  "article": "Article 82",
  "kind": "suit",
  "period": "Two years",
  "period_value": 2,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "The date of the death of the person killed",
  "exceptions": [
   "Death in a motor accident: claim under the Motor Vehicles Act, 1988 instead of Article 82",
   "Claims under the Legal Representatives' Suits Act, 1855 carry one year (Article 81/83)"
  ],
  "related_articles": [
   "Article 81",
   "Article 83",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-87-trespass-on-immovable-property",
  "label": "Compensation for trespass upon immovable property",
  "article": "Article 87",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "The date of the trespass",
  "exceptions": [
   "Continuing trespass attracts a fresh period for each successive act under s.22 (continuing breach/continuing tort)",
   "Recovery of possession, as distinct from compensation, is governed by Articles 64-65"
  ],
  "related_articles": [
   "Article 64",
   "Article 65",
   "Article 85"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-88-copyright-infringement",
  "label": "Compensation for infringing copyright or any other exclusive privilege",
  "article": "Article 88",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part VII — Suits relating to Tort)",
  "accrual": "The date of the infringement",
  "exceptions": [
   "Each infringement is a separate cause of action",
   "Remedies and reliefs under the Copyright Act, 1957 and other special IP statutes apply in addition"
  ],
  "related_articles": [
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-97-pre-emption",
  "label": "Suit to enforce a right of pre-emption (founded on law, general usage or special contract)",
  "article": "Article 97",
  "kind": "suit",
  "period": "One year",
  "period_value": 1,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IX — Suits relating to Miscellaneous Matters)",
  "accrual": "When the purchaser takes physical possession of the whole or part of the property sold, or where the subject-matter does not admit of physical possession, when the instrument of sale is registered",
  "exceptions": [
   "No extension of time under s.6 or s.7 (legal disability) applies to pre-emption suits (s.8)",
   "State pre-emption enactments may prescribe their own periods under s.29(2)"
  ],
  "related_articles": [],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-101-suit-on-judgment",
  "label": "Suit upon a judgment (including a foreign judgment) or a recognisance",
  "article": "Article 101",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IX — Suits relating to Miscellaneous Matters)",
  "accrual": "The date of the judgment or recognisance",
  "exceptions": [
   "Execution of a decree of an Indian court is governed by Article 136 (twelve years), not Article 101",
   "A foreign judgment must first be recognised under Order XLII CPC before a suit on it"
  ],
  "related_articles": [
   "Article 136",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-105-arrears-of-maintenance",
  "label": "Suit by a Hindu for arrears of maintenance",
  "article": "Article 105",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IX — Suits relating to Miscellaneous Matters)",
  "accrual": "When the arrears are payable",
  "exceptions": [
   "Covers maintenance claims under Hindu law; statutory schemes (Hindu Adoptions and Maintenance Act, 1956 and state personal laws) and court-ordered allowances may be treated differently",
   "Periodically recurring rights generally: Article 104 (three years from first refusal of enjoyment)"
  ],
  "related_articles": [
   "Article 104",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "slug": "art-110-excluded-from-joint-family-property",
  "label": "Suit by a person excluded from joint family property to enforce a right to share therein",
  "article": "Article 110",
  "kind": "suit",
  "period": "Twelve years",
  "period_value": 12,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IX — Suits relating to Miscellaneous Matters)",
  "accrual": "When the exclusion becomes known to the plaintiff",
  "exceptions": [
   "Requires actual exclusion known to the plaintiff; where no exclusion occurred, a partition claim generally falls under the residuary Article 113"
  ],
  "related_articles": [
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-112-government-suit",
  "label": "Suit by or on behalf of the Central Government or any State Government",
  "article": "Article 112",
  "kind": "suit",
  "period": "Thirty years",
  "period_value": 30,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IX — Suits relating to Miscellaneous Matters)",
  "accrual": "When the period of limitation would begin to run under the Act against a like suit by a private person",
  "exceptions": [
   "Does not apply to a suit before the Supreme Court in the exercise of its original jurisdiction",
   "Special statutes (tax, revenue, land acquisition) often prescribe shorter periods for the Government"
  ],
  "related_articles": [
   "Article 65",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-113-residuary-suit",
  "label": "Any suit for which no period of limitation is provided elsewhere in the Schedule (residuary article)",
  "article": "Article 113",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part X — Suits for which there is no prescribed period)",
  "accrual": "When the right to sue accrues",
  "exceptions": [
   "Applies only when no specific article covers the subject matter; it cannot be used to defeat a specific article",
   "Partition suits and other unlisted declarations are typically resolved under this article — accrual generally runs from denial of the right"
  ],
  "related_articles": [
   "Article 58",
   "Article 55"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "rectification-of-instrument",
  "label": "Suit to rectify a written instrument so that it records the real agreement of the parties",
  "article": "No specific article (Article 59 by analogy; otherwise Article 113)",
  "kind": "suit",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "civil",
  "division": "First Division — Suits (Part IV — Suits relating to Decrees and Instruments)",
  "accrual": "On the Article 59 basis: when the facts entitling the plaintiff to rectification first become known to him; on the Article 113 basis: when the right to sue accrues",
  "exceptions": [
   "The Schedule contains no dedicated rectification article; courts have applied Article 59 (cancel/set aside/rescind) or the residuary Article 113",
   "Confirm the position of the relevant High Court before relying on this entry"
  ],
  "related_articles": [
   "Article 59",
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "low"
 },
 {
  "slug": "ni-cheque-dishonour-complaint",
  "label": "Complaint for the offence of dishonour of a cheque (Section 138, Negotiable Instruments Act, 1881)",
  "article": "Section 142(1)(b), Negotiable Instruments Act, 1881",
  "kind": "suit",
  "period": "One month from the date on which the cause of action arises",
  "period_value": 1,
  "period_unit": "month",
  "court_type": "criminal",
  "division": "Special statute (outside the Limitation Act Schedule)",
  "accrual": "The cause of action under s.138 arises only after (i) the cheque is returned unpaid for want of sufficient funds, (ii) the payee sends a written notice within 30 days of receipt of the bank's return memo, and (iii) the drawer fails to pay within 15 days of receipt of that notice — the one-month clock then runs",
  "exceptions": [
   "Delay beyond one month is condonable by the court for sufficient cause (proviso to s.142(1)(b), inserted by Act 55 of 2002 w.e.f. 6-2-2003)",
   "Territorial jurisdiction is governed by s.142(2) and s.142A (2015 amendment)",
   "The Limitation Act does not apply; the one-month period is the special statute's own rule (s.29(2))"
  ],
  "related_articles": [
   "Section 138, NI Act"
  ],
  "source_url": "https://www.indiacode.nic.in/show-data?actid=AC_CEN_2_33_00042_00042_1523271998701&orderno=147",
  "source_secondary": null,
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "slug": "consumer-complaint-cpa-2019",
  "label": "Consumer complaint before the District, State or National Commission (Consumer Protection Act, 2019)",
  "article": "Section 69(1), Consumer Protection Act, 2019",
  "kind": "suit",
  "period": "Two years from the date on which the cause of action arises",
  "period_value": 2,
  "period_unit": "year",
  "court_type": "civil",
  "division": "Special statute (outside the Limitation Act Schedule)",
  "accrual": "The date on which the cause of action arises — typically the date of the deficiency in service, defective goods or breach complained of",
  "exceptions": [
   "Delay beyond two years may be condoned if the Commission records reasons to believe the complaint was not barred by limitation (proviso to s.69(1))",
   "Deficiencies discovered later (e.g., latent product defects) may accrue on discovery — verify per case law",
   "Complaints under the Consumer Protection Act, 1986 were governed by s.24A of that Act"
  ],
  "related_articles": [
   "Section 24A, CPA 1986"
  ],
  "source_url": "https://ibclaw.in/section-69-limitation-period",
  "source_secondary": null,
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "slug": "mv-accident-claim-166-3",
  "label": "Claim for compensation in a motor accident before the Motor Accident Claims Tribunal",
  "article": "Section 166(3), Motor Vehicles Act, 1988 (inserted by Act 32 of 2019)",
  "kind": "suit",
  "period": "Six months from the occurrence of the accident",
  "period_value": 6,
  "period_unit": "month",
  "court_type": "civil",
  "division": "Special statute (outside the Limitation Act Schedule)",
  "accrual": "The date of the accident",
  "exceptions": [
   "Section 166(3) was omitted in 1994; the re-inserted six-month bar is the 2019 amendment (operative from 2022 per some High Court orders) — for earlier accidents, tribunals have applied the residuary three-year period (Article 113)",
   "The new text contains no condonation proviso; its constitutionality is under challenge and the Supreme Court has directed (November 2025) that tribunals and High Courts shall not dismiss claims as time-barred under s.166(3) pending decision",
   "Interim/speedy-relief claims under s.163 are separately provided for"
  ],
  "related_articles": [
   "Article 113",
   "Article 82"
  ],
  "source_url": "https://www.indiacode.nic.in/show-data?actid=AC_CEN_30_42_00009_198859_1517807326286&orderno=183",
  "source_secondary": null,
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "slug": "art-114-a-appeal-against-acquittal",
  "label": "Appeal from an order of acquittal (CrPC s.417(1)/(2))",
  "article": "Article 114(a)",
  "kind": "appeal_application",
  "period": "Ninety days",
  "period_value": 90,
  "period_unit": "day",
  "court_type": "appellate",
  "division": "Second Division — Appeals",
  "accrual": "The date of the order appealed from",
  "exceptions": [
   "Article 114(b): Thirty days from the date of the grant of special leave (CrPC s.417(3))",
   "The article references the CrPC, 1898; appeals now arise under CrPC, 1973 / BNSS, 2023 by analogous application and under special statutes — practice commonly allows 90 days against acquittal (CrPC s.378 first proviso)",
   "Special criminal statutes override (e.g., 90 days under the SC/ST (Prevention of Atrocities) Act)"
  ],
  "related_articles": [
   "Article 115",
   "Article 131"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-115-b-i-criminal-appeal-high-court",
  "label": "Appeal to the High Court from any sentence or order other than an order of acquittal (CrPC)",
  "article": "Article 115(b)(i)",
  "kind": "appeal_application",
  "period": "Sixty days",
  "period_value": 60,
  "period_unit": "day",
  "court_type": "appellate",
  "division": "Second Division — Appeals",
  "accrual": "The date of the sentence or order",
  "exceptions": [
   "Article 115(a): Thirty days from a death sentence; Article 115(b)(ii): Thirty days to any other court",
   "Now governed by CrPC s.374 / BNSS equivalents and by special statutes (e.g., NIA Act s.21, PMLA s.42 prescribe their own periods)"
  ],
  "related_articles": [
   "Article 114",
   "Article 131"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-116-a-civil-appeal-high-court",
  "label": "Appeal to a High Court from any decree or order (CPC)",
  "article": "Article 116(a)",
  "kind": "appeal_application",
  "period": "Ninety days",
  "period_value": 90,
  "period_unit": "day",
  "court_type": "appellate",
  "division": "Second Division — Appeals",
  "accrual": "The date of the decree or order",
  "exceptions": [
   "Article 116(b): Thirty days to any other court",
   "Delay is condonable under s.5 for sufficient cause",
   "Commercial disputes: sixty days under the Commercial Courts Act, 2015 (s.13(1-A)) — verify applicability"
  ],
  "related_articles": [
   "Article 116(b)",
   "Article 117",
   "Article 132"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-116-b-appeal-to-other-court",
  "label": "Appeal to any court other than a High Court from a decree or order (CPC)",
  "article": "Article 116(b)",
  "kind": "appeal_application",
  "period": "Thirty days",
  "period_value": 30,
  "period_unit": "day",
  "court_type": "appellate",
  "division": "Second Division — Appeals",
  "accrual": "The date of the decree or order",
  "exceptions": [
   "Condonable for sufficient cause under s.5"
  ],
  "related_articles": [
   "Article 116(a)"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-117-intra-court-appeal",
  "label": "Appeal from a decree or order of a High Court to the same High Court (intra-court appeal)",
  "article": "Article 117",
  "kind": "appeal_application",
  "period": "Thirty days",
  "period_value": 30,
  "period_unit": "day",
  "court_type": "appellate",
  "division": "Second Division — Appeals",
  "accrual": "The date of the decree or order",
  "exceptions": [
   "Available only where a statute such as the Letters Patent permits an intra-court appeal",
   "Condonable under s.5"
  ],
  "related_articles": [
   "Article 116(a)"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-119-arbitration-award",
  "label": "Application under the Arbitration Act, 1940 to file an award in court, or to set aside or remit an award",
  "article": "Article 119",
  "kind": "appeal_application",
  "period": "Thirty days",
  "period_value": 30,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "(a) Filing the award: date of service of notice of the making of the award; (b) setting aside/remission: date of service of notice of the filing of the award",
  "exceptions": [
   "For arbitrations under the Arbitration and Conciliation Act, 1996, an application to set aside an award must be made within three months from the date of receipt of the copy of the award, extendable by thirty days on sufficient cause (s.34(3)) — Article 119 does not apply to such arbitrations",
   "Appeals under s.37 of the 1996 Act follow Articles 116/117 (ninety/thirty days)"
  ],
  "related_articles": [
   "Article 137"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "slug": "art-120-legal-representative-substitution",
  "label": "Application under the CPC to make the legal representative of a deceased plaintiff, appellant, defendant or respondent a party",
  "article": "Article 120",
  "kind": "appeal_application",
  "period": "Ninety days",
  "period_value": 90,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "The date of death of the plaintiff, appellant, defendant or respondent, as the case may be",
  "exceptions": [
   "Where the legal representative is already on record, Order XXII CPC applies instead",
   "Failure to apply results in abatement (Article 121 covers setting aside abatement — sixty days)"
  ],
  "related_articles": [
   "Article 121"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-123-set-aside-ex-parte",
  "label": "Application to set aside a decree passed ex parte, or to re-hear an appeal decreed or heard ex parte",
  "article": "Article 123",
  "kind": "appeal_application",
  "period": "Thirty days",
  "period_value": 30,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "The date of the decree, or where the summons or notice was not duly served, when the applicant had knowledge of the decree",
  "exceptions": [
   "Explanation: substituted service under Order V Rule 20 CPC is not deemed due service for this purpose",
   "Order IX CPC prescribes the same thirty-day window for setting aside ex parte decrees",
   "Restoration after dismissal for default: Article 122 (thirty days)"
  ],
  "related_articles": [
   "Article 122",
   "Article 124"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-124-review-of-judgment",
  "label": "Application for review of judgment by a court other than the Supreme Court",
  "article": "Article 124",
  "kind": "appeal_application",
  "period": "Thirty days",
  "period_value": 30,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "The date of the decree or order",
  "exceptions": [
   "Review by the Supreme Court is outside this article (governed by the Supreme Court Rules — also thirty days)",
   "Time to obtain copies of the decree or judgment is excluded under s.12(2)-(3)",
   "Record of adjustment or satisfaction of a decree: Article 125 (thirty days)"
  ],
  "related_articles": [
   "Article 123",
   "Article 125"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-127-set-aside-execution-sale",
  "label": "Application to set aside a sale in execution of a decree (including by a judgment-debtor)",
  "article": "Article 127",
  "kind": "appeal_application",
  "period": "Sixty days",
  "period_value": 60,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "The date of the sale",
  "exceptions": [
   "Sixty days was substituted for thirty days by Act 52 of 1964",
   "A suit to establish a right to property against an Order XXI Rule 103 CPC order: Article 98 (one year from the final order)"
  ],
  "related_articles": [
   "Article 98",
   "Article 128"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-131-civil-criminal-revision",
  "label": "Application to any court for the exercise of its powers of revision under the CPC or the CrPC",
  "article": "Article 131",
  "kind": "appeal_application",
  "period": "Ninety days",
  "period_value": 90,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "The date of the decree, order or sentence sought to be revised",
  "exceptions": [
   "The article references the CPC, 1908 and CrPC, 1898; read with CPC s.115 / CrPC s.397 and the BNSS equivalents — practice commonly allows ninety days",
   "Condonation follows the applicable procedure and s.5 where it applies"
  ],
  "related_articles": [
   "Article 132",
   "Article 115"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-132-certificate-appeal-supreme-court",
  "label": "Application to the High Court for a certificate of fitness to appeal to the Supreme Court (Constitution Art. 132, 133 or 134(1)(c), or any other law)",
  "article": "Article 132",
  "kind": "appeal_application",
  "period": "Sixty days",
  "period_value": 60,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "The date of the decree, order or sentence",
  "exceptions": [
   "Where the certificate route is unavailable, a petition for special leave under Article 133 applies instead",
   "Condonable under s.5"
  ],
  "related_articles": [
   "Article 133"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-133-special-leave-supreme-court",
  "label": "Application to the Supreme Court for special leave to appeal",
  "article": "Article 133",
  "kind": "appeal_application",
  "period": "Sixty days (clauses (a) and (b)); Ninety days (clause (c))",
  "period_value": 60,
  "period_unit": "day",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "(a) death-sentence case: date of the judgment, final order or sentence; (b) leave refused by the High Court: date of the order of refusal; (c) any other case: date of the judgment or order",
  "exceptions": [
   "Review and curative petitions are governed by the Supreme Court Rules, not Article 133",
   "Condonable under s.5"
  ],
  "related_articles": [
   "Article 132"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-136-execution-of-decree",
  "label": "Application for execution of any decree (other than a mandatory injunction decree) or order of any civil court",
  "article": "Article 136",
  "kind": "appeal_application",
  "period": "Twelve years",
  "period_value": 12,
  "period_unit": "year",
  "court_type": "application",
  "division": "Third Division — Applications (Part I — Applications in specified cases)",
  "accrual": "When the decree or order becomes enforceable, or where it directs payment of money or delivery of property at a certain date or at recurring periods, when default occurs in respect of the payment or delivery for which execution is sought",
  "exceptions": [
   "Proviso: no period of limitation applies to enforcement of a decree granting a perpetual injunction",
   "Mandatory injunction decrees: Article 135 (three years)",
   "Execution applications are excluded from s.5 condonation (Order XXI CPC carve-out)"
  ],
  "related_articles": [
   "Article 135",
   "Article 137",
   "Article 101"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "slug": "art-137-residuary-application",
  "label": "Any other application for which no period is provided elsewhere in the Third Division (residuary article for applications)",
  "article": "Article 137",
  "kind": "appeal_application",
  "period": "Three years",
  "period_value": 3,
  "period_unit": "year",
  "court_type": "application",
  "division": "Third Division — Applications (Part II — Other Applications)",
  "accrual": "When the right to apply accrues",
  "exceptions": [
   "Applies only to applications within the Third Division — suits use Article 113 and appeals use Articles 114-117",
   "Where a specific application article (e.g., Articles 118-136) applies, the residuary period cannot be used"
  ],
  "related_articles": [
   "Article 113"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "source_secondary": "https://ibclaw.in/schedule-of-periods-of-limitation-of-the-limitation-act-1963",
  "as_of": "2026-10-06",
  "confidence": "high"
 }
],
  refs: [
 {
  "kind": "section",
  "ref_key": "Section 3",
  "title": "Bar of limitation",
  "body": "Subject to ss.4-24, every suit instituted, appeal preferred and application made after the prescribed period shall be dismissed, even though limitation has not been set up as a defence. Sub-section (2) fixes the date of institution (tender of the plaint, memorandum of appeal or application).",
  "exceptions": [
   "The bar operates even if the defendant does not plead limitation (CPC Order VII Rule 6 requires the plaintiff to plead it)",
   "Sub-section (2) deems a returned plaint re-presented in time to relate back to the original presentation"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 4",
  "title": "Expiry of prescribed period when court is closed",
  "body": "If the office of the court is or has been closed on the day on which the prescribed period expires, the period is extended to the first day on which the office is open thereafter.",
  "exceptions": [
   "Covers closure of the court office, not the litigant's personal inability to act"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 5",
  "title": "Extension of the prescribed period for sufficient cause (condonation of delay)",
  "body": "Any appeal or application — other than an application under Order XXI of the CPC (execution applications) — may be admitted after the prescribed period if the appellant or applicant satisfies the court that there was sufficient cause for not instituting it within time. Explanation: being misled by any order, practice or judgment of the High Court in ascertaining or computing the period may be sufficient cause.",
  "exceptions": [
   "Does not apply to suits — a suit barred by limitation can never be condoned",
   "Does not apply to execution applications under Order XXI CPC",
   "Discretionary: settled case law requires each day of delay to be explained",
   "For criminal appeals, condonation flows from criminal procedure provisions and judicial discretion, not this section as such"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 6",
  "title": "Legal disability",
  "body": "A person entitled to sue or to apply for execution of a decree who is a minor, insane or an idiot at the time from which limitation is to be reckoned may sue or apply within the same period after the disability has ceased as would otherwise have been available. Successive or concurrent disabilities are reckoned from when both cease; the Explanation states that minor includes a child in the womb. Sub-sections also deal with the death of the disabled person and of the legal representative.",
  "exceptions": [
   "The disability must exist at the time from which limitation is reckoned — a disability arising later does not extend time",
   "Section 8: no application to pre-emption suits, and no extension beyond three years from the cessation of the disability or the death of the person affected"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 7",
  "title": "Disability of one of several persons jointly entitled",
  "body": "Where one of several persons jointly entitled to sue or to apply for execution is under disability and a discharge can be given without his concurrence, time runs against them all; where no such discharge can be given, time does not run against any of them until one becomes capable of giving such discharge without the others' concurrence or until the disability has ceased. Explanation I: applies to discharge from every kind of liability, including liability in respect of immovable property. Explanation II: the manager of a Mitakshara Hindu undivided family is deemed capable of giving discharge only if he is in management of the joint family property.",
  "exceptions": [
   "Subject to the s.8 cap (no extension beyond three years after cessation of disability/death)"
  ],
  "source_url": "https://indiankanoon.org/doc/392398/",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 8",
  "title": "Special exceptions",
  "body": "Nothing in s.6 or s.7 applies to suits to enforce rights of pre-emption, nor shall those sections be deemed to extend, for more than three years from the cessation of the disability or the death of the person affected thereby, the period of limitation for any suit or application.",
  "exceptions": [
   "Hard cap: legal disability can extend time by at most three years"
  ],
  "source_url": "https://www2.allahabadhighcourt.in/ahcr/acts/Limitation%20Act,%201963%20English.pdf",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 9",
  "title": "Continuous running of time",
  "body": "Once limitation has begun to run, no subsequent disability or inability to institute a suit or make an application stops it. Proviso: where letters of administration to the estate of a creditor have been granted to his debtor, limitation for a suit to recover that debt is suspended while the administration continues.",
  "exceptions": [
   "A fresh period may still arise for a continuing breach or default under s.22"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 10",
  "title": "Suits against trustees and their representatives",
  "body": "Notwithstanding the foregoing provisions, no suit against a person in whom property has become vested in trust for any specific purpose, or against his legal representatives or assigns (not being assigns for valuable consideration), for following that property or its proceeds, or for an account of such property or proceeds, shall be barred by any length of time. Explanation: property in a Hindu, Muslim or Buddhist religious or charitable endowment is deemed vested in trust for a specific purpose and the manager is deemed the trustee.",
  "exceptions": [
   "Does not protect suits against a transferee for valuable consideration — Articles 92-96 prescribe periods for recovering trust property transferred by a trustee to third parties (three or twelve years, from when the transfer becomes known)",
   "Compensation for breach of trust remains time-limited (e.g., Article 103)"
  ],
  "source_url": "https://www.indiacode.nic.in/show-data?actid=AC_CEN_3_20_00005_196336_1517807319297&orderno=10",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 11",
  "title": "Suits on contracts entered into outside the territories to which the Act extends",
  "body": "Sub-section (1): suits instituted in India on contracts entered into in Jammu and Kashmir or in a foreign country are subject to the rules of limitation contained in this Act. Sub-section (2): no rule of limitation in force in Jammu and Kashmir or in a foreign country is a defence to such a suit unless — (a) the rule has extinguished the contract; and (b) the further condition in s.11(2)(b) is satisfied.",
  "exceptions": [
   "Sub-section (2)(b) is not reproduced verbatim in this dataset — verify the full text before relying on the foreign-limitation defence",
   "Indian limitation rules generally govern (lex fori) unless the foreign rule has extinguished the right"
  ],
  "source_url": "https://www2.allahabadhighcourt.in/ahcr/acts/Limitation%20Act,%201963%20English.pdf",
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "kind": "section",
  "ref_key": "Section 12",
  "title": "Exclusion of time in legal proceedings (obtaining copies etc.)",
  "body": "(1) The day from which limitation is to be reckoned is excluded. (2) For an appeal, an application for leave to appeal, a revision or a review: the day on which the judgment complained of was pronounced and the time requisite for obtaining a copy of the decree, sentence or order appealed from or sought to be revised or reviewed are excluded. (3) Where a decree or order is appealed from or sought to be revised or reviewed, or leave to appeal is applied for, the time requisite for obtaining a copy of the judgment is also excluded. (4) For an application to set aside an award, the time requisite for obtaining a copy of the award is excluded.",
  "exceptions": [
   "Explanation: any time taken by the court to prepare the decree or order before an application for a copy is made is NOT excluded",
   "Covers only the proceedings listed — it does not create a general pause for every step"
  ],
  "source_url": "https://indiankanoon.org/doc/1267250",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 13",
  "title": "Exclusion of time where leave to sue or appeal as a pauper is applied for",
  "body": "The time during which a bona fide application for leave to sue or appeal as a pauper is pending is excluded from limitation; if leave is ultimately granted, the suit or appeal relates back to the date of the pauper application.",
  "exceptions": [
   "If the pauper application is refused or withdrawn, the exclusion ends and time runs again"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 14",
  "title": "Exclusion of time of proceeding bona fide in court without jurisdiction",
  "body": "Time is excluded during which the plaintiff, with due diligence, prosecuted another civil proceeding against the same defendant in a court that could not grant the relief sought for want of jurisdiction (pecuniary, territorial or subject-matter). Explanation: both the day the earlier proceeding was instituted and the day it ended are counted.",
  "exceptions": [
   "No exclusion where the earlier proceeding was withdrawn for defect of jurisdiction or for misjoinder of parties or of causes of action (deemed a defect of a like nature)",
   "Requires due diligence by the plaintiff",
   "Applies to appeals and applications only where the first proceeding was filed in a court without jurisdiction (case law)"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 15",
  "title": "Exclusion of time in certain other cases",
  "body": "(1) Where a suit or an execution application has been stayed by injunction or order, exclude the continuance of the stay plus the day it was issued/made and the day it was withdrawn. (2) For a suit requiring prior notice, or the consent or sanction of the Government or any other authority, exclude the notice/consent time — Explanation: both the date of the application and the date of receipt of the order are counted. (3) For a suit or execution application by a receiver/interim receiver (insolvency) or liquidator/provisional liquidator (winding up), exclude from the institution of the proceeding to the expiry of three months from appointment. (4) For a suit for possession by a purchaser at an execution sale, exclude the time during which proceedings to set aside the sale were prosecuted. (5) For any suit, exclude time during which the defendant was absent from India and from territories outside India under the administration of the Central Government.",
  "exceptions": [
   "Sub-section (3) is capped at three months after appointment of the receiver/liquidator",
   "Unlike some older provisions, there is no pre-emption carve-out here (that appears in s.16(3))"
  ],
  "source_url": "https://indiankanoon.org/doc/1720337",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 16",
  "title": "Effect of death on or before the accrual of the right to sue",
  "body": "Where a person dies before instituting a suit after the right accrued to him, or where the right accrues after his death, his legal representative may institute the suit within the period that would have been available to the deceased (broadly, the same period measured from the accrual point).",
  "exceptions": [
   "Sub-section (3): does not apply to suits to enforce rights of pre-emption, or to suits for possession of immovable property or of a hereditary office",
   "Interacts with s.6 where the legal representative is under disability"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 17",
  "title": "Effect of fraud or mistake",
  "body": "Limitation does not begin to run until the plaintiff or applicant has discovered the fraud or mistake, or could with reasonable diligence have discovered it — where the suit/application (a) is based on the fraud of the defendant or his agent, (b) is founded on a right whose knowledge was concealed by such fraud, (c) is for relief from the consequences of a mistake, or (d) is for a document necessary to establish the right that was fraudulently concealed (then from when he first had the means of producing it). Sub-section (2): where a judgment-debtor prevented execution of a decree by fraud or force, the court may extend the period for execution on an application made within one year of discovery of the fraud or cessation of force.",
  "exceptions": [
   "Proviso: does not enable recovery of a charge against, or setting aside of a transaction affecting, property purchased for valuable consideration by a person who was not a party to and had no notice of the fraud, mistake or concealment (bona fide purchaser protection)",
   "No fixed outer limit runs while fraud remains undiscovered, but reasonable diligence is required"
  ],
  "source_url": "https://indiankanoon.org/doc/1968689",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 18",
  "title": "Effect of acknowledgment in writing",
  "body": "An acknowledgment in writing signed by the party to be charged or his agent gives a fresh period of limitation running from the date of signature (or, where the writing is undated, from the time proved by oral evidence of when it was signed).",
  "exceptions": [
   "Must be in writing and signed; oral evidence of the contents of the writing is not receivable (only of the date, if undated)",
   "The acknowledgment must be made before the existing period expires",
   "Nothing in the section affects s.25 of the Indian Contract Act, 1872 (acknowledgment of a debt within the period of limitation)"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 19",
  "title": "Effect of payment",
  "body": "A payment of principal or interest made by the party to be charged or his authorised agent before the prescribed period expires gives a fresh period of limitation running from the date of the payment.",
  "exceptions": [
   "Payment cannot revive a debt that is already barred",
   "Must be made by the party liable or someone with authority to pay on his behalf"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "section",
  "ref_key": "Section 22",
  "title": "Continuing breach and continuing default",
  "body": "In the case of a continuing breach of contract or a continuing default, a fresh period of limitation runs from every successive breach or demand; courts have extended the same principle to continuing torts.",
  "exceptions": [
   "Each successive breach or demand must be independently actionable"
  ],
  "source_url": "https://indiacode.gov.in/handle/123456789/496389",
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "note",
  "ref_key": "scope-of-the-limitation-act",
  "title": "Scope of the Limitation Act",
  "body": "The Limitation Act, 1963 (in force 1-1-1964; amended in West Bengal by W.B. Act 18 of 1977) governs civil suits, civil appeals and civil applications. It does not govern criminal proceedings — criminal limitation comes from the BNSS, 2023 (CrPC, 1973 earlier) and special criminal statutes. Under s.3 a time-barred plaint must be dismissed even if limitation is not pleaded as a defence (CPC Order VII Rule 6 requires the plaintiff to plead it).",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "note",
  "ref_key": "corrections-to-commonly-assumed-article-numbers",
  "title": "Corrections to commonly assumed article numbers",
  "body": "Breach of contract is Article 55 (three years) — Article 57 is a declaration that an adoption is invalid or never took place (three years), not a contract article. Criminal appeals are not really a Limitation Act question: Articles 114-115 (which cite the CrPC, 1898) are applied by analogy, while Article 101 is a suit upon a judgment (three years). Review of judgment is Article 124 (thirty days), not Article 119 — Article 119 is filing/setting aside an award under the Arbitration Act, 1940. Civil appeal to the High Court is Article 116(a) (ninety days); intra-court (Letters Patent) appeal is Article 117 (thirty days); special leave to the Supreme Court is Article 133.",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "note",
  "ref_key": "criminal-limitation-outside-this-dataset-s-entries",
  "title": "Criminal limitation (outside this dataset's entries)",
  "body": "BNSS s.514 (earlier CrPC s.468) bars cognizance after: six months (offence punishable with fine only), one year (imprisonment up to one year), three years (imprisonment over one year up to three years); no such bar for offences punishable with more than three years. BNSS ss.513, 515-517 cover definitions, commencement and exclusion of time (CrPC ss.467, 469-471); continuing offences get a fresh period under BNSS s.518 (CrPC s.472) and courts may extend time under BNSS s.519 (CrPC s.473). Criminal appeal periods come from procedure codes and special statutes — commonly 60 days to the High Court (CrPC s.374(2)), 90 days against acquittal (CrPC s.378), 90 days for revision (CrPC s.397), applied under the BNSS for proceedings after 1-7-2024.",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "medium"
 },
 {
  "kind": "note",
  "ref_key": "special-statutes-that-override-the-schedule-ss-29-30",
  "title": "Special statutes that override the Schedule (ss.29-30)",
  "body": "Where another law prescribes a shorter or different period it governs: NI Act cheque complaint — one month from cause of action (s.142(1)(b), condonable); CPA 2019 complaint — two years (s.69(1), condonable); MV Act s.166(3) — six months (under constitutional challenge); Arbitration and Conciliation Act s.34(3) — three months plus thirty days; Commercial Courts Act — sixty-day appeal period for commercial disputes; state rent-control, tenancy, revenue and personal-law statutes prescribe their own periods. The Schedule applies residuarily.",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "note",
  "ref_key": "how-to-compute-the-date",
  "title": "How to compute the date",
  "body": "Count from the day after accrual (s.12(1) excludes the accrual day); exclude judgment and copy time under s.12(2)-(4); if the last day is a day the court office is closed, move to the next open day (s.4); for appeals and applications only, delay may be condoned for sufficient cause (s.5, with the High Court misdirection Explanation). Disability (ss.6-8), an earlier proceeding without jurisdiction (s.14), stays by injunction or order and related exclusions (s.15), death (s.16), fraud or mistake (s.17), acknowledgment or payment (ss.18-19) and continuing breach (s.22) each shift the date. Note: Article 127 is sixty days (substituted by Act 52 of 1964), and Articles 114-115 and 131 cite the CrPC, 1898 — read as CrPC, 1973 / BNSS, 2023 by analogy.",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "note",
  "ref_key": "not-covered-in-this-dataset",
  "title": "Not covered in this dataset",
  "body": "Only a curated subset of the Schedule's 137 articles is included. Deliberately omitted (verify if needed): Article 60 (setting aside a guardian's transfer), Articles 69-71 (other movable property), Articles 75-76 (libel and slander), Articles 85-86, Articles 89-91 (waste, wrongful injunction, conversion compensation), Articles 92-96 (trusts), Articles 98-100 (one-year articles: execution-sale orders, setting aside sales, decisions of civil courts), Articles 102-104, Article 106 (legacy — twelve years), Article 107 (hereditary office — twelve years), Articles 108-109 (Human female alienation, Mitakshara father's alienation — twelve years), Article 111 (local authority streets — thirty years), Articles 128-130 and 134-135 (possession applications, pauper leave, delivery to purchasers, mandatory injunction decrees), plus state-specific amendments (W.B. Act 18 of 1977, J&K and Ladakh provisions).",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "high"
 },
 {
  "kind": "note",
  "ref_key": "disclaimer-and-verification",
  "title": "Disclaimer and verification",
  "body": "Informational dataset compiled from published sources (India Code official text, Indian Kanoon section texts, IBC Laws Schedule text) — not legal advice. Verify the current text, state amendments and local practice before relying on any entry, especially the MV Act s.166(3) position (constitutional challenge pending; Supreme Court interim direction of November 2025 against dismissing claims on that ground) and criminal appeal periods under the newly in-force BNSS.",
  "exceptions": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "confidence": "high"
 }
],
};
