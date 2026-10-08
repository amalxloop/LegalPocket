// PRD 3A: limitation deadline arithmetic. Pure module — no platform imports.
// Calendar-aware (month/year use civil-month arithmetic with end-of-month
// clamping, matching Limitation Act, 1963 s.3 computation of month/year).
// Display of "last day falls on a holiday -> next working day" (ss.4-5) is
// left to the user via the disclaimer; no court calendar is shipped offline.

export type PeriodUnit = 'day' | 'month' | 'year';

const MS_PER_DAY = 86_400_000;

export function addPeriod(
  start: Date,
  value: number,
  unit: PeriodUnit,
): Date {
  const d = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  if (unit === 'day') {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate() + value,
    );
  }
  if (unit === 'month') {
    const targetDay = d.getDate();
    const r = new Date(d.getFullYear(), d.getMonth() + value, 1);
    const lastDay = new Date(
      r.getFullYear(),
      r.getMonth() + 1,
      0,
    ).getDate();
    r.setDate(Math.min(targetDay, lastDay));
    return r;
  }
  const targetDay = d.getDate();
  const r = new Date(d.getFullYear() + value, d.getMonth(), 1);
  const lastDay = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(targetDay, lastDay));
  return r;
}

// "12/10/2026" or "12-10-2026" -> Date (null when invalid/out of range).
export function parseDateInput(input: string): Date | null {
  const m = input.trim().match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  )
    return null;
  return d;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// "12 Oct 2026"
export function formatDate(d: Date): string {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function today(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

export function daysUntil(deadline: Date, from: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(
    deadline.getFullYear(),
    deadline.getMonth(),
    deadline.getDate(),
  );
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}
