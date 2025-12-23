import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-400 mb-4">{project.short_description}</p>
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300">Technologies:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.technologies.map(pt => (
              <span key={pt.technology.id} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-200">
                {pt.technology.name}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-4">
        {project.github_url && (
          <Link href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
            GitHub
          </Link>
        )}
        {project.live_demo_url && (
          <Link href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
            Live Demo
          </Link>
        )}
        <Link href={`/case-studies/${project.slug}`} className="text-indigo-400 hover:underline">
          Case Study
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;