import { getBlogPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug).catch(() => notFound());
  return {
    title: `${post.title} | Blog | Eyad Aboelftoh`,
    description: post.summary,
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post = await getBlogPostBySlug(params.slug).catch(() => notFound());

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        Published on {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'N/A'}
      </p>
      <div className="prose prose-invert lg:prose-xl text-gray-300">
        {/* In a real application, you might use a Markdown renderer here */}
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;
