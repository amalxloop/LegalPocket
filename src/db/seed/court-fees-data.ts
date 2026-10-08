// GENERATED from the PRD 3A court-fee research dataset (2026-10-06).
// 36 jurisdictions: 22 with rates (Rajasthan / AP / Telangana / Maharashtra / Gujarat
// validated against official act text), 14 explicit unknowns with no invented rates.
// Band semantics (see src/lib/court-fee.ts):
//   k absent  -> fee = base + ceil((x - min) / unit) * unit * rate
//   k present -> fee = base + (ceil(x / unit) * unit - k) * rate
//   unit null -> fee = base + (x - min) * rate   (linear)
// optional band `floor`, optional jurisdiction `cap`.

export interface CourtFeeSeedBand {
  min: number;
  max: number | null;
  base: number;
  unit: number | null;
  rate: number;
  k?: number;
  floor?: number;
}

export interface CourtFeeSeedJurisdiction {
  slug: string;
  name: string;
  statute: string;
  basis: string;
  status: 'ready' | 'unknown';
  confidence: 'high' | 'medium' | 'none';
  bands: CourtFeeSeedBand[];
  cap: number | null;
  source_url: string | null;
  as_of: string;
  note: string;
}

export const COURT_FEE_METHOD = "PRD 3A state-wise ad-valorem court fee. Compiled calculator bands converted to uniform {min,max,base,unit,rate} schema (fee = base + ceil((x-min)/unit)*unit*rate, optional floor, global cap), numerically verified against original expressions at 13 sample points per group. Official acts validated where obtained (Rajasthan, AP/Telangana, Maharashtra, Gujarat). Assam = official Table of Rates + Act 28/1972 clauses; Odisha = official 2015 First Schedule. 14 jurisdictions have no verified source: status=unknown, no rates shipped.";

