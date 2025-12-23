import { RequestHandler } from 'express';
import skillService from '../services/skill.service';
import {
  createSkillSchema,
  updateSkillSchema,
  getSkillByIdSchema,
} from '../schemas/skill.schema';
import { ExtractedParams, ExtractedBody } from '../types/express-zod-helpers'; // Import from shared types

class SkillController {
  getAllSkills: RequestHandler = async (req, res) => {
    try {
      const skills = await skillService.getAllSkills();
      res.status(200).json(skills);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching skills', error: error.message });
    }
  };

  getSkillById: RequestHandler<ExtractedParams<typeof getSkillByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const skill = await skillService.getSkillById(id);
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.status(200).json(skill);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching skill by ID', error: error.message });
    }
  };

  createSkill: RequestHandler<{}, {}, ExtractedBody<typeof createSkillSchema>> = async (req, res) => {
    try {
      const skill = await skillService.createSkill(req.body);
      res.status(201).json(skill);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating skill', error: error.message });
    }
  };

  updateSkill: RequestHandler<ExtractedParams<typeof updateSkillSchema>, {}, ExtractedBody<typeof updateSkillSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      const skill = await skillService.updateSkill(id, req.body);
      res.status(200).json(skill);
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating skill', error: error.message });
    }
  };

  deleteSkill: RequestHandler<ExtractedParams<typeof getSkillByIdSchema>> = async (req, res) => {
    try {
      const { id } = req.params;
      await skillService.deleteSkill(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting skill', error: error.message });
    }
  };
}

export default new SkillController();
