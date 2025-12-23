import {
  Project,
  CaseStudy,
  BlogPost,
  Technology,
  Skill,
  SiteConfig,
  
} from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const authFetch = (url: string, options: RequestInit = {}) =>
  fetch(url, {
    ...options,
    credentials: "include",
  });

// Public Project API calls
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}

export async function getProjectBySlug(slug: string): Promise<any> {
  const res = await fetch(`${API_URL}/projects/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  return res.json();
}

// Admin Project API calls
export async function getProjectsAdmin(): Promise<Project[]> {
  const res = await authFetch(`${API_URL}/admin/projects`);
  if (!res.ok) {
    throw new Error("Failed to fetch projects for admin");
  }
  return res.json();
}

export async function getProjectByIdAdmin(id: string): Promise<Project> {
  const res = await authFetch(`${API_URL}/admin/projects/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch project by ID for admin");
  }
  return res.json();
}

export async function createProjectAdmin(
  projectData: Omit<
    Project,
    "id" | "created_at" | "updated_at" | "case_study" | "technologies"
  > & { technology_ids?: string[] }
): Promise<Project> {
  const res = await authFetch(`${API_URL}/admin/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) {
    throw new Error("Failed to create project");
  }
  return res.json();
}

export async function updateProjectAdmin(
  id: string,
  projectData: Partial<Omit<Project, "case_study" | "technologies">> & {
    technology_ids?: string[];
  }
): Promise<Project> {
  const res = await authFetch(`${API_URL}/admin/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) {
    throw new Error("Failed to update project");
  }
  return res.json();
}

export async function deleteProjectAdmin(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/admin/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}

// Admin Case Study API calls
export async function getCaseStudyByProjectIdAdmin(
  projectId: string
): Promise<CaseStudy> {
  const res = await authFetch(`${API_URL}/admin/case-studies/project/${projectId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch case study by project ID for admin");
  }
  return res.json();
}

export async function createCaseStudyAdmin(
  caseStudyData: Omit<CaseStudy, "id" | "created_at" | "updated_at">
): Promise<CaseStudy> {
  const res = await authFetch(`${API_URL}/admin/case-studies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(caseStudyData),
  });
  if (!res.ok) {
    throw new Error("Failed to create case study");
  }
  return res.json();
}

export async function updateCaseStudyAdmin(
  id: string,
  caseStudyData: Partial<CaseStudy>
): Promise<CaseStudy> {
  const res = await authFetch(`${API_URL}/admin/case-studies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(caseStudyData),
  });
  if (!res.ok) {
    throw new Error("Failed to update case study");
  }
  return res.json();
}

export async function deleteCaseStudyAdmin(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/admin/case-studies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete case study");
  }
}

// Public Blog Post API calls
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const res = await authFetch(`${API_URL}/blog`);
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  return res.json();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const res = await authFetch(`${API_URL}/blog/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }
  return res.json();
}

// Admin Blog Post API calls
export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  const res = await authFetch(`${API_URL}/admin/blog`);
  if (!res.ok) {
    throw new Error("Failed to fetch all blog posts for admin");
  }
  return res.json();
}

export async function getBlogPostByIdAdmin(id: string): Promise<BlogPost> {
  const res = await authFetch(`${API_URL}/admin/blog/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch blog post by ID for admin");
  }
  return res.json();
}

export async function createBlogPostAdmin(
  blogPostData: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost> {
  const res = await authFetch(`${API_URL}/admin/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogPostData),
  });
  if (!res.ok) {
    throw new Error("Failed to create blog post");
  }
  return res.json();
}

