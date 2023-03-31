export interface IPost {
  id: string;
  date: string;
  slug: string;
  title: string;
  series: string;
  categories: string[];
  markdown: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
