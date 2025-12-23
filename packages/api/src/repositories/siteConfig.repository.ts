import prisma from "../database";
import { Prisma } from "@prisma/client";

class SiteConfigRepository {
  findMany() {
    return prisma.siteConfig.findMany();
  }

  findById(id: string) {
    return prisma.siteConfig.findUnique({ where: { id } });
  }

  findByKey(key: string) {
    return prisma.siteConfig.findUnique({ where: { key } });
  }

  create(data: Prisma.SiteConfigCreateInput) {
    return prisma.siteConfig.create({ data });
  }

  update(id: string, data: Prisma.SiteConfigUpdateInput) {
    return prisma.siteConfig.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.siteConfig.delete({ where: { id } });
  }
}

export default new SiteConfigRepository();
