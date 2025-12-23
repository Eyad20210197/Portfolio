import blogPostRepository from '../repositories/blogPost.repository';
import { Prisma } from '@prisma/client';

class BlogPostService {
  async getAllBlogPosts() {
    return await blogPostRepository.findMany();
  }

  async getAllBlogPostsAdmin() {
    return await blogPostRepository.findManyAdmin();
  }

  async getBlogPostBySlug(slug: string) {
    return await blogPostRepository.findBySlug(slug);
  }

  async getBlogPostById(id: string) {
    return await blogPostRepository.findById(id);
  }

  async createBlogPost(data: Prisma.BlogPostCreateInput) {
    return await blogPostRepository.create(data);
  }

  async updateBlogPost(id: string, data: Prisma.BlogPostUpdateInput) {
    return await blogPostRepository.update(id, data);
  }

  async deleteBlogPost(id: string) {
    return await blogPostRepository.delete(id);
  }
}

export default new BlogPostService();
