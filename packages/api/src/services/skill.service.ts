import skillRepository from '../repositories/skill.repository';
import { Prisma } from '@prisma/client';

class SkillService {
  async getAllSkills() {
    return await skillRepository.findMany();
  }

  async getSkillById(id: string) {
    return await skillRepository.findById(id);
  }

  async createSkill(data: Prisma.SkillCreateInput) {
    return await skillRepository.create(data);
  }

  async updateSkill(id: string, data: Prisma.SkillUpdateInput) {
    return await skillRepository.update(id, data);
  }

  async deleteSkill(id: string) {
    return await skillRepository.delete(id);
  }
}

export default new SkillService();
