import prisma from '../database';
import { Prisma } from '@prisma/client';

class ContentMetricRepository {
  async findOrCreateAndIncrement(entityType: string, entityId: string) {
    return await prisma.contentMetric.upsert({
      where: {
        entity_type_entity_id: {
          entity_type: entityType,
          entity_id: entityId,
        },
      },
      update: {
        view_count: {
          increment: 1,
        },
        last_viewed_at: new Date(),
      },
      create: {
        entity_type: entityType,
        entity_id: entityId,
        view_count: 1,
        last_viewed_at: new Date(),
      },
    });
  }

  async getAllMetrics() {
    return await prisma.contentMetric.findMany();
  }

  async getMetricsByType(entityType: string) {
    return await prisma.contentMetric.findMany({
      where: { entity_type: entityType },
    });
  }
}

export default new ContentMetricRepository();
