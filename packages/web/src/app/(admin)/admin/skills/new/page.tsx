"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSkillAdmin } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

const NewSkillPage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<string | null>(null); // Optional
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const skillCategories = ['Languages', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!category) {
      setError('Category is required.');
      return;
    }

    const newSkill = {
      name,
      category,
      level,
      is_visible: isVisible,
    };

    try {
      await createSkillAdmin(newSkill);
      router.push('/admin/skills');
    } catch (err: any) {
      setError(err.message || 'Failed to create skill.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Skill</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="bg-white text-gray-900">
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
          <Select onValueChange={setLevel} value={level || ''}>
            <SelectTrigger className="bg-white text-gray-900">
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent className="bg-white text-gray-900 border shadow-md">
              <SelectItem value="">None</SelectItem> {/* Option for null level */}
              {skillLevels.map(lvl => (
                <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible"
            checked={isVisible}
            onCheckedChange={setIsVisible}
          />
          <label htmlFor="is_visible" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Visible
          </label>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            Create Skill
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewSkillPage;
