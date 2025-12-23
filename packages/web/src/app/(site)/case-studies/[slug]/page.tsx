import { getProjectBySlug } from '@/lib/api'; // Only need to fetch project now
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CaseStudyPageProps {
  params: {
    slug: string; // This is the project slug
  };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug).catch(() => notFound());
  if (!project.case_study) notFound(); // Ensure there is a case study
  return {
    title: `Case Study: ${project.title} | Eyad Aboelftoh`,
    description: `A detailed case study for the project: ${project.title}.`,
  };
}

const CaseStudyPage = async ({ params }: CaseStudyPageProps) => {
  const project = await getProjectBySlug(params.slug).catch(() => notFound());
  
  // Now caseStudy is nested within the project
  const caseStudy = project.case_study;

  if (!caseStudy) {
    notFound(); // If no case study exists for this project, show 404
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{project.title}: Case Study</h1>
      <p className="text-lg text-gray-400 mb-8">{project.short_description}</p>

      <div className="prose prose-invert lg:prose-xl max-w-none">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-3">Architecture Overview</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.architecture_overview}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Technical Decisions</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.technical_decisions}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Challenges</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.challenges}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Tradeoffs</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.tradeoffs}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Future Improvements</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.future_improvements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
