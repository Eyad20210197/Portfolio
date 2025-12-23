import projectRepository from '../repositories/project.repository';
import { Prisma } from '@prisma/client';

class ProjectService {
  async getAllProjects() {
    return await projectRepository.findAll();
  }

  async getAllProjectsAdmin() {
    return await projectRepository.findAllAdmin();
  }

  async getProjectBySlug(slug: string) {
    return await projectRepository.findBySlug(slug);
  }

  async getProjectById(id: string) {
    return await projectRepository.findById(id);
  }

  async createProject(data: Prisma.ProjectCreateInput, technologyIds: string[] = []) {
    return await projectRepository.create(data, technologyIds);
  }

  async updateProject(id: string, data: Prisma.ProjectUpdateInput, technologyIds: string[] = []) {
    return await projectRepository.update(id, data, technologyIds);
  }

  async deleteProject(id: string) {
    return await projectRepository.delete(id);
  }
}

export default new ProjectService();