export const COURT_FEE_SEED: CourtFeeSeedJurisdiction[] = [
 {
  "slug": "rajasthan",
  "name": "Rajasthan",
  "statute": "Rajasthan Court Fees and Suits Valuation Act, 1961 (Act 23 of 1961, as amended)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "high",
  "bands": [
   {
    "min": 0.0,
    "max": 15000.0,
    "base": 0.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 15000.0,
    "max": 75000.0,
    "base": 375.0,
    "unit": null,
    "rate": 0.075
   },
   {
    "min": 75000.0,
    "max": 250000.0,
    "base": 4875.0,
    "unit": null,
    "rate": 0.07
   },
   {
    "min": 250000.0,
    "max": 500000.0,
    "base": 17125.0,
    "unit": null,
    "rate": 0.065
   },
   {
    "min": 500000.0,
    "max": 750000.0,
    "base": 33375.0,
    "unit": null,
    "rate": 0.06
   },
   {
    "min": 750000.0,
    "max": 1000000.0,
    "base": 48375.0,
    "unit": null,
    "rate": 0.055
   },
   {
    "min": 1000000.0,
    "max": 1500000.0,
    "base": 62125.0,
    "unit": null,
    "rate": 0.05
   },
   {
    "min": 1500000.0,
    "max": 2000000.0,
    "base": 87125.0,
    "unit": null,
    "rate": 0.045
   },
   {
    "min": 2000000.0,
    "max": 2500000.0,
    "base": 109625.0,
    "unit": null,
    "rate": 0.04
   },
   {
    "min": 2500000.0,
    "max": 3000000.0,
    "base": 129625.0,
    "unit": null,
    "rate": 0.035
   },
   {
    "min": 3000000.0,
    "max": 4000000.0,
    "base": 147125.0,
    "unit": null,
    "rate": 0.03
   },
   {
    "min": 4000000.0,
    "max": 10000000.0,
    "base": 177125.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 10000000.0,
    "max": 15000000.0,
    "base": 327125.0,
    "unit": null,
    "rate": 0.02
   },
   {
    "min": 15000000.0,
    "max": 20000000.0,
    "base": 427125.0,
    "unit": null,
    "rate": 0.015
   },
   {
    "min": 20000000.0,
    "max": 30000000.0,
    "base": 502125.0,
    "unit": null,
    "rate": 0.01
   },
   {
    "min": 30000000.0,
    "max": null,
    "base": 602125.0,
    "unit": null,
    "rate": 0.005
   }
  ],
  "cap": null,
  "source_url": "local:raj1961.pdf (Act 23 of 1961, amd. 11/2020)",
  "as_of": "2026-10-06",
  "note": "Schedule rates verified against official act text at 8 sample values (25/125/250/1125/3000/6625/33375/62125)."
 },
 {
  "slug": "andhra-pradesh",
  "name": "Andhra Pradesh",
  "statute": "Andhra Pradesh Court Fees and Suits Valuation Act, 1956",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "high",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.12,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 1000.0,
    "base": 12.0,
    "unit": 10.0,
    "rate": 0.11,
    "k": 100.0
   },
   {
    "min": 1000.0,
    "max": 10000.0,
    "base": 111.0,
    "unit": 100.0,
    "rate": 0.075,
    "k": 1000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 786.0,
    "unit": 500.0,
    "rate": 0.06,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 1386.0,
    "unit": 1000.0,
    "rate": 0.04,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 1786.0,
    "unit": 2000.0,
    "rate": 0.03,
    "k": 30000.0
   },
   {
    "min": 50000.0,
    "max": 54000.0,
    "base": 2446.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 54000.0,
    "max": 58000.0,
    "base": 2546.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 58000.0,
    "max": 98000.0,
    "base": 2586.0,
    "unit": 4000.0,
    "rate": 0.02,
    "k": 62000.0
   },
   {
    "min": 98000.0,
    "max": 100000.0,
    "base": 3426.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 100000.0,
    "max": null,
    "base": 3426.0,
    "unit": 10000.0,
    "rate": 0.01,
    "k": 100000.0
   }
  ],
  "cap": null,
  "source_url": "local:ap1956.pdf (official act text)",
  "as_of": "2026-10-06",
  "note": "Verified against official act schedule at 8 sample values (111/411/786/1586/2386/3426/7426/12426)."
 },
 {
  "slug": "telangana",
  "name": "Telangana",
  "statute": "Andhra Pradesh Court Fees and Suits Valuation Act, 1956 (as continued in Telangana)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "high",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.12,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 1000.0,
    "base": 12.0,
    "unit": 10.0,
    "rate": 0.11,
    "k": 100.0
   },
   {
    "min": 1000.0,
    "max": 10000.0,
    "base": 111.0,
    "unit": 100.0,
    "rate": 0.075,
    "k": 1000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 786.0,
    "unit": 500.0,
    "rate": 0.06,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 1386.0,
    "unit": 1000.0,
    "rate": 0.04,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 1786.0,
    "unit": 2000.0,
    "rate": 0.03,
    "k": 30000.0
   },
   {
    "min": 50000.0,
    "max": 54000.0,
    "base": 2446.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 54000.0,
    "max": 58000.0,
    "base": 2546.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 58000.0,
    "max": 98000.0,
    "base": 2586.0,
    "unit": 4000.0,
    "rate": 0.02,
    "k": 62000.0
   },
   {
    "min": 98000.0,
    "max": 100000.0,
    "base": 3426.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 100000.0,
    "max": null,
    "base": 3426.0,
    "unit": 10000.0,
    "rate": 0.01,
    "k": 100000.0
   }
  ],
  "cap": null,
  "source_url": "local:ap1956.pdf (official act text)",
  "as_of": "2026-10-06",
  "note": "Successor-state continuation of AP 1956 act; rates identical to Andhra Pradesh. Verified at 8 sample values."
 },
 {
  "slug": "maharashtra",
  "name": "Maharashtra",
  "statute": "Court Fees Act, 1870 as amended by Maharashtra Act 18 of 2002",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "high",
  "bands": [
   {
    "min": 0.0,
    "max": 1000.0,
    "base": 200.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 200.0,
    "unit": 100.0,
    "rate": 0.12,
    "k": 1000.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 680.0,
    "unit": 100.0,
    "rate": 0.15,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1430.0,
    "unit": 500.0,
    "rate": 0.15,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 2930.0,
    "unit": 1000.0,
    "rate": 0.1,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 3930.0,
    "unit": 2000.0,
    "rate": 0.05,
    "k": 30000.0
   },
   {
    "min": 50000.0,
    "max": 100000.0,
    "base": 4930.0,
    "unit": 5000.0,
    "rate": 0.03,
    "k": 50000.0
   },
   {
    "min": 100000.0,
    "max": 1100000.0,
    "base": 6430.0,
    "unit": 10000.0,
    "rate": 0.02,
    "k": 100000.0
   },
   {
    "min": 1100000.0,
    "max": null,
    "base": 26430.0,
    "unit": 100000.0,
    "rate": 0.012,
    "k": 1100000.0
   }
  ],
  "cap": 300000.0,
  "source_url": "https://www.indiacode.nic.in (Maharashtra Act 18 of 2002, s.7)",
  "as_of": "2026-10-06",
  "note": "All 9 fee slabs match s.7 clause structure including cap of Rs.3,00,000."
 },
 {
  "slug": "gujarat",
  "name": "Gujarat",
  "statute": "Gujarat Court-Fees Act, 2004",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "high",
  "bands": [
   {
    "min": 0.0,
    "max": 10000.0,
    "base": 0.0,
    "unit": 100.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1000.0,
    "unit": 5000.0,
    "rate": 0.05,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 21000.0,
    "base": 1525.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 21000.0,
    "max": 30000.0,
    "base": 1525.0,
    "unit": 1000.0,
    "rate": 0.075,
    "k": 21000.0
   },
   {
    "min": 30000.0,
    "max": 32000.0,
    "base": 2375.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 32000.0,
    "max": 34000.0,
    "base": 2500.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 34000.0,
    "max": 50000.0,
    "base": 2500.0,
    "unit": 2000.0,
    "rate": 0.075,
    "k": 34000.0
   },
   {
    "min": 50000.0,
    "max": 75000.0,
    "base": 3700.0,
    "unit": 5000.0,
    "rate": 0.06,
    "k": 50000.0
   },
   {
    "min": 75000.0,
    "max": 100000.0,
    "base": 5950.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 100000.0,
    "max": 1000000.0,
    "base": 5950.0,
    "unit": 100000.0,
    "rate": 0.02,
    "k": 100000.0
   },
   {
    "min": 1000000.0,
    "max": 2000000.0,
    "base": 23950.0,
    "unit": 200000.0,
    "rate": 0.012,
    "k": 1000000.0
   },
   {
    "min": 2000000.0,
    "max": null,
    "base": 35950.0,
    "unit": 100000.0,
    "rate": 0.005,
    "k": 2000000.0
   }
  ],
  "cap": 75000.0,
  "source_url": "https://www.indiacode.nic.in (Gujarat Court-Fees Act 2004)",
  "as_of": "2026-10-06",
  "note": "Matches official table at Rs.2,000/5,000/10,000/25,000/50,000/1,00,000/5,00,000/10,00,000 and prose examples (1,00,000 -> 5,950; 2,00,000 -> 7,950; cap Rs.75,000). Official table shows flat Rs.10 up to Rs.1,000 where calculator applies 10% (~Rs.100) - affects only suits valued at or below Rs.1,000-2,000; identical from Rs.2,000."
 },
 {
  "slug": "delhi",
  "name": "Delhi",
  "statute": "Court Fees Act, 1870 as amended for NCT of Delhi",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 500.0,
    "base": 0.0,
    "unit": 10.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 500.0,
    "max": 890.0,
    "base": 75.0,
    "unit": 10.0,
    "rate": 0.15,
    "k": 500.0
   },
   {
    "min": 890.0,
    "max": 900.0,
    "base": 135.5,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 900.0,
    "max": 910.0,
    "base": 136.5,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 910.0,
    "max": 1000.0,
    "base": 136.5,
    "unit": 10.0,
    "rate": 0.15,
    "k": 910.0
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 150.0,
    "unit": 100.0,
    "rate": 0.122,
    "k": 1000.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 638.0,
    "unit": 250.0,
    "rate": 0.0976,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1126.0,
    "unit": 500.0,
    "rate": 0.073,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 1856.0,
    "unit": 1000.0,
    "rate": 0.0488,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 2344.0,
    "unit": 2000.0,
    "rate": 0.0244,
    "k": 30000.0
   },
   {
    "min": 50000.0,
    "max": null,
    "base": 2832.0,
    "unit": 5000.0,
    "rate": 0.00976,
    "k": 50000.0
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; official Delhi notification not independently verified."
 },
 {
  "slug": "chandigarh",
  "name": "Chandigarh",
  "statute": "Punjab Court Fees Act, 1960 (applicable in Chandigarh)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 500.0,
    "base": 0.0,
    "unit": 10.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 500.0,
    "max": 890.0,
    "base": 75.0,
    "unit": 10.0,
    "rate": 0.15,
    "k": 500.0
   },
   {
    "min": 890.0,
    "max": 900.0,
    "base": 135.5,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 900.0,
    "max": 910.0,
    "base": 136.5,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 910.0,
    "max": 1000.0,
    "base": 136.5,
    "unit": 10.0,
    "rate": 0.15,
    "k": 910.0
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 150.0,
    "unit": 100.0,
    "rate": 0.122,
    "k": 1000.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 638.0,
    "unit": 250.0,
    "rate": 0.0976,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1126.0,
    "unit": 500.0,
    "rate": 0.073,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 1856.0,
    "unit": 1000.0,
    "rate": 0.0488,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 2344.0,
    "unit": 2000.0,
    "rate": 0.0244,
    "k": 30000.0
   },
   {
    "min": 50000.0,
    "max": null,
    "base": 2832.0,
    "unit": 5000.0,
    "rate": 0.00976,
    "k": 50000.0
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Calculator groups Chandigarh with Delhi (same rates shown); Chandigarh actually applies the Punjab Court Fees Act, 1960 - verify locally."
 },
 {
  "slug": "uttar-pradesh",
  "name": "Uttar Pradesh",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 300.0,
    "base": 10.0,
    "unit": 10.0,
    "rate": 0.125,
    "k": 100.0
   },
   {
    "min": 300.0,
    "max": 500.0,
    "base": 35.0,
    "unit": 10.0,
    "rate": 0.15,
    "k": 300.0
   },
   {
    "min": 500.0,
    "max": 1000.0,
    "base": 65.0,
    "unit": 10.0,
    "rate": 0.225,
    "k": 500.0
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 177.5,
    "unit": 100.0,
    "rate": 0.12,
    "k": 1000.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 657.5,
    "unit": 200.0,
    "rate": 0.1,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 10500.0,
    "base": 1157.5,
    "unit": 500.0,
    "rate": 0.076,
    "k": 10000.0
   },
   {
    "min": 10500.0,
    "max": 11000.0,
    "base": 1195.5,
    "unit": 500.0,
    "rate": 0.074,
    "k": 10500.0
   },
   {
    "min": 11000.0,
    "max": null,
    "base": 1232.5,
    "unit": 500.0,
    "rate": 0.075,
    "k": 11000.0
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; UP Court Fees Act text not independently verified."
 },
 {
  "slug": "uttarakhand",
  "name": "Uttarakhand",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 300.0,
    "base": 10.0,
    "unit": 10.0,
    "rate": 0.125,
    "k": 100.0
   },
   {
    "min": 300.0,
    "max": 500.0,
    "base": 35.0,
    "unit": 10.0,
    "rate": 0.15,
    "k": 300.0
   },
   {
    "min": 500.0,
    "max": 1000.0,
    "base": 65.0,
    "unit": 10.0,
    "rate": 0.225,
    "k": 500.0
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 177.5,
    "unit": 100.0,
    "rate": 0.12,
    "k": 1000.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 657.5,
    "unit": 200.0,
    "rate": 0.1,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 10500.0,
    "base": 1157.5,
    "unit": 500.0,
    "rate": 0.076,
    "k": 10000.0
   },
   {
    "min": 10500.0,
    "max": 11000.0,
    "base": 1195.5,
    "unit": 500.0,
    "rate": 0.074,
    "k": 10500.0
   },
   {
    "min": 11000.0,
    "max": null,
    "base": 1232.5,
    "unit": 500.0,
    "rate": 0.075,
    "k": 11000.0
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Calculator groups Uttarakhand with UP (same rates shown); Uttarakhand amendments not separately verified."
 },
 {
  "slug": "punjab",
  "name": "Punjab",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 10000.0,
    "base": 0.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 250.0,
    "unit": null,
    "rate": 0.035
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 600.0,
    "unit": null,
    "rate": 0.045
   },
   {
    "min": 30000.0,
    "max": 40000.0,
    "base": 1050.0,
    "unit": null,
    "rate": 0.055
   },
   {
    "min": 40000.0,
    "max": 50000.0,
    "base": 1600.0,
    "unit": null,
    "rate": 0.065
   },
   {
    "min": 50000.0,
    "max": 60000.0,
    "base": 2250.0,
    "unit": null,
    "rate": 0.075
   },
   {
    "min": 60000.0,
    "max": 75000.0,
    "base": 3000.0,
    "unit": null,
    "rate": 0.065
   },
   {
    "min": 75000.0,
    "max": 100000.0,
    "base": 3975.0,
    "unit": null,
    "rate": 0.055
   },
   {
    "min": 100000.0,
    "max": 200000.0,
    "base": 5350.0,
    "unit": null,
    "rate": 0.035
   },
   {
    "min": 200000.0,
    "max": null,
    "base": 8850.0,
    "unit": null,
    "rate": 0.0225
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; Punjab court-fees text not independently verified."
 },
 {
  "slug": "haryana",
  "name": "Haryana",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 15000.0,
    "base": 0.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 15000.0,
    "max": 27000.0,
    "base": 375.0,
    "unit": null,
    "rate": 0.035
   },
   {
    "min": 27000.0,
    "max": 39000.0,
    "base": 795.0,
    "unit": null,
    "rate": 0.045
   },
   {
    "min": 39000.0,
    "max": 51000.0,
    "base": 1335.0,
    "unit": null,
    "rate": 0.055
   },
   {
    "min": 51000.0,
    "max": 63000.0,
    "base": 1995.0,
    "unit": null,
    "rate": 0.065
   },
   {
    "min": 63000.0,
    "max": 75000.0,
    "base": 2775.0,
    "unit": null,
    "rate": 0.075
   },
   {
    "min": 75000.0,
    "max": 500000.0,
    "base": 3675.0,
    "unit": null,
    "rate": 0.065
   },
   {
    "min": 500000.0,
    "max": 1000000.0,
    "base": 31300.0,
    "unit": null,
    "rate": 0.055
   },
   {
    "min": 1000000.0,
    "max": 2000000.0,
    "base": 58800.0,
    "unit": null,
    "rate": 0.045
   },
   {
    "min": 2000000.0,
    "max": 3000000.0,
    "base": 103800.0,
    "unit": null,
    "rate": 0.035
   },
   {
    "min": 3000000.0,
    "max": 4500000.0,
    "base": 138800.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 4500000.0,
    "max": 6000000.0,
    "base": 176300.0,
    "unit": null,
    "rate": 0.015
   },
   {
    "min": 6000000.0,
    "max": 7500000.0,
    "base": 198800.0,
    "unit": null,
    "rate": 0.005
   },
   {
    "min": 7500000.0,
    "max": null,
    "base": 206300.0,
    "unit": 5000.0,
    "rate": 0.005,
    "k": 7500000.0
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Base Rs.2,06,300 at Rs.75,00,000 matches official text, but compiled top band charges Rs.25 per Rs.5,000 where published act text says Rs.25 per Rs.500 (10x difference above Rs.75L) - verify the top slab locally."
 },
 {
  "slug": "himachal-pradesh",
  "name": "Himachal Pradesh",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.2,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 500.0,
    "base": 20.0,
    "unit": 10.0,
    "rate": 0.1,
    "k": 100.0
   },
   {
    "min": 500.0,
    "max": 1000.0,
    "base": 60.0,
    "unit": 10.0,
    "rate": 0.2,
    "k": 500.0
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 160.0,
    "unit": 100.0,
    "rate": 0.15,
    "k": 1000.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 760.0,
    "unit": 250.0,
    "rate": 0.1,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1260.0,
    "unit": 500.0,
    "rate": 0.08,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 2060.0,
    "unit": 1000.0,
    "rate": 0.05,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 2560.0,
    "unit": 2000.0,
    "rate": 0.025,
    "k": 30000.0
   },
   {
    "min": 50000.0,
    "max": null,
    "base": 3060.0,
    "unit": 5000.0,
    "rate": 0.01,
    "k": 50000.0
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; official HP text not independently verified."
 },
 {
  "slug": "karnataka",
  "name": "Karnataka",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 15000.0,
    "base": 0.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 15000.0,
    "max": 75000.0,
    "base": 375.0,
    "unit": null,
    "rate": 0.075
   },
   {
    "min": 75000.0,
    "max": 250000.0,
    "base": 4875.0,
    "unit": null,
    "rate": 0.07
   },
   {
    "min": 250000.0,
    "max": 500000.0,
    "base": 17125.0,
    "unit": null,
    "rate": 0.065
   },
   {
    "min": 500000.0,
    "max": 750000.0,
    "base": 33375.0,
    "unit": null,
    "rate": 0.06
   },
   {
    "min": 750000.0,
    "max": 1000000.0,
    "base": 48375.0,
    "unit": null,
    "rate": 0.055
   },
   {
    "min": 1000000.0,
    "max": 1500000.0,
    "base": 62125.0,
    "unit": null,
    "rate": 0.05
   },
   {
    "min": 1500000.0,
    "max": 2000000.0,
    "base": 87125.0,
    "unit": null,
    "rate": 0.045
   },
   {
    "min": 2000000.0,
    "max": 2500000.0,
    "base": 109625.0,
    "unit": null,
    "rate": 0.04
   },
   {
    "min": 2500000.0,
    "max": 3000000.0,
    "base": 129625.0,
    "unit": null,
    "rate": 0.035
   },
   {
    "min": 3000000.0,
    "max": 4000000.0,
    "base": 147125.0,
    "unit": null,
    "rate": 0.03
   },
   {
    "min": 4000000.0,
    "max": 5000000.0,
    "base": 177125.0,
    "unit": null,
    "rate": 0.025
   },
   {
    "min": 5000000.0,
    "max": 6000000.0,
    "base": 202125.0,
    "unit": null,
    "rate": 0.02
   },
   {
    "min": 6000000.0,
    "max": 7000000.0,
    "base": 222125.0,
    "unit": null,
    "rate": 0.015
   },
   {
    "min": 7000000.0,
    "max": 8000000.0,
    "base": 237125.0,
    "unit": null,
    "rate": 0.01
   },
   {
    "min": 8000000.0,
    "max": null,
    "base": 247125.0,
    "unit": null,
    "rate": 0.015
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; Karnataka amendment text not independently verified."
 },
 {
  "slug": "tamil-nadu",
  "name": "Tamil Nadu",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 5.0,
    "base": 0.4,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 5.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.08,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": null,
    "base": 8.0,
    "unit": 10.0,
    "rate": 0.075
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; only 3 slabs in source; verify with Tamil Nadu amendment text."
 },
 {
  "slug": "kerala",
  "name": "Kerala",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 4.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 100.0,
    "max": 15000.0,
    "base": 0.0,
    "unit": 100.0,
    "rate": 0.04,
    "k": 0.0
   },
   {
    "min": 15000.0,
    "max": 50000.0,
    "base": 600.0,
    "unit": 100.0,
    "rate": 0.08
   },
   {
    "min": 50000.0,
    "max": 1000000.0,
    "base": 3400.0,
    "unit": 100.0,
    "rate": 0.1
   },
   {
    "min": 1000000.0,
    "max": 10000000.0,
    "base": 98400.0,
    "unit": 100.0,
    "rate": 0.08
   },
   {
    "min": 10000000.0,
    "max": null,
    "base": 818400.0,
    "unit": 100.0,
    "rate": 0.01
   }
  ],
  "cap": null,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; Kerala court-fees text not independently verified."
 },
 {
  "slug": "madhya-pradesh",
  "name": "Madhya Pradesh",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 500000.0,
    "base": 0.0,
    "unit": null,
    "rate": 0.12,
    "floor": 100.0
   },
   {
    "min": 500000.0,
    "max": 1000000.0,
    "base": 60000.0,
    "unit": null,
    "rate": 0.07
   },
   {
    "min": 1000000.0,
    "max": null,
    "base": 95000.0,
    "unit": null,
    "rate": 0.03
   }
  ],
  "cap": 150000.0,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; includes Rs.100 minimum on first slab and Rs.1,50,000 cap; official MP text not independently verified."
 },
 {
  "slug": "bihar",
  "name": "Bihar",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.2,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 1000.0,
    "base": 20.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 200.0,
    "unit": 100.0,
    "rate": 0.16
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 840.0,
    "unit": 250.0,
    "rate": 0.128
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1480.0,
    "unit": 500.0,
    "rate": 0.096
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 2440.0,
    "unit": 1000.0,
    "rate": 0.064
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 3080.0,
    "unit": 2000.0,
    "rate": 0.032
   },
   {
    "min": 50000.0,
    "max": null,
    "base": 3720.0,
    "unit": 5000.0,
    "rate": 0.016
   }
  ],
  "cap": 50000.0,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Plaint rates compiled from state-wise calculator. Separate probate fee (Rs.2,06,500 + 0.5% above Rs.1Cr, max Rs.3L) exists under other articles - do not confuse with plaint fee."
 },
 {
  "slug": "jharkhand",
  "name": "Jharkhand",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.2,
    "k": 0.0
   },
   {
    "min": 100.0,
    "max": 1000.0,
    "base": 20.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 1000.0,
    "max": 5000.0,
    "base": 200.0,
    "unit": 100.0,
    "rate": 0.16
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 840.0,
    "unit": 250.0,
    "rate": 0.128
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 1480.0,
    "unit": 500.0,
    "rate": 0.096
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 2440.0,
    "unit": 1000.0,
    "rate": 0.064
   },
   {
    "min": 30000.0,
    "max": 50000.0,
    "base": 3080.0,
    "unit": 2000.0,
    "rate": 0.032
   },
   {
    "min": 50000.0,
    "max": null,
    "base": 3720.0,
    "unit": 5000.0,
    "rate": 0.016
   }
  ],
  "cap": 50000.0,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Calculator groups Jharkhand with Bihar (same rates shown); Jharkhand-specific amendments not separately verified. See Bihar note on probate fee."
 },
 {
  "slug": "jammu-kashmir",
  "name": "Jammu & Kashmir",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 100.0,
    "base": 10.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 100.0,
    "max": 1000.0,
    "base": 0.0,
    "unit": 10.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 1000.0,
    "max": 1100.0,
    "base": 106.2,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 1100.0,
    "max": 1200.0,
    "base": 112.5,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 1200.0,
    "max": 1300.0,
    "base": 118.75,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 1300.0,
    "max": 2600.0,
    "base": 118.75,
    "unit": 100.0,
    "rate": 0.0625,
    "k": 1300.0
   },
   {
    "min": 2600.0,
    "max": 2700.0,
    "base": 206.15,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 2700.0,
    "max": 2800.0,
    "base": 212.5,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 2800.0,
    "max": 2900.0,
    "base": 218.75,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 2900.0,
    "max": 5000.0,
    "base": 218.75,
    "unit": 100.0,
    "rate": 0.0625,
    "k": 2900.0
   },
   {
    "min": 5000.0,
    "max": 10000.0,
    "base": 350.0,
    "unit": 250.0,
    "rate": 0.08,
    "k": 5000.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 750.0,
    "unit": 500.0,
    "rate": 0.1,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 30000.0,
    "base": 1750.0,
    "unit": 1000.0,
    "rate": 0.1,
    "k": 20000.0
   },
   {
    "min": 30000.0,
    "max": 32000.0,
    "base": 2900.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 32000.0,
    "max": 34000.0,
    "base": 3150.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 34000.0,
    "max": 50000.0,
    "base": 3150.0,
    "unit": 2000.0,
    "rate": 0.075,
    "k": 34000.0
   },
   {
    "min": 50000.0,
    "max": 52500.0,
    "base": 4500.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 52500.0,
    "max": 55000.0,
    "base": 4600.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 55000.0,
    "max": 57500.0,
    "base": 4800.0,
    "unit": null,
    "rate": 0.0
   },
   {
    "min": 57500.0,
    "max": 75000.0,
    "base": 4800.0,
    "unit": 2500.0,
    "rate": 0.06,
    "k": 57500.0
   },
   {
    "min": 75000.0,
    "max": 100000.0,
    "base": 5850.0,
    "unit": 5000.0,
    "rate": 0.03,
    "k": 75000.0
   },
   {
    "min": 100000.0,
    "max": 1000000.0,
    "base": 6600.0,
    "unit": 10000.0,
    "rate": 0.02,
    "k": 100000.0
   },
   {
    "min": 1000000.0,
    "max": 2000000.0,
    "base": 24600.0,
    "unit": 100000.0,
    "rate": 0.012,
    "k": 1000000.0
   },
   {
    "min": 2000000.0,
    "max": null,
    "base": 36600.0,
    "unit": 100000.0,
    "rate": 0.005,
    "k": 2000000.0
   }
  ],
  "cap": 75000.0,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator (24 slabs); reorganisation-era amendments not independently verified."
 },
 {
  "slug": "west-bengal",
  "name": "West Bengal",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "compiled_calculator",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 1000.0,
    "base": 0.0,
    "unit": 100.0,
    "rate": 0.1,
    "k": 0.0
   },
   {
    "min": 1000.0,
    "max": 7500.0,
    "base": 100.0,
    "unit": 100.0,
    "rate": 0.08,
    "k": 1000.0
   },
   {
    "min": 7500.0,
    "max": 10000.0,
    "base": 620.0,
    "unit": 250.0,
    "rate": 0.064,
    "k": 7500.0
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 780.0,
    "unit": 500.0,
    "rate": 0.06,
    "k": 10000.0
   },
   {
    "min": 20000.0,
    "max": 50000.0,
    "base": 1380.0,
    "unit": 1000.0,
    "rate": 0.05,
    "k": 20000.0
   },
   {
    "min": 50000.0,
    "max": 100000.0,
    "base": 2880.0,
    "unit": 5000.0,
    "rate": 0.07,
    "k": 50000.0
   },
   {
    "min": 100000.0,
    "max": 200000.0,
    "base": 6380.0,
    "unit": 5000.0,
    "rate": 0.074,
    "k": 100000.0
   },
   {
    "min": 200000.0,
    "max": 300000.0,
    "base": 13780.0,
    "unit": 5000.0,
    "rate": 0.042,
    "k": 200000.0
   },
   {
    "min": 300000.0,
    "max": null,
    "base": 17980.0,
    "unit": 10000.0,
    "rate": 0.01,
    "k": 300000.0
   }
  ],
  "cap": 50000.0,
  "source_url": "https://www.centurylawfirm.in/blog/court-fee-calculator-state-wise-online",
  "as_of": "2026-10-06",
  "note": "Compiled from state-wise calculator; West Bengal court-fees text not independently verified."
 },
 {
  "slug": "odisha",
  "name": "Odisha",
  "statute": "Court Fees Act, 1870 - First Schedule (state table published 2015)",
  "basis": "official_state_schedule",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 5.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 5.0,
    "max": 10.0,
    "base": 1.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 10.0,
    "max": 15.0,
    "base": 2.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 15.0,
    "max": 20.0,
    "base": 3.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 20.0,
    "max": 25.0,
    "base": 4.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 25.0,
    "max": 30.0,
    "base": 5.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 30.0,
    "max": 35.0,
    "base": 6.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 35.0,
    "max": 40.0,
    "base": 7.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 40.0,
    "max": 45.0,
    "base": 8.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 45.0,
    "max": 50.0,
    "base": 9.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 50.0,
    "max": 55.0,
    "base": 10.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 55.0,
    "max": 60.0,
    "base": 11.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 60.0,
    "max": 65.0,
    "base": 12.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 65.0,
    "max": 70.0,
    "base": 13.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 70.0,
    "max": 75.0,
    "base": 14.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 75.0,
    "max": 80.0,
    "base": 15.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 80.0,
    "max": 85.0,
    "base": 16.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 85.0,
    "max": 90.0,
    "base": 17.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 90.0,
    "max": 95.0,
    "base": 18.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 95.0,
    "max": 100.0,
    "base": 19.0,
    "unit": 5.0,
    "rate": 0.2
   },
   {
    "min": 100.0,
    "max": 110.0,
    "base": 20.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 110.0,
    "max": 120.0,
    "base": 21.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 120.0,
    "max": 130.0,
    "base": 22.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 130.0,
    "max": 140.0,
    "base": 23.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 140.0,
    "max": 150.0,
    "base": 24.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 150.0,
    "max": 160.0,
    "base": 25.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 160.0,
    "max": 170.0,
    "base": 26.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 170.0,
    "max": 180.0,
    "base": 27.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 180.0,
    "max": 190.0,
    "base": 28.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 190.0,
    "max": 200.0,
    "base": 29.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 200.0,
    "max": 210.0,
    "base": 30.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 210.0,
    "max": 220.0,
    "base": 31.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 220.0,
    "max": 230.0,
    "base": 32.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 230.0,
    "max": 240.0,
    "base": 33.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 240.0,
    "max": 250.0,
    "base": 34.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 250.0,
    "max": 260.0,
    "base": 35.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 260.0,
    "max": 270.0,
    "base": 36.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 270.0,
    "max": 280.0,
    "base": 37.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 280.0,
    "max": 290.0,
    "base": 38.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 290.0,
    "max": 300.0,
    "base": 39.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 300.0,
    "max": 310.0,
    "base": 40.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 310.0,
    "max": 320.0,
    "base": 41.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 320.0,
    "max": 330.0,
    "base": 42.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 330.0,
    "max": 340.0,
    "base": 43.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 340.0,
    "max": 350.0,
    "base": 44.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 350.0,
    "max": 360.0,
    "base": 45.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 360.0,
    "max": 370.0,
    "base": 46.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 370.0,
    "max": 380.0,
    "base": 47.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 380.0,
    "max": 390.0,
    "base": 48.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 390.0,
    "max": 400.0,
    "base": 49.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 400.0,
    "max": 410.0,
    "base": 50.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 410.0,
    "max": 420.0,
    "base": 51.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 420.0,
    "max": 430.0,
    "base": 52.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 430.0,
    "max": 440.0,
    "base": 53.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 440.0,
    "max": 450.0,
    "base": 54.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 450.0,
    "max": 460.0,
    "base": 55.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 460.0,
    "max": 470.0,
    "base": 56.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 470.0,
    "max": 480.0,
    "base": 57.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 480.0,
    "max": 490.0,
    "base": 58.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 490.0,
    "max": 500.0,
    "base": 59.0,
    "unit": 10.0,
    "rate": 0.1
   },
   {
    "min": 500.0,
    "max": 510.0,
    "base": 60.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 510.0,
    "max": 520.0,
    "base": 62.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 520.0,
    "max": 530.0,
    "base": 64.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 530.0,
    "max": 540.0,
    "base": 66.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 540.0,
    "max": 550.0,
    "base": 68.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 550.0,
    "max": 560.0,
    "base": 70.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 560.0,
    "max": 570.0,
    "base": 72.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 570.0,
    "max": 580.0,
    "base": 74.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 580.0,
    "max": 590.0,
    "base": 76.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 590.0,
    "max": 600.0,
    "base": 78.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 600.0,
    "max": 610.0,
    "base": 80.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 610.0,
    "max": 620.0,
    "base": 82.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 620.0,
    "max": 630.0,
    "base": 84.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 630.0,
    "max": 640.0,
    "base": 86.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 640.0,
    "max": 650.0,
    "base": 88.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 650.0,
    "max": 660.0,
    "base": 90.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 660.0,
    "max": 670.0,
    "base": 92.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 670.0,
    "max": 680.0,
    "base": 94.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 680.0,
    "max": 690.0,
    "base": 96.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 690.0,
    "max": 700.0,
    "base": 98.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 700.0,
    "max": 710.0,
    "base": 100.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 710.0,
    "max": 720.0,
    "base": 102.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 720.0,
    "max": 730.0,
    "base": 104.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 730.0,
    "max": 740.0,
    "base": 106.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 740.0,
    "max": 750.0,
    "base": 108.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 750.0,
    "max": 760.0,
    "base": 110.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 760.0,
    "max": 770.0,
    "base": 112.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 770.0,
    "max": 780.0,
    "base": 114.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 780.0,
    "max": 790.0,
    "base": 116.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 790.0,
    "max": 800.0,
    "base": 118.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 800.0,
    "max": 810.0,
    "base": 120.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 810.0,
    "max": 820.0,
    "base": 122.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 820.0,
    "max": 830.0,
    "base": 124.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 830.0,
    "max": 840.0,
    "base": 126.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 840.0,
    "max": 850.0,
    "base": 128.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 850.0,
    "max": 860.0,
    "base": 130.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 860.0,
    "max": 870.0,
    "base": 132.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 870.0,
    "max": 880.0,
    "base": 134.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 880.0,
    "max": 890.0,
    "base": 136.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 890.0,
    "max": 900.0,
    "base": 138.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 900.0,
    "max": 910.0,
    "base": 140.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 910.0,
    "max": 920.0,
    "base": 142.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 920.0,
    "max": 930.0,
    "base": 144.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 930.0,
    "max": 940.0,
    "base": 146.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 940.0,
    "max": 950.0,
    "base": 148.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 950.0,
    "max": 960.0,
    "base": 150.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 960.0,
    "max": 970.0,
    "base": 152.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 970.0,
    "max": 980.0,
    "base": 154.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 980.0,
    "max": 990.0,
    "base": 156.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 990.0,
    "max": 1000.0,
    "base": 158.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 1000.0,
    "max": 1100.0,
    "base": 160.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1100.0,
    "max": 1200.0,
    "base": 175.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1200.0,
    "max": 1300.0,
    "base": 190.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1300.0,
    "max": 1400.0,
    "base": 205.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1400.0,
    "max": 1500.0,
    "base": 220.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1500.0,
    "max": 1600.0,
    "base": 235.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1600.0,
    "max": 1700.0,
    "base": 250.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1700.0,
    "max": 1800.0,
    "base": 265.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1800.0,
    "max": 1900.0,
    "base": 280.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 1900.0,
    "max": 2000.0,
    "base": 295.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2000.0,
    "max": 2100.0,
    "base": 310.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2100.0,
    "max": 2200.0,
    "base": 325.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2200.0,
    "max": 2300.0,
    "base": 340.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2300.0,
    "max": 2400.0,
    "base": 355.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2400.0,
    "max": 2500.0,
    "base": 370.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2500.0,
    "max": 2600.0,
    "base": 385.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2600.0,
    "max": 2700.0,
    "base": 400.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2700.0,
    "max": 2800.0,
    "base": 415.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2800.0,
    "max": 2900.0,
    "base": 430.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 2900.0,
    "max": 3000.0,
    "base": 445.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3000.0,
    "max": 3100.0,
    "base": 460.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3100.0,
    "max": 3200.0,
    "base": 475.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3200.0,
    "max": 3300.0,
    "base": 490.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3300.0,
    "max": 3400.0,
    "base": 505.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3400.0,
    "max": 3500.0,
    "base": 520.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3500.0,
    "max": 3600.0,
    "base": 535.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3600.0,
    "max": 3700.0,
    "base": 550.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3700.0,
    "max": 3800.0,
    "base": 565.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3800.0,
    "max": 3900.0,
    "base": 580.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 3900.0,
    "max": 4000.0,
    "base": 595.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4000.0,
    "max": 4100.0,
    "base": 610.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4100.0,
    "max": 4200.0,
    "base": 625.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4200.0,
    "max": 4300.0,
    "base": 640.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4300.0,
    "max": 4400.0,
    "base": 655.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4400.0,
    "max": 4500.0,
    "base": 670.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4500.0,
    "max": 4600.0,
    "base": 685.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4600.0,
    "max": 4700.0,
    "base": 700.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4700.0,
    "max": 4800.0,
    "base": 715.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4800.0,
    "max": 4900.0,
    "base": 730.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 4900.0,
    "max": 5000.0,
    "base": 745.0,
    "unit": 100.0,
    "rate": 0.15
   },
   {
    "min": 5000.0,
    "max": 5250.0,
    "base": 760.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 5250.0,
    "max": 5500.0,
    "base": 785.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 5500.0,
    "max": 5750.0,
    "base": 810.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 5750.0,
    "max": 6000.0,
    "base": 835.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 6000.0,
    "max": 6250.0,
    "base": 860.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 6250.0,
    "max": 6500.0,
    "base": 885.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 6500.0,
    "max": 6750.0,
    "base": 910.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 6750.0,
    "max": 7000.0,
    "base": 935.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 7000.0,
    "max": 7250.0,
    "base": 960.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 7250.0,
    "max": 7500.0,
    "base": 985.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 7500.0,
    "max": 7750.0,
    "base": 1010.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 7750.0,
    "max": 8000.0,
    "base": 1035.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 8000.0,
    "max": 8250.0,
    "base": 1060.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 8250.0,
    "max": 8500.0,
    "base": 1085.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 8500.0,
    "max": 8750.0,
    "base": 1110.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 8750.0,
    "max": 9000.0,
    "base": 1135.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 9000.0,
    "max": 9250.0,
    "base": 1160.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 9250.0,
    "max": 9500.0,
    "base": 1185.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 9500.0,
    "max": 9750.0,
    "base": 1210.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 9750.0,
    "max": 10000.0,
    "base": 1235.0,
    "unit": 250.0,
    "rate": 0.1
   },
   {
    "min": 10000.0,
    "max": 10500.0,
    "base": 1260.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 10500.0,
    "max": 11000.0,
    "base": 1300.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 11000.0,
    "max": 11500.0,
    "base": 1340.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 11500.0,
    "max": 12000.0,
    "base": 1380.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 12000.0,
    "max": 12500.0,
    "base": 1420.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 12500.0,
    "max": 13000.0,
    "base": 1460.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 13000.0,
    "max": 13500.0,
    "base": 1500.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 13500.0,
    "max": 14000.0,
    "base": 1540.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 14000.0,
    "max": 14500.0,
    "base": 1580.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 14500.0,
    "max": 15000.0,
    "base": 1620.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 15000.0,
    "max": 15500.0,
    "base": 1660.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 15500.0,
    "max": 16000.0,
    "base": 1700.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 16000.0,
    "max": 16500.0,
    "base": 1740.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 16500.0,
    "max": 17000.0,
    "base": 1780.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 17000.0,
    "max": 17500.0,
    "base": 1820.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 17500.0,
    "max": 18000.0,
    "base": 1860.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 18000.0,
    "max": 18500.0,
    "base": 1900.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 18500.0,
    "max": 19000.0,
    "base": 1940.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 19000.0,
    "max": 19500.0,
    "base": 1980.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 19500.0,
    "max": 20000.0,
    "base": 2020.0,
    "unit": 500.0,
    "rate": 0.08
   },
   {
    "min": 20000.0,
    "max": 21000.0,
    "base": 2060.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 21000.0,
    "max": 22000.0,
    "base": 2110.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 22000.0,
    "max": 23000.0,
    "base": 2160.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 23000.0,
    "max": 24000.0,
    "base": 2210.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 24000.0,
    "max": 25000.0,
    "base": 2260.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 25000.0,
    "max": 26000.0,
    "base": 2310.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 26000.0,
    "max": 27000.0,
    "base": 2360.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 27000.0,
    "max": 28000.0,
    "base": 2410.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 28000.0,
    "max": 29000.0,
    "base": 2460.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 29000.0,
    "max": 30000.0,
    "base": 2510.0,
    "unit": 1000.0,
    "rate": 0.05
   },
   {
    "min": 30000.0,
    "max": 32000.0,
    "base": 2560.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 32000.0,
    "max": 34000.0,
    "base": 2610.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 34000.0,
    "max": 36000.0,
    "base": 2660.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 36000.0,
    "max": 38000.0,
    "base": 2710.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 38000.0,
    "max": 40000.0,
    "base": 2760.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 40000.0,
    "max": 42000.0,
    "base": 2810.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 42000.0,
    "max": 44000.0,
    "base": 2860.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 44000.0,
    "max": 46000.0,
    "base": 2910.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 46000.0,
    "max": 48000.0,
    "base": 2960.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 48000.0,
    "max": 50000.0,
    "base": 3010.0,
    "unit": 2000.0,
    "rate": 0.025
   },
   {
    "min": 50000.0,
    "max": 55000.0,
    "base": 3060.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 55000.0,
    "max": 60000.0,
    "base": 3110.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 60000.0,
    "max": 65000.0,
    "base": 3160.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 65000.0,
    "max": 70000.0,
    "base": 3210.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 70000.0,
    "max": 75000.0,
    "base": 3260.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 75000.0,
    "max": 80000.0,
    "base": 3310.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 80000.0,
    "max": 85000.0,
    "base": 3360.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 85000.0,
    "max": 90000.0,
    "base": 3410.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 90000.0,
    "max": 95000.0,
    "base": 3460.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 95000.0,
    "max": 100000.0,
    "base": 3510.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 100000.0,
    "max": 105000.0,
    "base": 3560.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 105000.0,
    "max": 110000.0,
    "base": 3610.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 110000.0,
    "max": 115000.0,
    "base": 3660.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 115000.0,
    "max": 120000.0,
    "base": 3710.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 120000.0,
    "max": 125000.0,
    "base": 3760.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 125000.0,
    "max": 130000.0,
    "base": 3810.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 130000.0,
    "max": 135000.0,
    "base": 3860.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 135000.0,
    "max": 140000.0,
    "base": 3910.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 140000.0,
    "max": 145000.0,
    "base": 3960.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 145000.0,
    "max": 150000.0,
    "base": 4010.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 150000.0,
    "max": 155000.0,
    "base": 4060.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 155000.0,
    "max": 160000.0,
    "base": 4110.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 160000.0,
    "max": 165000.0,
    "base": 4160.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 165000.0,
    "max": 170000.0,
    "base": 4210.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 170000.0,
    "max": 175000.0,
    "base": 4260.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 175000.0,
    "max": 180000.0,
    "base": 4310.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 180000.0,
    "max": 185000.0,
    "base": 4360.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 185000.0,
    "max": 190000.0,
    "base": 4410.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 190000.0,
    "max": 195000.0,
    "base": 4460.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 195000.0,
    "max": 200000.0,
    "base": 4510.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 200000.0,
    "max": 205000.0,
    "base": 4560.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 205000.0,
    "max": 210000.0,
    "base": 4610.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 210000.0,
    "max": 215000.0,
    "base": 4660.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 215000.0,
    "max": 220000.0,
    "base": 4710.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 220000.0,
    "max": 225000.0,
    "base": 4760.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 225000.0,
    "max": 230000.0,
    "base": 4810.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 230000.0,
    "max": 235000.0,
    "base": 4860.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 235000.0,
    "max": 240000.0,
    "base": 4910.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 240000.0,
    "max": 245000.0,
    "base": 4960.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 245000.0,
    "max": 250000.0,
    "base": 5010.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 250000.0,
    "max": 255000.0,
    "base": 5060.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 255000.0,
    "max": 260000.0,
    "base": 5110.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 260000.0,
    "max": 265000.0,
    "base": 5160.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 265000.0,
    "max": 270000.0,
    "base": 5210.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 270000.0,
    "max": 275000.0,
    "base": 5260.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 275000.0,
    "max": 280000.0,
    "base": 5310.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 280000.0,
    "max": 285000.0,
    "base": 5360.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 285000.0,
    "max": 290000.0,
    "base": 5410.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 290000.0,
    "max": 295000.0,
    "base": 5460.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 295000.0,
    "max": 300000.0,
    "base": 5510.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 300000.0,
    "max": 305000.0,
    "base": 5560.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 305000.0,
    "max": 310000.0,
    "base": 5610.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 310000.0,
    "max": 315000.0,
    "base": 5660.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 315000.0,
    "max": 320000.0,
    "base": 5710.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 320000.0,
    "max": 325000.0,
    "base": 5760.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 325000.0,
    "max": 330000.0,
    "base": 5810.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 330000.0,
    "max": 335000.0,
    "base": 5860.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 335000.0,
    "max": 340000.0,
    "base": 5910.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 340000.0,
    "max": 345000.0,
    "base": 5960.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 345000.0,
    "max": 350000.0,
    "base": 6010.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 350000.0,
    "max": 355000.0,
    "base": 6060.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 355000.0,
    "max": 360000.0,
    "base": 6110.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 360000.0,
    "max": 365000.0,
    "base": 6160.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 365000.0,
    "max": 370000.0,
    "base": 6210.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 370000.0,
    "max": 375000.0,
    "base": 6260.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 375000.0,
    "max": 380000.0,
    "base": 6310.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 380000.0,
    "max": 385000.0,
    "base": 6360.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 385000.0,
    "max": 390000.0,
    "base": 6410.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 390000.0,
    "max": 395000.0,
    "base": 6460.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 395000.0,
    "max": 400000.0,
    "base": 6510.0,
    "unit": 5000.0,
    "rate": 0.01
   },
   {
    "min": 400000.0,
    "max": null,
    "base": 6560.0,
    "unit": 5000.0,
    "rate": 0.01
   }
  ],
  "cap": null,
  "source_url": "https://cdnbbsr.s3waas.gov.in/s3ec03a495eebbfa243b79c5b9b224c482/uploads/2023/05/2023050847.pdf",
  "as_of": "2026-10-06",
  "note": "Full ad-valorem table (280 rows to Rs.4,00,000 -> Rs.6,560, then +Rs.50 per Rs.5,000 or part). Prose cross-check: Rs.100=20/500=60/1,000=160/5,000=760/10,000=1,260. State identity inferred from Odisha govt CDN (cdnbbsr) only - file itself untitled; older 'estate' terminology suggests zamindari-abolition era act. Verify locally. Calculator's Orissa bands (different rates) replaced by this table."
 },
 {
  "slug": "assam",
  "name": "Assam",
  "statute": "Court Fees Act, 1870 as amended in Assam (Assam Act 28 of 1972)",
  "basis": "official_state_amendment",
  "status": "ready",
  "confidence": "medium",
  "bands": [
   {
    "min": 0.0,
    "max": 5.0,
    "base": 0.0,
    "unit": 5.0,
    "rate": 0.11000000000000001
   },
   {
    "min": 5.0,
    "max": 10.0,
    "base": 0.55,
    "unit": 5.0,
    "rate": 0.11000000000000001
   },
   {
    "min": 10.0,
    "max": 15.0,
    "base": 1.1,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 15.0,
    "max": 20.0,
    "base": 1.65,
    "unit": 5.0,
    "rate": 0.11000000000000006
   },
   {
    "min": 20.0,
    "max": 25.0,
    "base": 2.2,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 25.0,
    "max": 30.0,
    "base": 2.75,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 30.0,
    "max": 35.0,
    "base": 3.3,
    "unit": 5.0,
    "rate": 0.11000000000000006
   },
   {
    "min": 35.0,
    "max": 40.0,
    "base": 3.85,
    "unit": 5.0,
    "rate": 0.11000000000000006
   },
   {
    "min": 40.0,
    "max": 45.0,
    "base": 4.4,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 45.0,
    "max": 50.0,
    "base": 4.95,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 50.0,
    "max": 55.0,
    "base": 5.5,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 55.0,
    "max": 60.0,
    "base": 6.05,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 60.0,
    "max": 65.0,
    "base": 6.6,
    "unit": 5.0,
    "rate": 0.11000000000000014
   },
   {
    "min": 65.0,
    "max": 70.0,
    "base": 7.15,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 70.0,
    "max": 75.0,
    "base": 7.7,
    "unit": 5.0,
    "rate": 0.10999999999999996
   },
   {
    "min": 75.0,
    "max": 80.0,
    "base": 8.25,
    "unit": 5.0,
    "rate": 0.11000000000000014
   },
   {
    "min": 80.0,
    "max": 85.0,
    "base": 8.8,
    "unit": 5.0,
    "rate": 0.10999999999999979
   },
   {
    "min": 85.0,
    "max": 90.0,
    "base": 9.35,
    "unit": 5.0,
    "rate": 0.11000000000000014
   },
   {
    "min": 90.0,
    "max": 95.0,
    "base": 9.9,
    "unit": 5.0,
    "rate": 0.10999999999999979
   },
   {
    "min": 95.0,
    "max": 100.0,
    "base": 10.45,
    "unit": 5.0,
    "rate": 0.11000000000000014
   },
   {
    "min": 100.0,
    "max": 110.0,
    "base": 11.0,
    "unit": 10.0,
    "rate": 0.19499999999999992
   },
   {
    "min": 110.0,
    "max": 120.0,
    "base": 12.95,
    "unit": 10.0,
    "rate": 0.19000000000000003
   },
   {
    "min": 120.0,
    "max": 130.0,
    "base": 14.85,
    "unit": 10.0,
    "rate": 0.19500000000000012
   },
   {
    "min": 130.0,
    "max": 140.0,
    "base": 16.8,
    "unit": 10.0,
    "rate": 0.18999999999999986
   },
   {
    "min": 140.0,
    "max": 150.0,
    "base": 18.7,
    "unit": 10.0,
    "rate": 0.18500000000000014
   },
   {
    "min": 150.0,
    "max": 160.0,
    "base": 20.55,
    "unit": 10.0,
    "rate": 0.13999999999999985
   },
   {
    "min": 160.0,
    "max": 170.0,
    "base": 21.95,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 170.0,
    "max": 180.0,
    "base": 23.3,
    "unit": 10.0,
    "rate": 0.13000000000000006
   },
   {
    "min": 180.0,
    "max": 190.0,
    "base": 24.6,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 190.0,
    "max": 200.0,
    "base": 25.9,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 200.0,
    "max": 210.0,
    "base": 27.25,
    "unit": 10.0,
    "rate": 0.13000000000000006
   },
   {
    "min": 210.0,
    "max": 220.0,
    "base": 28.55,
    "unit": 10.0,
    "rate": 0.1349999999999998
   },
   {
    "min": 220.0,
    "max": 230.0,
    "base": 29.9,
    "unit": 10.0,
    "rate": 0.13000000000000006
   },
   {
    "min": 230.0,
    "max": 240.0,
    "base": 31.2,
    "unit": 10.0,
    "rate": 0.13000000000000006
   },
   {
    "min": 240.0,
    "max": 250.0,
    "base": 32.5,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 250.0,
    "max": 260.0,
    "base": 33.85,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 260.0,
    "max": 270.0,
    "base": 35.15,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 270.0,
    "max": 280.0,
    "base": 36.5,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 280.0,
    "max": 290.0,
    "base": 37.8,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 290.0,
    "max": 300.0,
    "base": 39.15,
    "unit": 10.0,
    "rate": 0.13000000000000042
   },
   {
    "min": 300.0,
    "max": 310.0,
    "base": 40.45,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 310.0,
    "max": 320.0,
    "base": 41.75,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 320.0,
    "max": 330.0,
    "base": 43.1,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 330.0,
    "max": 340.0,
    "base": 44.4,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 340.0,
    "max": 350.0,
    "base": 45.75,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 350.0,
    "max": 360.0,
    "base": 47.05,
    "unit": 10.0,
    "rate": 0.13000000000000042
   },
   {
    "min": 360.0,
    "max": 370.0,
    "base": 48.35,
    "unit": 10.0,
    "rate": 0.06499999999999986
   },
   {
    "min": 370.0,
    "max": 380.0,
    "base": 49.0,
    "unit": 10.0,
    "rate": 0.2
   },
   {
    "min": 380.0,
    "max": 390.0,
    "base": 51.0,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 390.0,
    "max": 400.0,
    "base": 52.35,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 400.0,
    "max": 410.0,
    "base": 53.65,
    "unit": 10.0,
    "rate": 0.13000000000000042
   },
   {
    "min": 410.0,
    "max": 420.0,
    "base": 54.95,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 420.0,
    "max": 430.0,
    "base": 56.3,
    "unit": 10.0,
    "rate": 0.13000000000000042
   },
   {
    "min": 430.0,
    "max": 440.0,
    "base": 57.6,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 440.0,
    "max": 450.0,
    "base": 58.95,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 450.0,
    "max": 460.0,
    "base": 60.25,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 460.0,
    "max": 470.0,
    "base": 61.55,
    "unit": 10.0,
    "rate": 0.13500000000000015
   },
   {
    "min": 470.0,
    "max": 480.0,
    "base": 62.9,
    "unit": 10.0,
    "rate": 0.13000000000000042
   },
   {
    "min": 480.0,
    "max": 490.0,
    "base": 64.2,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 490.0,
    "max": 500.0,
    "base": 65.55,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 500.0,
    "max": 510.0,
    "base": 66.85,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 510.0,
    "max": 520.0,
    "base": 68.15,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 520.0,
    "max": 530.0,
    "base": 69.5,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 530.0,
    "max": 540.0,
    "base": 70.8,
    "unit": 10.0,
    "rate": 0.13500000000000084
   },
   {
    "min": 540.0,
    "max": 550.0,
    "base": 72.15,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 550.0,
    "max": 560.0,
    "base": 73.45,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 560.0,
    "max": 570.0,
    "base": 74.75,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 570.0,
    "max": 580.0,
    "base": 76.1,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 580.0,
    "max": 590.0,
    "base": 77.4,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 590.0,
    "max": 600.0,
    "base": 78.75,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 600.0,
    "max": 610.0,
    "base": 80.05,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 610.0,
    "max": 620.0,
    "base": 81.35,
    "unit": 10.0,
    "rate": 0.13500000000000084
   },
   {
    "min": 620.0,
    "max": 630.0,
    "base": 82.7,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 630.0,
    "max": 640.0,
    "base": 84.0,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 640.0,
    "max": 650.0,
    "base": 85.35,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 650.0,
    "max": 660.0,
    "base": 86.65,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 660.0,
    "max": 670.0,
    "base": 87.95,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 670.0,
    "max": 680.0,
    "base": 89.3,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 680.0,
    "max": 690.0,
    "base": 90.6,
    "unit": 10.0,
    "rate": 0.13500000000000084
   },
   {
    "min": 690.0,
    "max": 700.0,
    "base": 91.95,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 700.0,
    "max": 710.0,
    "base": 93.25,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 710.0,
    "max": 720.0,
    "base": 94.6,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 720.0,
    "max": 730.0,
    "base": 95.9,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 730.0,
    "max": 740.0,
    "base": 97.2,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 740.0,
    "max": 750.0,
    "base": 98.55,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 750.0,
    "max": 760.0,
    "base": 99.85,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 760.0,
    "max": 770.0,
    "base": 101.15,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 770.0,
    "max": 780.0,
    "base": 102.5,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 780.0,
    "max": 790.0,
    "base": 103.8,
    "unit": 10.0,
    "rate": 0.13500000000000084
   },
   {
    "min": 790.0,
    "max": 800.0,
    "base": 105.15,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 800.0,
    "max": 810.0,
    "base": 106.45,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 810.0,
    "max": 820.0,
    "base": 107.75,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 820.0,
    "max": 830.0,
    "base": 109.1,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 830.0,
    "max": 840.0,
    "base": 110.4,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 840.0,
    "max": 850.0,
    "base": 111.75,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 850.0,
    "max": 860.0,
    "base": 113.05,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 860.0,
    "max": 870.0,
    "base": 114.35,
    "unit": 10.0,
    "rate": 0.13500000000000084
   },
   {
    "min": 870.0,
    "max": 880.0,
    "base": 115.7,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 880.0,
    "max": 890.0,
    "base": 117.0,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 890.0,
    "max": 900.0,
    "base": 118.35,
    "unit": 10.0,
    "rate": 0.13000000000000114
   },
   {
    "min": 900.0,
    "max": 910.0,
    "base": 119.65,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 910.0,
    "max": 920.0,
    "base": 120.95,
    "unit": 10.0,
    "rate": 0.13499999999999943
   },
   {
    "min": 920.0,
    "max": 930.0,
    "base": 122.3,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 930.0,
    "max": 940.0,
    "base": 123.6,
    "unit": 10.0,
    "rate": 0.13500000000000084
   },
   {
    "min": 940.0,
    "max": 950.0,
    "base": 124.95,
    "unit": 10.0,
    "rate": 0.12999999999999973
   },
   {
    "min": 950.0,
    "max": 1000.0,
    "base": 126.25,
    "unit": 10.0,
    "rate": 0.13999999999999999
   },
   {
    "min": 1000.0,
    "max": 7500.0,
    "base": 133.25,
    "unit": 100.0,
    "rate": 0.0825
   },
   {
    "min": 7500.0,
    "max": 10000.0,
    "base": 669.5,
    "unit": 250.0,
    "rate": 0.066
   },
   {
    "min": 10000.0,
    "max": 20000.0,
    "base": 834.5,
    "unit": 500.0,
    "rate": 0.0495
   },
   {
    "min": 20000.0,
    "max": 50000.0,
    "base": 1329.5,
    "unit": 1000.0,
    "rate": 0.033
   },
   {
    "min": 50000.0,
    "max": null,
    "base": 2319.5,
    "unit": 5000.0,
    "rate": 0.00825
   }
  ],
  "cap": 11000.0,
  "source_url": "https://www.indiacode.nic.in (Court Fees Act 1870 consolidated - Assam amendment blocks)",
  "as_of": "2026-10-06",
  "note": "Table of Rates (state amendment) up to Rs.950 (Rs.0.55 -> Rs.126.25), continued with Act 28/1972 article-1 clause rates above Rs.950 (Rs.1.40/10 to Rs.1,000; Rs.8.25/100 to Rs.7,500; Rs.16.50/250 to Rs.10,000; Rs.24.75/500 to Rs.20,000; Rs.33/1,000 to Rs.50,000; Rs.41.25/5,000 above), anchored at fee Rs.126.25. Max fee Rs.11,000. Table and 1972 prose differ ~4% in the Rs.150-950 band; hybrid used. Verify locally."
 },
 {
  "slug": "goa",
  "name": "Goa",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "Goa Court Fees Act 2024 identified (indiacode.nic.in unreachable during research)"
 },
 {
  "slug": "chhattisgarh",
  "name": "Chhattisgarh",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "arunachal-pradesh",
  "name": "Arunachal Pradesh",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "manipur",
  "name": "Manipur",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "meghalaya",
  "name": "Meghalaya",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "mizoram",
  "name": "Mizoram",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "nagaland",
  "name": "Nagaland",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "sikkim",
  "name": "Sikkim",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "tripura",
  "name": "Tripura",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "puducherry",
  "name": "Puducherry",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "ladakh",
  "name": "Ladakh",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "State court-fees text not retrieved"
 },
 {
  "slug": "andaman-and-nicobar-islands",
  "name": "Andaman & Nicobar Islands",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "Union territory court-fees text not retrieved"
 },
 {
  "slug": "lakshadweep",
  "name": "Lakshadweep",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "Union territory court-fees text not retrieved"
 },
 {
  "slug": "dadra-nagar-haveli-and-daman-and-diu",
  "name": "Dadra & Nagar Haveli and Daman & Diu",
  "statute": "Court Fees Act, 1870 (as amended by the State)",
  "basis": "none",
  "status": "unknown",
  "confidence": "none",
  "bands": [],
  "cap": null,
  "source_url": null,
  "as_of": "2026-10-06",
  "note": "Union territory court-fees text not retrieved"
 }
];
