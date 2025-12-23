"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProjectAdmin, getAllTechnologiesAdmin } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Technology } from '@/types'; // Import Technology type

const NewProjectPage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [solutionSummary, setSolutionSummary] = useState('');
  const [outcome, setOutcome] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [allTechnologies, setAllTechnologies] = useState<Technology[]>([]);
  const [selectedTechnologyIds, setSelectedTechnologyIds] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loadingTechnologies, setLoadingTechnologies] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllTechnologiesAdmin()
      .then(data => {
        setAllTechnologies(data);
        setLoadingTechnologies(false);
      })
      .catch(() => {
        setError('Failed to load technologies.');
        setLoadingTechnologies(false);
      });
  }, []);

  const handleTechnologyChange = (techId: string) => {
    setSelectedTechnologyIds(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const newProject = {
      title,
      slug,
      short_description: shortDescription,
      problem_statement: problemStatement,
      solution_summary: solutionSummary,
      outcome,
      github_url: githubUrl || null,
      live_demo_url: liveDemoUrl || null,
      is_visible: isVisible,
      is_featured: isFeatured,
      technology_ids: selectedTechnologyIds, // Pass selected technology IDs
    };

    try {
      await createProjectAdmin(newProject);
      router.push('/admin/projects');
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
  };

  if (loadingTechnologies) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <Textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
          <Textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Solution Summary</label>
          <Textarea value={solutionSummary} onChange={(e) => setSolutionSummary(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Outcome</label>
          <Textarea value={outcome} onChange={(e) => setOutcome(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
          <Input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Live Demo URL</label>
          <Input type="url" value={liveDemoUrl} onChange={(e) => setLiveDemoUrl(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
          <div className="grid grid-cols-2 gap-2">
            {allTechnologies.map(tech => (
              <div key={tech.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`tech-${tech.id}`}
                  checked={selectedTechnologyIds.includes(tech.id)}
                  onChange={() => handleTechnologyChange(tech.id)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`tech-${tech.id}`} className="ml-2 block text-sm text-gray-900">
                  {tech.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible"
            checked={isVisible}
            onCheckedChange={setIsVisible}
          />
          <label htmlFor="is_visible" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Visible
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={isFeatured}
            onCheckedChange={setIsFeatured}
          />
          <label htmlFor="is_featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Featured
          </label>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit">
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectPage;