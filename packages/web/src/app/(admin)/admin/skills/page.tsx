"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllSkillsAdmin, deleteSkillAdmin } from '@/lib/api';
import { Skill } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { Lightbulb } from 'lucide-react';

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllSkillsAdmin()
      .then(data => setSkills(data))
      .catch(() => setError('Failed to load skills.'));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkillAdmin(id);
        setSkills(skills.filter(s => s.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete skill.');
      }
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        <Link href="/admin/skills/new" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          New Skill
        </Link>
      </div>
      {skills.length === 0 ? (
        <EmptyState
          message="No skills defined yet."
          icon={<Lightbulb className="w-16 h-16 text-gray-400" />}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {skills.map((skill: Skill) => (
              <li key={skill.id} className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{skill.name}</h3>
                  <p className="text-gray-600">{skill.category} - {skill.level || 'N/A'} ({skill.is_visible ? 'Visible' : 'Hidden'})</p>
                </div>
                <div className="space-x-4">
                  <Link href={`/admin/skills/${skill.id}/edit`} className="text-indigo-500 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminSkillsPage;
