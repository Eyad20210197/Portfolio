import { Router } from 'express';
import projectController from '../../controllers/project.controller';
import validate from '../../middleware/validation.middleware';
import { getProjectBySlugSchema } from '../../schemas/project.schema';

const router = Router();

router.get('/projects', projectController.getAllProjects);
router.get('/projects/:slug', validate(getProjectBySlugSchema), projectController.getProjectBySlug);

export default router;