import { getProjects } from '@/lib/api';
import { MetadataRoute } from 'next';

const URL = 'https://www.eyad.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectEntries: MetadataRoute.Sitemap = projects.map(({ slug, updated_at }) => ({
    url: `${URL}/projects/${slug}`,
    lastModified: new Date(updated_at),
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    {
      url: `${URL}/projects`,
      lastModified: new Date(),
    },
    ...projectEntries,
  ];
}