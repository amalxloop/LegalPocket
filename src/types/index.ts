export type Jurisdiction = 'central' | 'state';
export type ActStatus = 'active' | 'repealed' | 'not-in-force';
export type BookmarkItemType = 'act' | 'section' | 'article' | 'part';
export type CompareStatus = 'verified' | 'pending_verification' | 'repealed';

export interface ActRow {
  id: number;
  slug: string;
  short_title: string;
  year: number;
  act_number: string | null;
  jurisdiction: Jurisdiction;
  category: string;
  status: ActStatus;
  description: string | null;
  last_updated: string | null;
  official_url: string | null;
}

export interface ChapterRow {
  id: number;
  act_id: number;
  number: string;
  title: string;
  display_title: string;
  sort_order: number;
}

export interface SectionRow {
  id: number;
  act_id: number;
  chapter_id: number | null;
  number: string;
  title: string | null;
  body: string;
  summary: string | null;
  sort_order: number;
  last_amended: string | null;
}

export interface PartRow {
  id: number;
  number: string;
  title: string;
  display_title: string;
  sort_order: number;
}

export interface ArticleRow {
  id: number;
  part_id: number;
  number: string;
  title: string | null;
  body: string;
  summary: string | null;
  sort_order: number;
}

export interface ScheduleRow {
  id: number;
  number: string;
  title: string;
  body: string | null;
}

export interface BookmarkRow {
  id: number;
  item_type: BookmarkItemType;
  item_id: number;
  note: string | null;
  created_at: string;
}

export interface CompareSetRow {
  id: number;
  slug: string;
  name: string;
  old_act_id: number;
  new_act_id: number;
  description: string | null;
  relevance: string | null;
}

export interface CompareMappingRow {
  id: number;
  set_id: number;
  old_section: string;
  new_section: string | null;
  description: string | null;
  status: CompareStatus;
  sort_order: number;
}

export interface ActWithCount extends ActRow {
  section_count: number;
}

export interface PartWithCount extends PartRow {
  article_count: number;
}

export type SearchResultType = 'section' | 'article' | 'act';

export interface SearchResultSection {
  type: 'section';
  section: SectionRow;
  actTitle: string;
  actSlug: string;
  highlight: string;
}

export interface SearchResultArticle {
  type: 'article';
  article: ArticleRow;
  partTitle: string;
  highlight: string;
}

export interface SearchResultAct {
  type: 'act';
  act: ActRow;
  highlight: string;
}

export type SearchResult = SearchResultSection | SearchResultArticle | SearchResultAct;

export interface BookmarkedItem {
  bookmarkId: number;
  createdAt: string;
  itemType: BookmarkItemType;
  itemId: number;
  title: string;
  subtitle: string;
  bodyPreview: string | null;
}