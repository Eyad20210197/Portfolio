import prisma from '../database';
import { Prisma } from '@prisma/client';

class BlogPostRepository {
  async findMany() {
    return await prisma.blogPost.findMany({ where: { is_published: true }, orderBy: { published_at: 'desc' } });
  }

  async findManyAdmin() {
    return await prisma.blogPost.findMany({ orderBy: { published_at: 'desc' } });
  }

  async findBySlug(slug: string) {
    return await prisma.blogPost.findUnique({ where: { slug, is_published: true } });
  }

  async findById(id: string) {
    return await prisma.blogPost.findUnique({ where: { id } });
  }

  async create(data: Prisma.BlogPostCreateInput) {
    return await prisma.blogPost.create({ data });
  }

  async update(id: string, data: Prisma.BlogPostUpdateInput) {
    return await prisma.blogPost.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.blogPost.delete({ where: { id } });
  }
}

export default new BlogPostRepository();
