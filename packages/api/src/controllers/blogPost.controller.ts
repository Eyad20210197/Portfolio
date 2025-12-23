import { RequestHandler } from 'express';
import blogPostService from '../services/blogPost.service';
import contentMetricService from '../services/contentMetric.service';
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  getBlogPostBySlugSchema,
  getBlogPostByIdSchema,
} from '../schemas/blogPost.schema';
import { ExtractedParams, ExtractedBody } from '../types/express-zod-helpers'; // Import from shared types

class BlogPostController {
  getAllBlogPosts: RequestHandler = async (req, res) => {
    try {
      const posts = await blogPostService.getAllBlogPosts();
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
    }
  };

  getAllBlogPostsAdmin: RequestHandler = async (req, res) => {
    try {
      const posts = await blogPostService.getAllBlogPostsAdmin();
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching admin blog posts', error: error.message });
    }
  };

  getBlogPostBySlug: RequestHandler<ExtractedParams<typeof getBlogPostBySlugSchema>> = async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await blogPostService.getBlogPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      // Increment view count for the blog post
      await contentMetricService.incrementContentView('BLOG', post.id);
      res.status(200).json(post);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching blog post', error: error.message });
    }
  };

  getBlogPostById: RequestHandler<ExtractedParams<typeof getBlogPostByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await blogPostService.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json(post);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching blog post by ID', error: error.message });
    }
  };

  createBlogPost: RequestHandler<{}, {}, ExtractedBody<typeof createBlogPostSchema>> = async (req, res) => {
    try {
      const post = await blogPostService.createBlogPost(req.body);
      res.status(201).json(post);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating blog post', error: error.message });
    }
  };

  updateBlogPost: RequestHandler<ExtractedParams<typeof updateBlogPostSchema>, {}, ExtractedBody<typeof updateBlogPostSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await blogPostService.updateBlogPost(id, req.body);
      res.status(200).json(post);
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating blog post', error: error.message });
    }
  };

  deleteBlogPost: RequestHandler<ExtractedParams<typeof getBlogPostByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      await blogPostService.deleteBlogPost(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting blog post', error: error.message });
    }
  };
}

export default new BlogPostController();
