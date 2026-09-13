# LegalPocket

**Access to justice, free for everyone.** A 100% free, offline-first legal reference app for India — the Constitution, Bare Acts, law comparisons, cross-module search, and a curated legal-update pipeline, all in your pocket.

No login. No ads. No paywall. No backend. Everything runs on-device in a local SQLite database.

> ⚠️ LegalPocket is a free legal-literacy reference app. Content is informational and not a substitute for advice from a lawyer.

---

## Features

### Live now (Phase 1)

- **📜 Constitution of India** — Preamble, all Parts, Articles & 12 Schedules, offline.
- **📚 Bare Acts** — Central statutes with section-wise navigation and "as amended" badges.
- **🔄 Compare Laws** — IPC↔BNS, CrPC↔BNSS, Evidence↔BSA side-by-side.
- **🔍 United Legal Search** — one SQLite FTS5 query across every module (with query expansion for abbreviations like FIR, IPC).
- **⭐ Saved Library** — bookmarks across acts/sections/articles, all in one place.
- **📰 Recent Legal Updates** — amendments, commencements & bill status through a built-in **editorial pipeline**: fetch → review → approve → publish, with a full version-history audit trail (`legislation_updates`, `section_versions`, `act_versions`).

### Roadmap

Forms & Drafts · How-To Guides (SOPs) · RTI module · Police Resources · Guidebooks · Legal Diary · Court Case Tracker

---

## Top-level product constraints

1. **100% free** — no paywall, no ads, no feature gating.
2. **No login** — every feature works instantly with zero sign-up.
3. **No backend** — no hosted database, no server, ₹0 infrastructure.
4. **Offline-first** — all content and personal data live in the on-device SQLite database.
5. **Verifiable** — the data layer is exercised by a real check suite (see *Verifying the data layer*).

---

## Tech stack

- [Expo SDK 57](https://expo.dev) + React Native 0.86 (New Architecture)
- [expo-router](https://docs.expo.dev/router/introduction) (file-based routing, `src/app`)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite) + SQLite FTS5 full-text search
- React 19, TypeScript ~6
- Dark-first native UI (gold on navy), emoji glyphs (no icon-font dependency)

## Getting started

```bash
npm install
npx expo start
```

Then open in Expo Go, an emulator, or a development build (`npm run android` / `npm run ios`).

### Scripts

| Command | What it does |
| --- | --- |
| `npx expo start` | Dev server (Expo Go / dev build) |
| `npm run lint` | ESLint (flat config via `eslint-config-expo`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify:db` | Bootstraps the real schema + seeds and runs 56+ assertions against the data layer |

## Verifying the data layer

The SQLite layer is tested against a real database engine (Node's built-in `node:sqlite`, no mocks) via `scripts/db-verify/`. It creates a fresh DB, applies the production DDL (including FTS + pipeline tables), seeds it with the same code the app uses, and asserts the full lifecycle — reads, search, bookmarks, and the update pipeline (ingest → review → publish → version history):

```bash
npm run verify:db
# SUMMARY: passed: 56, failed: 0
```

## Project layout

```
src/
├── app/                    # expo-router routes (screens)
│   ├── (tabs)/             # Home, Acts, Constitution, Compare, Search, Library, Settings…
│   ├── acts/               # act list + act detail (sections, schedules)
│   ├── updates/            # update feed, detail + editorial inbox
│   └── _layout.tsx         # root stack
├── components/             # shared UI (cards, status badges, empty states)
├── db/
│   ├── schema.ts           # DDL: core, FTS5, pipeline tables; SCHEMA_VERSION
│   ├── database.ts         # open/migrate/seed lifecycle
│   ├── seed/               # MVP content (Constitution, 22 Acts, compare sets, updates)
│   └── repos/              # typed queries per feature
└── theme/                  # colours & spacing
scripts/db-verify/          # Node SQLite verification harness
```

## Content provenance

MVP seed content is **placeholder** text pending official ingestion and editorial verification (India Code / e-Gazette). That work is tracked: sections get `last_amended` stamps, acts get `status` + `last_updated`, and every applied change is recorded in the version tables so the app can audit what it shows and why. Statute text itself is sourced from official public records.

## License

[GNU Affero General Public License v3.0](LICENSE) — the app is free software; you may redistribute and modify it under AGPL-3.0 terms. Network use triggers source availability obligations under AGPL §13.

---

Made for anyone who needs the law in their pocket — free, private, offline.