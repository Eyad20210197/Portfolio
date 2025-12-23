import { getProjectBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug).catch(() => notFound());
  return {
    title: `${project.title} | Eyad Aboelftoh`,
    description: project.short_description,
  };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = await getProjectBySlug(params.slug).catch(() => notFound());

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg text-gray-400 mb-8">{project.short_description}</p>
      
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(pt => (
              <span key={pt.technology.id} className="px-3 py-1 bg-blue-600 rounded-full text-sm text-white">
                {pt.technology.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Problem Statement</h2>
          <p>{project.problem_statement}</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-2">Solution Summary</h2>
          <p>{project.solution_summary}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Outcome</h2>
          <p>{project.outcome}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;