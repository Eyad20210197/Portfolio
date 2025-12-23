import { Router } from 'express';
import caseStudyController from '../../controllers/caseStudy.controller';

const router = Router();

router.get('/case-studies/:slug', caseStudyController.getCaseStudyByProjectSlug);

export default router;
