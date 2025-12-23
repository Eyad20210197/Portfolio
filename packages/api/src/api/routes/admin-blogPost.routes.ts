import { Router } from 'express';
import blogPostController from '../../controllers/blogPost.controller';
import { isAdmin } from '../../middleware/auth';
import validate from '../../middleware/validation.middleware';
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  getBlogPostByIdSchema,
} from '../../schemas/blogPost.schema';

const router = Router();

router.use(isAdmin); // All routes in this file are protected by isAdmin middleware

router.get('/blog', blogPostController.getAllBlogPostsAdmin);
router.get('/blog/:id', validate(getBlogPostByIdSchema), blogPostController.getBlogPostById);
router.post('/blog', validate(createBlogPostSchema), blogPostController.createBlogPost);
router.put('/blog/:id', validate(updateBlogPostSchema), blogPostController.updateBlogPost);
router.delete('/blog/:id', validate(getBlogPostByIdSchema), blogPostController.deleteBlogPost); // Re-use getBlogPostByIdSchema for param validation

export default router;