import { RequestHandler } from 'express';
import projectService from '../services/project.service';
import contentMetricService from '../services/contentMetric.service';
import {
  createProjectSchema,
  updateProjectSchema,
  getProjectBySlugSchema,
  getProjectByIdSchema,
} from '../schemas/project.schema';
import { ExtractedParams, ExtractedBody } from '../types/express-zod-helpers'; // Import from shared types

class ProjectController {
  getAllProjects: RequestHandler = async (req, res) => {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
  };

  getAllProjectsAdmin: RequestHandler = async (req, res) => {
    try {
      const projects = await projectService.getAllProjectsAdmin();
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching projects for admin', error: error.message });
    }
  };

  getProjectBySlug: RequestHandler<ExtractedParams<typeof getProjectBySlugSchema>> = async (req, res) => {
    try {
      const { slug } = req.params;
      const project = await projectService.getProjectBySlug(slug);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      // Increment view count for the project
      await contentMetricService.incrementContentView('PROJECT', project.id);
      res.status(200).json(project);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
  };

  getProjectById: RequestHandler<ExtractedParams<typeof getProjectByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching project by ID', error: error.message });
    }
  };

  createProject: RequestHandler<{}, {}, ExtractedBody<typeof createProjectSchema>> = async (req, res) => {
    try {
      const { technology_ids, ...projectData } = req.body;
      const project = await projectService.createProject(projectData, technology_ids);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating project', error: error.message });
    }
  };

  updateProject: RequestHandler<ExtractedParams<typeof updateProjectSchema>, {}, ExtractedBody<typeof updateProjectSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const { technology_ids, ...projectData } = req.body;
      const project = await projectService.updateProject(id, projectData, technology_ids);
      res.status(200).json(project);
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating project', error: error.message });
    }
  };

  deleteProject: RequestHandler<ExtractedParams<typeof getProjectByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
  };
}

export default new ProjectController();