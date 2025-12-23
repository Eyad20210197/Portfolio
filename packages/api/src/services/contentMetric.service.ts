import contentMetricRepository from '../repositories/contentMetric.repository';

class ContentMetricService {
  async incrementContentView(entityType: string, entityId: string) {
    return await contentMetricRepository.findOrCreateAndIncrement(entityType, entityId);
  }

  async getAllContentMetrics() {
    return await contentMetricRepository.getAllMetrics();
  }

  async getContentMetricsByType(entityType: string) {
    return await contentMetricRepository.getMetricsByType(entityType);
  }
}

export default new ContentMetricService();
