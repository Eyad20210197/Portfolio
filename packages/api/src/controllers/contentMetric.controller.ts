import { RequestHandler } from "express";
import contentMetricService from "../services/contentMetric.service";

class ContentMetricController {
  // Admin: get all metrics
  getAllContentMetrics: RequestHandler = async (_req, res) => {
    try {
      const metrics = await contentMetricService.getAllContentMetrics();
      res.status(200).json(metrics);
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching content metrics",
        error: error.message,
      });
    }
  };

  // Admin: get metrics by entity type
  getContentMetricsByType: RequestHandler = async (req, res) => {
    const { entityType } = req.params;

    try {
      const metrics = await contentMetricService.getContentMetricsByType(
        entityType.toUpperCase()
      );

      res.status(200).json(metrics);
    } catch (error: any) {
      res.status(500).json({
        message: `Error fetching content metrics for type ${entityType}`,
        error: error.message,
      });
    }
  };
}

export default new ContentMetricController();
