import { Router } from 'express';
import caseStudyController from '../../controllers/caseStudy.controller';
import { isAdmin } from '../../middleware/auth';
import validate from '../../middleware/validation.middleware';
import {
  createCaseStudySchema,
  updateCaseStudySchema,
  getCaseStudyByProjectIdSchema,
} from '../../schemas/caseStudy.schema';

const router = Router();

router.use(isAdmin); // All routes in this file are protected by isAdmin middleware

// Get case study by project ID (for admin editing)
router.get('/case-studies/project/:projectId', validate(getCaseStudyByProjectIdSchema), caseStudyController.getCaseStudyByProjectId);
router.post('/case-studies', validate(createCaseStudySchema), caseStudyController.createCaseStudy);
router.put('/case-studies/:id', validate(updateCaseStudySchema), caseStudyController.updateCaseStudy);
router.delete('/case-studies/:id', validate(updateCaseStudySchema), caseStudyController.deleteCaseStudy); // Re-use updateCaseStudySchema for param validation

export default router;