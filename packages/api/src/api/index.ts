import { Router } from 'express';
import projectRoutes from './routes/project.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
// import caseStudyRoutes from './routes/caseStudy.routes'; // Removed as public route is now handled via project
import blogPostRoutes from './routes/blogPost.routes';
import siteConfigRoutes from './routes/siteConfig.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use(projectRoutes);
// router.use(caseStudyRoutes); // Removed
router.use(blogPostRoutes);
router.use(siteConfigRoutes);

export default router;