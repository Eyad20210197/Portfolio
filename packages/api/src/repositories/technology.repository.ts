import prisma from '../database';
import { Prisma } from '@prisma/client';

class TechnologyRepository {
  async findMany() {
    return await prisma.technology.findMany({ orderBy: { name: 'asc' } });
  }

  async findById(id: string) {
    return await prisma.technology.findUnique({ where: { id } });
  }

  async create(data: Prisma.TechnologyCreateInput) {
    return await prisma.technology.create({ data });
  }

  async update(id: string, data: Prisma.TechnologyUpdateInput) {
    return await prisma.technology.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.technology.delete({ where: { id } });
  }
}

export default new TechnologyRepository();
