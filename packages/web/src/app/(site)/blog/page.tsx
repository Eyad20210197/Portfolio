import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/api';
import { BlogPost } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { FileText } from 'lucide-react';

const BlogPage = async () => {
  const posts = await getAllBlogPosts();

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Thoughts, write-ups, and technical insights.
        </p>
      </header>

      {posts.length === 0 ? (
        <EmptyState
          message="No blog posts published yet. Check back soon!"
          icon={<FileText className="w-16 h-16 text-gray-500" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: BlogPost) => (
            <article
              key={post.id}
              className="
                rounded-xl
                border border-white/10
                bg-white/5
                p-6
                hover:bg-white/10
                transition
                flex flex-col justify-between
              "
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-indigo-400 hover:underline text-sm font-medium"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogPage;
