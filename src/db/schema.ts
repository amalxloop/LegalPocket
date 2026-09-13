export const APP_DB_KEY = 'legalpocket';

export const SCHEMA_VERSION = 1;

export const SCHEMA_DDL = `
CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS acts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  short_title TEXT NOT NULL,
  year INTEGER NOT NULL,
  act_number TEXT,
  jurisdiction TEXT NOT NULL DEFAULT 'central',
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT,
  last_updated TEXT,
  official_url TEXT
);

CREATE TABLE IF NOT EXISTS chapters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  act_id INTEGER NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  display_title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  act_id INTEGER NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE SET NULL,
  number TEXT NOT NULL,
  title TEXT,
  body TEXT NOT NULL,
  summary TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  last_amended TEXT
);

CREATE TABLE IF NOT EXISTS parts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  display_title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  part_id INTEGER NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  number TEXT NOT NULL,
  title TEXT,
  body TEXT NOT NULL,
  summary TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS schedules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_type TEXT NOT NULL,
  item_id INTEGER NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(item_type, item_id)
);

CREATE TABLE IF NOT EXISTS compare_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  old_act_id INTEGER NOT NULL REFERENCES acts(id),
  new_act_id INTEGER NOT NULL REFERENCES acts(id),
  description TEXT,
  relevance TEXT
);

CREATE TABLE IF NOT EXISTS compare_mappings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  set_id INTEGER NOT NULL REFERENCES compare_sets(id) ON DELETE CASCADE,
  old_section TEXT NOT NULL,
  new_section TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending_verification',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sections_act ON sections(act_id);
CREATE INDEX IF NOT EXISTS idx_sections_chapter ON sections(chapter_id);
CREATE INDEX IF NOT EXISTS idx_articles_part ON articles(part_id);
CREATE INDEX IF NOT EXISTS idx_chapters_act ON chapters(act_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_type ON bookmarks(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_mappings_set ON compare_mappings(set_id);
`;

export const SECTIONS_FTS_DDL = `
CREATE VIRTUAL TABLE IF NOT EXISTS sections_fts USING fts5(
  number,
  title,
  body,
  summary,
  content='sections',
  content_rowid='id',
  tokenize='unicode61'
);
`;

export const ARTICLES_FTS_DDL = `
CREATE VIRTUAL TABLE IF NOT EXISTS articles_fts USING fts5(
  number,
  title,
  body,
  summary,
  content='articles',
  content_rowid='id',
  tokenize='unicode61'
);
`;

export const FTS_TRIGGERS_DDL = `
CREATE TRIGGER IF NOT EXISTS sections_ai AFTER INSERT ON sections BEGIN
  INSERT INTO sections_fts(rowid, number, title, body, summary)
  VALUES (new.id, new.number, new.title, new.body, new.summary);
END;

CREATE TRIGGER IF NOT EXISTS sections_ad AFTER DELETE ON sections BEGIN
  INSERT INTO sections_fts(sections_fts, rowid, number, title, body, summary)
  VALUES ('delete', old.id, old.number, old.title, old.body, old.summary);
END;

CREATE TRIGGER IF NOT EXISTS sections_au AFTER UPDATE ON sections BEGIN
  INSERT INTO sections_fts(sections_fts, rowid, number, title, body, summary)
  VALUES ('delete', old.id, old.number, old.title, old.body, old.summary);
  INSERT INTO sections_fts(rowid, number, title, body, summary)
  VALUES (new.id, new.number, new.title, new.body, new.summary);
END;

CREATE TRIGGER IF NOT EXISTS articles_ai AFTER INSERT ON articles BEGIN
  INSERT INTO articles_fts(rowid, number, title, body, summary)
  VALUES (new.id, new.number, new.title, new.body, new.summary);
END;

CREATE TRIGGER IF NOT EXISTS articles_ad AFTER DELETE ON articles BEGIN
  INSERT INTO articles_fts(articles_fts, rowid, number, title, body, summary)
  VALUES ('delete', old.id, old.number, old.title, old.body, old.summary);
END;

CREATE TRIGGER IF NOT EXISTS articles_au AFTER UPDATE ON articles BEGIN
  INSERT INTO articles_fts(articles_fts, rowid, number, title, body, summary)
  VALUES ('delete', old.id, old.number, old.title, old.body, old.summary);
  INSERT INTO articles_fts(rowid, number, title, body, summary)
  VALUES (new.id, new.number, new.title, new.body, new.summary);
END;
`;