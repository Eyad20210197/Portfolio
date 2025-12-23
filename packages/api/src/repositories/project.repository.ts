import prisma from '../database';
import { Prisma } from '@prisma/client';

class ProjectRepository {
  async findAll() {
    return await prisma.project.findMany({
      where: { is_visible: true },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async findAllAdmin() {
    return await prisma.project.findMany({
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return await prisma.project.findUnique({
      where: { slug },
      include: {
        case_study: true,
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.ProjectCreateInput, technologyIds: string[] = []) {
    return await prisma.project.create({
      data: {
        ...data,
        technologies: {
          create: technologyIds.map((techId) => ({
            technology: {
              connect: { id: techId },
            },
          })),
        },
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput, technologyIds: string[] = []) {
    const currentProject = await prisma.project.findUnique({
      where: { id },
      include: { technologies: true },
    });

    if (!currentProject) {
      throw new Error('Project not found');
    }

    // Disconnect old technologies not in the new list
    const technologiesToDisconnect = currentProject.technologies.filter(
      (pt) => !technologyIds.includes(pt.technology_id)
    );
    // Connect new technologies not in the old list
    const technologiesToConnect = technologyIds.filter(
      (techId) =>
        !currentProject.technologies.some((pt) => pt.technology_id === techId)
    );

    return await prisma.project.update({
      where: { id },
      data: {
        ...data,
        technologies: {
          deleteMany: technologiesToDisconnect.map((pt) => ({
            project_id: id,
            technology_id: pt.technology_id,
          })),
          create: technologiesToConnect.map((techId) => ({
            technology: {
              connect: { id: techId },
            },
          })),
        },
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return await prisma.project.delete({ where: { id } });
  }
}

export default new ProjectRepository();