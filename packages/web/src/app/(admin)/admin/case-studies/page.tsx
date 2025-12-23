"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjectsAdmin, deleteCaseStudyAdmin } from '@/lib/api';
import { Project } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { LayoutDashboard } from 'lucide-react';

const AdminCaseStudiesPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProjectsAdmin()
      .then(data => setProjects(data))
      .catch(() => setError('Failed to load projects.'));
  }, []);

  const handleDelete = async (caseStudyId: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await deleteCaseStudyAdmin(caseStudyId);
        // Refresh projects to reflect the change, or just update state if case_study field is part of Project
        setProjects(prevProjects =>
          prevProjects.map(p =>
            p.case_study && p.case_study.id === caseStudyId
              ? { ...p, case_study: undefined } // Remove case study from project
              : p
          )
        );
      } catch (err: any) {
        setError(err.message || 'Failed to delete case study.');
      }
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (projects.length === 0) return (
    <EmptyState
      message="No projects available to create or edit case studies for."
      icon={<LayoutDashboard className="w-16 h-16 text-gray-400" />}
    />
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Case Studies</h2>
      <div className="bg-white rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200">
          {projects.map((project: Project) => (
            <li key={project.id} className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-gray-600">Project Slug: {project.slug}</p>
                {project.case_study && (
                  <p className="text-gray-500 text-sm">Case Study Exists</p>
                )}
              </div>
              <div className="space-x-4">
                <Link href={`/admin/case-studies/${project.id}/edit`} className="text-indigo-500 hover:underline">
                  {project.case_study ? 'Edit Case Study' : 'Create Case Study'}
                </Link>
                {project.case_study && (
                  <button onClick={() => handleDelete(project.case_study!.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCaseStudiesPage;
