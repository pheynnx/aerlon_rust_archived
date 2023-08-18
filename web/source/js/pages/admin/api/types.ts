export interface IPost {
  id: string;
  date: string;
  slug: string;
  title: string;
  series: string;
  categories: string[];
  markdown: string;
  post_snippet: string;
  series_snippet: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
