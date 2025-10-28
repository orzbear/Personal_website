export type WritingCategory = "ai-data" | "political-science" | "policy-writing";

export interface Writing {
  id: string;
  title: string;
  date: string;            // ISO: "2025-10-01"
  summary: string;
  category: WritingCategory;
  tags?: string[];
  readTime?: string;       // e.g. "6 min"
  link?: string;           // external or internal
}
