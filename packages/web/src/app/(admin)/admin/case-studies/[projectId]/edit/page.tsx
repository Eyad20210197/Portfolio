"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjectByIdAdmin, getCaseStudyByProjectIdAdmin, createCaseStudyAdmin, updateCaseStudyAdmin } from '@/lib/api';
import { Project, CaseStudy } from '@/types';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'; // For displaying project title/slug

const EditCaseStudyPage = ({ params }: { params: { projectId: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProject = await getProjectByIdAdmin(params.projectId);
        setProject(fetchedProject);
        // Try to fetch existing case study
        const fetchedCaseStudy = await getCaseStudyByProjectIdAdmin(params.projectId).catch(() => null);
        setCaseStudy(fetchedCaseStudy);
      } catch (err) {
        setError('Failed to load project or case study data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!project) {
      setError('Project data is missing.');
      return;
    }

    const data = {
      project_id: project.id,
      architecture_overview: caseStudy?.architecture_overview || '',
      technical_decisions: caseStudy?.technical_decisions || '',
      challenges: caseStudy?.challenges || '',
      tradeoffs: caseStudy?.tradeoffs || '',
      future_improvements: caseStudy?.future_improvements || '',
    };

    try {
      if (caseStudy?.id) {
        // Update existing case study
        await updateCaseStudyAdmin(caseStudy.id, data);
      } else {
        // Create new case study
        await createCaseStudyAdmin(data);
      }
      router.push('/admin/case-studies');
    } catch (err: any) {
      setError(err.message || 'Failed to save case study.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCaseStudy(prev => ({
      ...prev!, // Assumes prev is not null if we are here
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {caseStudy?.id ? `Edit Case Study for ${project.title}` : `Create Case Study for ${project.title}`}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Title</label>
          <Input type="text" value={project.title} disabled className="bg-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Architecture Overview</label>
          <Textarea
            name="architecture_overview"
            value={caseStudy?.architecture_overview || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Technical Decisions</label>
          <Textarea
            name="technical_decisions"
            value={caseStudy?.technical_decisions || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Challenges</label>
          <Textarea
            name="challenges"
            value={caseStudy?.challenges || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tradeoffs</label>
          <Textarea
            name="tradeoffs"
            value={caseStudy?.tradeoffs || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Future Improvements</label>
          <Textarea
            name="future_improvements"
            value={caseStudy?.future_improvements || ''}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            {caseStudy?.id ? 'Update Case Study' : 'Create Case Study'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCaseStudyPage;
