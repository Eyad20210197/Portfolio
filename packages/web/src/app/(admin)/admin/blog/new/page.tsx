"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPostAdmin } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

const NewBlogPostPage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const newPost = {
      title,
      slug,
      summary,
      content,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null, // Set published_at if published
    };

    try {
      await createBlogPostAdmin(newPost);
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Summary</label>
          <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} required />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <label htmlFor="is_published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Published
          </label>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            Create Blog Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPostPage;
