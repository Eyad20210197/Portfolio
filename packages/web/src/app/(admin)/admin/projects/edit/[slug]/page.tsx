import { getProjectBySlug, getAllTechnologiesAdmin } from "@/lib/api";
import { notFound } from "next/navigation";
import { ProjectEditForm } from "@/components/admin/projects/ProjectEditForm";
import { cache } from "react";

// Using cache to deduplicate fetch requests across the component tree
const getCachedProject = cache(async (slug: string) =>
  getProjectBySlug(slug).catch(() => notFound())
);

export default async function EditProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const projectData = getCachedProject(params.slug);
  const technologiesData = getAllTechnologiesAdmin();

  const [project, technologies] = await Promise.all([
    projectData,
    technologiesData,
  ]);

  return (
    <ProjectEditForm
      project={project}
      technologies={technologies}
    />
  );
}