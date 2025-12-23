"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllBlogPostsAdmin, deleteBlogPostAdmin } from '@/lib/api';
import { BlogPost } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { Book } from 'lucide-react';

const AdminBlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllBlogPostsAdmin()
      .then(data => setPosts(data))
      .catch(() => setError('Failed to load blog posts.'));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPostAdmin(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete blog post.');
      }
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Link href="/admin/blog/new" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          New Blog Post
        </Link>
      </div>
      {posts.length === 0 ? (
        <EmptyState
          message="No blog posts available."
          icon={<Book className="w-16 h-16 text-gray-400" />}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {posts.map((post: BlogPost) => (
              <li key={post.id} className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-gray-600">{post.is_published ? 'Published' : 'Draft'}</p>
                </div>
                <div className="space-x-4">
                  <Link href={`/admin/blog/${post.id}/edit`} className="text-indigo-500 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;
