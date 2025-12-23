'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProjectAdmin, getAllTechnologiesAdmin } from '@/lib/api'
import { Project, Technology } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'

type Props = {
  project: Project
}

export default function ProjectEditForm({ project }: Props) {
  const router = useRouter()
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [formData, setFormData] = useState({
    ...project,
    technology_ids: project.technologies.map((t) => t.id),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const allTechnologies = await getAllTechnologiesAdmin()
        setTechnologies(allTechnologies)
      } catch (err) {
        console.error('Failed to fetch technologies', err)
        alert('Failed to load technologies for selection.')
      }
    }
    fetchTechnologies()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: keyof Project, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleTechnologyChange = (techId: string) => {
    setFormData((prev) => {
      const newTechIds = prev.technology_ids.includes(techId)
        ? prev.technology_ids.filter((id) => id !== techId)
        : [...prev.technology_ids, techId]
      return { ...prev, technology_ids: newTechIds }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const {
      id,
      created_at,
      updated_at,
      case_study,
      technologies,
      ...updateData
    } = formData
    
    // Ensure technology_ids is part of the payload
    const payload = {
        ...updateData,
        technology_ids: formData.technology_ids
    }

    try {
      await updateProjectAdmin(project.id, payload)
      alert('Project updated successfully!')
      router.push('/admin/projects')
      router.refresh()
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while updating the project.'
      setError(errorMessage)
      console.error(err)
      alert(`Failed to update project: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Textarea
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="problem_statement">Problem Statement</Label>
        <Textarea
          id="problem_statement"
          name="problem_statement"
          value={formData.problem_statement}
          onChange={handleInputChange}
          required
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="solution_summary">Solution Summary</Label>
        <Textarea
          id="solution_summary"
          name="solution_summary"
          value={formData.solution_summary}
          onChange={handleInputChange}
          required
          rows={5}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="outcome">Outcome</Label>
        <Textarea
          id="outcome"
          name="outcome"
          value={formData.outcome}
          onChange={handleInputChange}
          required
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            name="github_url"
            type="url"
            value={formData.github_url ?? ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="live_demo_url">Live Demo URL</Label>
          <Input
            id="live_demo_url"
            name="live_demo_url"
            type="url"
            value={formData.live_demo_url ?? ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Technologies</Label>
        {technologies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {technologies.map((tech) => (
              <div key={tech.id} className="flex items-center gap-2">
                <Checkbox
                  id={`tech-${tech.id}`}
                  checked={formData.technology_ids.includes(tech.id)}
                  onCheckedChange={() => handleTechnologyChange(tech.id)}
                />
                <Label htmlFor={`tech-${tech.id}`}>{tech.name}</Label>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading technologies...</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible"
            checked={formData.is_visible}
            onCheckedChange={(checked) => handleSwitchChange('is_visible', checked)}
          />
          <Label htmlFor="is_visible">Visible</Label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
