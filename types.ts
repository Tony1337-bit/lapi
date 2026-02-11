export type DocBlock = 
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language?: string; title?: string }
  | { type: 'list'; items: string[] }
  | { type: 'header'; header: string[] }
  | { type: 'subheader'; content: string }
  | { type: 'table'; items: { header: string[]; rows: string[][] } };

export interface DocSection {
  id: string;
  title: string;
  description?: string;
  blocks: DocBlock[];
}

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export interface SearchResult {
  id: string;
  title: string;
  preview: string;
  score?: number;
}