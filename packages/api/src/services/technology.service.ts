import technologyRepository from '../repositories/technology.repository';
import { Prisma } from '@prisma/client';

class TechnologyService {
  async getAllTechnologies() {
    return await technologyRepository.findMany();
  }

  async getTechnologyById(id: string) {
    return await technologyRepository.findById(id);
  }

  async createTechnology(data: Prisma.TechnologyCreateInput) {
    return await technologyRepository.create(data);
  }

  async updateTechnology(id: string, data: Prisma.TechnologyUpdateInput) {
    return await technologyRepository.update(id, data);
  }

  async deleteTechnology(id: string) {
    return await technologyRepository.delete(id);
  }
}

export default new TechnologyService();
