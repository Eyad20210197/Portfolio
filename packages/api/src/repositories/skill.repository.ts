import prisma from '../database';
import { Prisma } from '@prisma/client';

class SkillRepository {
  async findMany() {
    return await prisma.skill.findMany();
  }

  async findById(id: string) {
    return await prisma.skill.findUnique({ where: { id } });
  }

  async create(data: Prisma.SkillCreateInput) {
    return await prisma.skill.create({ data });
  }

  async update(id: string, data: Prisma.SkillUpdateInput) {
    return await prisma.skill.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.skill.delete({ where: { id } });
  }
}

export default new SkillRepository();
