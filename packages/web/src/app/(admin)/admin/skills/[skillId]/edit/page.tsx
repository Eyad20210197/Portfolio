"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSkillByIdAdmin, updateSkillAdmin } from '@/lib/api';
import { Skill } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

const EditSkillPage = ({ params }: { params: { skillId: string } }) => {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const skillCategories = ['Languages', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  useEffect(() => {
    getSkillByIdAdmin(params.skillId)
      .then(data => {
        setSkill(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load skill data.');
        setLoading(false);
      });
  }, [params.skillId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!skill) return;

    if (!skill.category) {
      setError('Category is required.');
      return;
    }

    try {
      await updateSkillAdmin(skill.id, skill);
      router.push('/admin/skills');
    } catch (err: any) {
      setError(err.message || 'Failed to update skill.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!skill) return;
    const { name, value } = e.target;
    setSkill({
      ...skill,
      [name]: value,
    });
  };

  const handleSelectChange = (name: 'category' | 'level', value: string) => {
    if (!skill) return;
    setSkill({
      ...skill,
      [name]: value === '' ? null : value, // Handle null for optional level
    });
  };

  const handleToggleChange = (checked: boolean) => {
    if (!skill) return;
    setSkill(prev => ({
      ...prev!,
      is_visible: checked,
    }));
  };

  if (loading) return <p>Loading skill...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!skill) return <p>Skill not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Skill: {skill.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input type="text" name="name" value={skill.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select onValueChange={(val) => handleSelectChange('category', val)} value={skill.category}>
            <SelectTrigger className="bg-white p-6 rounded-lg shadow-md text-gray-900">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-gray-900 border shadow-md">
              {skillCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Level (Optional)</label>
          <Select onValueChange={(val) => handleSelectChange('level', val)} value={skill.level || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {skillLevels.map(lvl => (
                <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible"
            checked={skill.is_visible}
            onCheckedChange={handleToggleChange}
          />
          <label htmlFor="is_visible" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Visible
          </label>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            Update Skill
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSkillPage;
