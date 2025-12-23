import { getProjects } from '@/lib/api';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Grid } from 'lucide-react';

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Selected work, experiments, and real-world builds.
        </p>
      </header>

      {projects.length === 0 ? (
        <EmptyState
          message="No projects found."
          icon={<Grid className="w-16 h-16 text-gray-500" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;
