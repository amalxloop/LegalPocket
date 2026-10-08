// PRD 3A: court fee evaluation. Pure module — no database or platform imports,
// so scripts/db-verify can exercise the exact code the app runs.

export interface FeeBand {
  min: number;
  max: number | null;
  base: number;
  unit: number | null;
  rate: number;
  k?: number;
  floor?: number;
}

// ceil(value/unit)*unit with a near-integer snap so binary-float noise
// (e.g. 400/50 = 80.00000000000001) never inflates a slab by one unit.
function ceilToMultiple(value: number, unit: number): number {
  const q = value / unit;
  const units =
    Math.abs(q - Math.round(q)) < 1e-9 ? Math.round(q) : Math.ceil(q);
  return units * unit;
}

/**
 * fee(x) for one band:
 *   unit null   -> base + (x - min) * rate                (linear)
 *   k present   -> base + (ceil(x / unit) * unit - k) * rate
 *   otherwise   -> base + ceil((x - min) / unit) * unit * rate
 * then band floor, then jurisdiction cap. Returns null for invalid input
 * (non-positive amount or no covering band).
 */
export function computeCourtFee(
  bands: FeeBand[],
  cap: number | null | undefined,
  amount: number,
): number | null {
  if (!(amount > 0) || bands.length === 0) return null;
  const band = bands.find((b) => b.max == null || amount <= b.max);
  if (!band) return null;

  let fee: number;
  if (band.unit == null) {
    fee = band.base + (amount - band.min) * band.rate;
  } else if (band.k != null) {
    fee = band.base + (ceilToMultiple(amount, band.unit) - band.k) * band.rate;
  } else {
    const covered =
      amount <= band.min ? 0 : ceilToMultiple(amount - band.min, band.unit);
    fee = band.base + covered * band.rate;
  }
  if (band.floor != null && fee < band.floor) fee = band.floor;
  if (cap != null && fee > cap) fee = cap;
  return round2(fee);
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

// "1000000" / "10,00,000" / " 1000000.50 " -> 1000000.5 (null if unparseable)
export function parseAmount(input: string): number | null {
  const cleaned = input.replace(/[,₹\s]/g, '');
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

// Indian digit grouping: 1000000 -> "10,00,000"; drops ".00" for integers.
export function formatINR(n: number): string {
  const fixed = n.toFixed(2);
  const [whole, frac] = fixed.split('.');
  let grouped: string;
  if (whole.length <= 3) {
    grouped = whole;
  } else {
    const last3 = whole.slice(-3);
    const rest = whole.slice(0, -3);
    grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  }
  return frac === '00' ? grouped : `${grouped}.${frac}`;
}
