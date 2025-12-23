export interface Project {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  problem_statement: string;
  solution_summary: string;
  outcome: string;
  is_featured: boolean;
  is_visible: boolean;
  github_url: string | null;
  live_demo_url: string | null;
  created_at: string;
  updated_at: string;
}


export type SiteConfig = {
  id: string
  key: string
  value: string
}
