"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjectsAdmin } from '@/lib/api';
import { Project } from '@/types';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProjectsAdmin()
      .then(data => setProjects(data))
      .catch(() => setError('Failed to load projects.'));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const res = await fetch(`/api/v1/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        const data = await res.json();
        setError(data.message || 'An error occurred.');
      }
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Link href="/admin/projects/new" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          New Project
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200">
          {projects.map((project: Project) => (
            <li key={project.id} className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-gray-600">{project.is_visible ? 'Visible' : 'Hidden'}</p>
              </div>
              <div className="space-x-4">
                <Link href={`/admin/projects/edit/${project.id}`} className="text-indigo-500 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProjectsPage;