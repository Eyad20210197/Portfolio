import { RequestHandler } from 'express';
import technologyService from '../services/technology.service';
import {
  createTechnologySchema,
  updateTechnologySchema,
  getTechnologyByIdSchema,
} from '../schemas/technology.schema';
import { ExtractedParams, ExtractedBody } from '../types/express-zod-helpers'; // Import from shared types

class TechnologyController {
  getAllTechnologies: RequestHandler = async (req, res) => {
    try {
      const technologies = await technologyService.getAllTechnologies();
      res.status(200).json(technologies);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching technologies', error: error.message });
    }
  };

  getTechnologyById: RequestHandler<ExtractedParams<typeof getTechnologyByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const technology = await technologyService.getTechnologyById(id);
      if (!technology) {
        return res.status(404).json({ message: 'Technology not found' });
      }
      res.status(200).json(technology);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching technology by ID', error: error.message });
    }
  };

  createTechnology: RequestHandler<{}, {}, ExtractedBody<typeof createTechnologySchema>> = async (req, res) => {
    try {
      const technology = await technologyService.createTechnology(req.body);
      res.status(201).json(technology);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating technology', error: error.message });
    }
  };

  updateTechnology: RequestHandler<ExtractedParams<typeof updateTechnologySchema>, {}, ExtractedBody<typeof updateTechnologySchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const technology = await technologyService.updateTechnology(id, req.body);
      res.status(200).json(technology);
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating technology', error: error.message });
    }
  };

  deleteTechnology: RequestHandler<ExtractedParams<typeof getTechnologyByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      await technologyService.deleteTechnology(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting technology', error: error.message });
    }
  };
}

export default new TechnologyController();
