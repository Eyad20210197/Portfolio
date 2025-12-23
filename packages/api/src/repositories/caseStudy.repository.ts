import prisma from "../database";
import { Prisma } from "@prisma/client";

class CaseStudyRepository {
  async findByProjectId(projectId: string) {
    return prisma.caseStudy.findUnique({
      where: { project_id: projectId },
    });
  }

  async create(data: Prisma.CaseStudyCreateInput) {
    return prisma.caseStudy.create({ data });
  }

  async update(id: string, data: Prisma.CaseStudyUpdateInput) {
    return prisma.caseStudy.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.caseStudy.delete({ where: { id } });
  }
}

export default new CaseStudyRepository();
