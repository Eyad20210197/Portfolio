import siteConfigRepository from "../repositories/siteConfig.repository";
import { Prisma } from "@prisma/client";

class SiteConfigService {
  getAll() {
    return siteConfigRepository.findMany();
  }

  getById(id: string) {
    return siteConfigRepository.findById(id);
  }

  getByKey(key: string) {
    return siteConfigRepository.findByKey(key);
  }

  create(data: Prisma.SiteConfigCreateInput) {
    return siteConfigRepository.create(data);
  }

  update(id: string, data: Prisma.SiteConfigUpdateInput) {
    return siteConfigRepository.update(id, data);
  }

  delete(id: string) {
    return siteConfigRepository.delete(id);
  }
}

export default new SiteConfigService();
