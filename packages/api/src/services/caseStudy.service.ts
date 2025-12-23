import caseStudyRepository from "../repositories/caseStudy.repository";

type CreateCaseStudyInput = {
  projectId: string;
  architecture_overview: string;
  technical_decisions: string;
  challenges: string;
  tradeoffs: string;
  future_improvements: string;
};

class CaseStudyService {
  async getCaseStudyByProjectId(projectId: string) {
    return caseStudyRepository.findByProjectId(projectId);
  }

  async createCaseStudy(input: CreateCaseStudyInput) {
    return caseStudyRepository.create({
      architecture_overview: input.architecture_overview,
      technical_decisions: input.technical_decisions,
      challenges: input.challenges,
      tradeoffs: input.tradeoffs,
      future_improvements: input.future_improvements,
      project: {
        connect: {
          id: input.projectId,
        },
      },
    });
  }

  async updateCaseStudy(id: string, data: any) {
    return caseStudyRepository.update(id, data);
  }

  async deleteCaseStudy(id: string) {
    return caseStudyRepository.delete(id);
  }
}

export default new CaseStudyService();