export async function updateBlogPostAdmin(
  id: string,
  blogPostData: Partial<BlogPost>
): Promise<BlogPost> {
  const res = await authFetch(`${API_URL}/admin/blog/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogPostData),
  });
  if (!res.ok) {
    throw new Error("Failed to update blog post");
  }
  return res.json();
}

export async function deleteBlogPostAdmin(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/admin/blog/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete blog post");
  }
}

// Admin Skill API calls
export async function getAllSkillsAdmin(): Promise<Skill[]> {
  const res = await authFetch(`${API_URL}/admin/skills`);
  if (!res.ok) {
    throw new Error("Failed to fetch all skills for admin");
  }
  return res.json();
}

export async function getSkillByIdAdmin(id: string): Promise<Skill> {
  const res = await authFetch(`${API_URL}/admin/skills/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch skill by ID for admin");
  }
  return res.json();
}

export async function createSkillAdmin(
  skillData: Omit<Skill, "id">
): Promise<Skill> {
  const res = await authFetch(`${API_URL}/admin/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skillData),
  });
  if (!res.ok) {
    throw new Error("Failed to create skill");
  }
  return res.json();
}

export async function updateSkillAdmin(
  id: string,
  skillData: Partial<Skill>
): Promise<Skill> {
  const res = await authFetch(`${API_URL}/admin/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skillData),
  });
  if (!res.ok) {
    throw new Error("Failed to update skill");
  }
  return res.json();
}

export async function deleteSkillAdmin(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/admin/skills/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete skill");
  }
}

// Admin Technology API calls
export async function getAllTechnologiesAdmin(): Promise<Technology[]> {
  const res = await authFetch(`${API_URL}/admin/technologies`);
  if (!res.ok) {
    throw new Error("Failed to fetch all technologies for admin");
  }
  return res.json();
}

export async function getTechnologyByIdAdmin(id: string): Promise<Technology> {
  const res = await authFetch(`${API_URL}/admin/technologies/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch technology by ID for admin");
  }
  return res.json();
}

export async function createTechnologyAdmin(
  techData: Omit<Technology, "id">
): Promise<Technology> {
  const res = await authFetch(`${API_URL}/admin/technologies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(techData),
  });
  if (!res.ok) {
    throw new Error("Failed to create technology");
  }
  return res.json();
}

export async function updateTechnologyAdmin(
  id: string,
  techData: Partial<Technology>
): Promise<Technology> {
  const res = await authFetch(`${API_URL}/admin/technologies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(techData),
  });
  if (!res.ok) {
    throw new Error("Failed to update technology");
  }
  return res.json();
}

export async function deleteTechnologyAdmin(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/admin/technologies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete technology");
  }
}

// Public SiteConfig API calls
export async function getSiteConfigByKey(key: string) {
  const res = await fetch(`${API_URL}/site-config/${key}`);
  if (!res.ok) {
    throw new Error("Failed to fetch site config by key");
  }
  return res.json();
}

// Admin SiteConfig API calls
export async function getAllSiteConfigAdmin(): Promise<SiteConfig[]> {
  const res = await authFetch(`${API_URL}/admin/site-config`);
  if (!res.ok) {
    throw new Error("Failed to fetch all site configurations for admin");
  }
  return res.json();
}

export async function getSiteConfigByIdAdmin(id: string): Promise<SiteConfig> {
  const res = await authFetch(`${API_URL}/admin/site-config/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch site configuration by ID for admin");
  }
  return res.json();
}

export async function createSiteConfigAdmin(
  configData: Omit<SiteConfig, "id">
): Promise<SiteConfig> {
  const res = await authFetch(`${API_URL}/admin/site-config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(configData),
  });
  if (!res.ok) {
    throw new Error("Failed to create site configuration");
  }
  return res.json();
}

export async function updateSiteConfigAdmin(
  id: string,
  configData: Partial<SiteConfig>
): Promise<SiteConfig> {
  const res = await authFetch(`${API_URL}/admin/site-config/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(configData),
  });
  if (!res.ok) {
    throw new Error("Failed to update site configuration");
  }
  return res.json();
}

export async function deleteSiteConfigAdmin(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/admin/site-config/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete site configuration");
  }
}
