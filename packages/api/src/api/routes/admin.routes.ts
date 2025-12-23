import { Router } from 'express';
import projectController from '../../controllers/project.controller';
import adminCaseStudyRoutes from './admin-caseStudy.routes';
import adminBlogPostRoutes from './admin-blogPost.routes';
import adminSkillRoutes from './admin-skill.routes';
import adminSiteConfigRoutes from './admin-siteConfig.routes';
import adminContentMetricRoutes from './admin-contentMetric.routes';
import adminTechnologyRoutes from './admin-technology.routes';
import { isAdmin } from '../../middleware/auth';
import validate from '../../middleware/validation.middleware';
import {
  createProjectSchema,
  updateProjectSchema,
  getProjectByIdSchema,
} from '../../schemas/project.schema';

const router = Router();

router.use(isAdmin); // Protect all admin routes

router.use(adminCaseStudyRoutes); // Include admin case study routes
router.use(adminBlogPostRoutes); // Include admin blog post routes
router.use(adminSkillRoutes); // Include admin skill routes
router.use(adminSiteConfigRoutes); // Include admin site config routes
router.use(adminContentMetricRoutes); // Include admin content metric routes
router.use(adminTechnologyRoutes); // Include admin technology routes

router.get('/projects', projectController.getAllProjectsAdmin);
router.get('/projects/:id', validate(getProjectByIdSchema), projectController.getProjectById);
router.post('/projects', validate(createProjectSchema), projectController.createProject);
router.put('/projects/:id', validate(updateProjectSchema), projectController.updateProject);
router.delete('/projects/:id', validate(getProjectByIdSchema), projectController.deleteProject); // Re-use getProjectByIdSchema for param validation

export default router;