import { Router } from 'express';
import technologyController from '../../controllers/technology.controller';
import { isAdmin } from '../../middleware/auth';
import validate from '../../middleware/validation.middleware';
import {
  createTechnologySchema,
  updateTechnologySchema,
  getTechnologyByIdSchema,
} from '../../schemas/technology.schema';

const router = Router();

router.use(isAdmin); // All routes in this file are protected by isAdmin middleware

router.get('/technologies', technologyController.getAllTechnologies);
router.get('/technologies/:id', validate(getTechnologyByIdSchema), technologyController.getTechnologyById);
router.post('/technologies', validate(createTechnologySchema), technologyController.createTechnology);
router.put('/technologies/:id', validate(updateTechnologySchema), technologyController.updateTechnology);
router.delete('/technologies/:id', validate(getTechnologyByIdSchema), technologyController.deleteTechnology); // Re-use getTechnologyByIdSchema for param validation

export default router;