import { Router } from 'express';
import blogPostController from '../../controllers/blogPost.controller';
import validate from '../../middleware/validation.middleware';
import { getBlogPostBySlugSchema } from '../../schemas/blogPost.schema';

const router = Router();

router.get('/blog', blogPostController.getAllBlogPosts);
router.get('/blog/:slug', validate(getBlogPostBySlugSchema), blogPostController.getBlogPostBySlug);

export default router;
