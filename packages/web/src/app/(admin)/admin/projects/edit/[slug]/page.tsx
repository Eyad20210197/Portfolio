import { getProjectBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import ProjectEditForm from "@/components/admin/projects/ProjectEditForm";
import { cache } from "react";
import { Metadata } from "next";
import { Technology } from "@/lib/types";

type Props = {
  params: { slug: string };
};

// Using cache to deduplicate fetch requests across the component tree
const getCachedProject = cache(async (slug: string) => {
  try {
    const project = await getProjectBySlug(slug);
    return project;
  } catch (error) {
    notFound();
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getCachedProject(params.slug);
  return {
    title: `Edit Project: ${project.title}`,
  };
}

export default async function EditProjectPage({ params }: Props) {
  const project = await getCachedProject(params.slug);

  const formattedProject = {
    ...project,
    technologies: project.technologies?.map((pt: { technology: Technology }) => pt.technology).filter(Boolean) ?? [],
    case_study: project.case_study ?? null,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectEditForm project={formattedProject} />
    </div>
  );
}