"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogPostByIdAdmin, updateBlogPostAdmin } from '@/lib/api';
import { BlogPost } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

const EditBlogPostPage = ({ params }: { params: { blogId: string } }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getBlogPostByIdAdmin(params.blogId)
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load blog post data.');
        setLoading(false);
      });
  }, [params.blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!post) return;

    // Ensure published_at is set if published
    const dataToUpdate = {
      ...post,
      published_at: post.is_published && !post.published_at ? new Date().toISOString() : post.published_at,
    };

    try {
      await updateBlogPostAdmin(post.id, dataToUpdate);
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to update blog post.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!post) return;
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleToggleChange = (checked: boolean) => {
    if (!post) return;
    setPost(prev => ({
      ...prev!,
      is_published: checked,
      published_at: checked && !prev?.published_at ? new Date().toISOString() : prev?.published_at,
    }));
  };

  if (loading) return <p>Loading blog post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Blog post not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post: {post.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <Input type="text" name="title" value={post.title} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <Input type="text" name="slug" value={post.slug} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Summary</label>
          <Textarea name="summary" value={post.summary} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <Textarea name="content" value={post.content} onChange={handleChange} rows={10} required />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={post.is_published}
            onCheckedChange={handleToggleChange}
          />
          <label htmlFor="is_published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Published
          </label>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            Update Blog Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPostPage;
