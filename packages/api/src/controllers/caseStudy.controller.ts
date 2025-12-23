import { RequestHandler } from "express";
import caseStudyService from "../services/caseStudy.service";
import projectService from "../services/project.service";
import {
  createCaseStudySchema,
  updateCaseStudySchema,
  getCaseStudyByProjectSlugSchema,
  getCaseStudyByProjectIdSchema,
} from "../schemas/caseStudy.schema";
import { ExtractedParams, ExtractedBody } from "../types/express-zod-helpers";

class CaseStudyController {
  // Public
  getCaseStudyByProjectSlug: RequestHandler<
    ExtractedParams<typeof getCaseStudyByProjectSlugSchema>
  > = async (req, res) => {
    const { slug } = req.params;

    const project = await projectService.getProjectBySlug(slug);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const caseStudy = await caseStudyService.getCaseStudyByProjectId(project.id);
    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }

    res.status(200).json(caseStudy);
  };

  // Admin
  getCaseStudyByProjectId: RequestHandler<
    ExtractedParams<typeof getCaseStudyByProjectIdSchema>
  > = async (req, res) => {
    const { projectId } = req.params;

    const caseStudy = await caseStudyService.getCaseStudyByProjectId(projectId);
    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }

    res.status(200).json(caseStudy);
  };

  createCaseStudy: RequestHandler<
    {},
    {},
    ExtractedBody<typeof createCaseStudySchema>
  > = async (req, res) => {
    const caseStudy = await caseStudyService.createCaseStudy({
      projectId: req.body.projectId,
      architecture_overview: req.body.architecture_overview,
      technical_decisions: req.body.technical_decisions,
      challenges: req.body.challenges,
      tradeoffs: req.body.tradeoffs,
      future_improvements: req.body.future_improvements,
    });

    res.status(201).json(caseStudy);
  };

  updateCaseStudy: RequestHandler<
    ExtractedParams<typeof updateCaseStudySchema>,
    {},
    ExtractedBody<typeof updateCaseStudySchema>
  > = async (req, res) => {
    const { id } = req.params;

    const caseStudy = await caseStudyService.updateCaseStudy(id, req.body);
    res.status(200).json(caseStudy);
  };

  deleteCaseStudy: RequestHandler<
    ExtractedParams<typeof updateCaseStudySchema>
  > = async (req, res) => {
    const { id } = req.params;

    await caseStudyService.deleteCaseStudy(id);
    res.status(204).send();
  };
}

export default new CaseStudyController();
