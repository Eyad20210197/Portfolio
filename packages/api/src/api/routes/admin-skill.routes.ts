import { Router } from 'express';
import skillController from '../../controllers/skill.controller';
import { isAdmin } from '../../middleware/auth';
import validate from '../../middleware/validation.middleware';
import {
  createSkillSchema,
  updateSkillSchema,
  getSkillByIdSchema,
} from '../../schemas/skill.schema';

const router = Router();

router.use(isAdmin); // All routes in this file are protected by isAdmin middleware

router.get('/skills', skillController.getAllSkills);
router.get('/skills/:id', validate(getSkillByIdSchema), skillController.getSkillById);
router.post('/skills', validate(createSkillSchema), skillController.createSkill);
router.put('/skills/:id', validate(updateSkillSchema), skillController.updateSkill);
router.delete('/skills/:id', validate(getSkillByIdSchema), skillController.deleteSkill); // Re-use getSkillByIdSchema for param validation

export default router;
