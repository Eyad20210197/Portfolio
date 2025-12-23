export interface Technology {
  id: string
  name: string
  category: string
  icon_url: string | null
}

export interface CaseStudy {
  id: string
  projectId: string
  architecture_overview: string
  technical_decisions: string
  challenges: string
  tradeoffs: string
  future_improvements: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  slug: string
  title: string
  short_description: string
  problem_statement: string
  solution_summary: string
  outcome: string
  is_featured: boolean
  is_visible: boolean
  github_url: string | null
  live_demo_url: string | null
  created_at: string
  updated_at: string
  technologies: Technology[]
  case_study: CaseStudy | null
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: string | null
  is_visible: boolean
}

export type SiteConfig = {
  id: string
  key: string
  value: string
}
