import { Router } from 'express';
import contentMetricController from '../../controllers/contentMetric.controller';
import { isAdmin } from '../../middleware/auth';
import validate from '../../middleware/validation.middleware';
import { getContentMetricsByTypeSchema } from '../../schemas/contentMetric.schema';

const router = Router();

router.use(isAdmin); // Protect all admin routes

router.get('/metrics', contentMetricController.getAllContentMetrics);
router.get('/metrics/:entityType', validate(getContentMetricsByTypeSchema), contentMetricController.getContentMetricsByType);

export default router;