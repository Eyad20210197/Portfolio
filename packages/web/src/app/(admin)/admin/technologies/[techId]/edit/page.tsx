"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTechnologyByIdAdmin, updateTechnologyAdmin } from '@/lib/api';
import { Technology } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const EditTechnologyPage = ({ params }: { params: { techId: string } }) => {
  const [technology, setTechnology] = useState<Technology | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const techCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Languages', 'Tools', 'Other'];

  useEffect(() => {
    getTechnologyByIdAdmin(params.techId)
      .then(data => {
        setTechnology(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load technology data.');
        setLoading(false);
      });
  }, [params.techId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!technology) return;

    if (!technology.category) {
      setError('Category is required.');
      return;
    }

    const dataToUpdate = {
      name: technology.name,
      category: technology.category,
      icon_url: technology.icon_url || null,
    };

    try {
      await updateTechnologyAdmin(technology.id, dataToUpdate);
      router.push('/admin/technologies');
    } catch (err: any) {
      setError(err.message || 'Failed to update technology.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!technology) return;
    const { name, value } = e.target;
    setTechnology({
      ...technology,
      [name]: value,
    });
  };

  const handleSelectChange = (name: 'category', value: string) => {
    if (!technology) return;
    setTechnology({
      ...technology,
      [name]: value,
    });
  };

  if (loading) return <p>Loading technology...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!technology) return <p>Technology not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Technology: {technology.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input type="text" name="name" value={technology.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select onValueChange={(val) => handleSelectChange('category', val)} value={technology.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {techCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Icon URL (Optional)</label>
          <Input type="url" name="icon_url" value={technology.icon_url || ''} onChange={handleChange} />
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            Update Technology
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTechnologyPage;
