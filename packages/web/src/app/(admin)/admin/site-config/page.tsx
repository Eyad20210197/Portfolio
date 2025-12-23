'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SiteConfigTable from '@/components/config/SiteConfigTable'
import SiteConfigForm from '@/components/config/SiteConfigForm'
import DeleteConfirmModal from '@/components/config/DeleteConfirmModal'
import type { SiteConfig } from '@/lib/types'
import {
  getAllSiteConfigAdmin,
  createSiteConfigAdmin,
  updateSiteConfigAdmin,
  deleteSiteConfigAdmin,
} from '@/lib/api'

export default function SiteConfigPage() {
  const router = useRouter()

  const [items, setItems] = useState<SiteConfig[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [editing, setEditing] = useState<SiteConfig | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [deleting, setDeleting] = useState<SiteConfig | null>(null)

  async function fetchAll() {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllSiteConfigAdmin()
      setItems(data)
    } catch {
      setError('Failed to load site config')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  async function handleCreate(payload: { key: string; value: string }) {
    setLoading(true)
    try {
      await createSiteConfigAdmin(payload)
      await fetchAll()
      router.refresh()
      setShowCreate(false)
    } catch {
      setError('Create failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string, payload: { key: string; value: string }) {
    setLoading(true)
    try {
      await updateSiteConfigAdmin(id, payload)
      await fetchAll()
      router.refresh()
      setEditing(null)
    } catch {
      setError('Update failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    try {
      await deleteSiteConfigAdmin(id)
      await fetchAll()
      router.refresh()
      setDeleting(null)
    } catch {
      setError('Delete failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Site Configuration</h1>
        <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
          >
          + New Config
        </button>

      </header>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <SiteConfigTable
        items={items}
        loading={loading}
        onEdit={setEditing}
        onDelete={setDeleting}
      />

      {showCreate && (
        <SiteConfigForm
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
          submitting={loading}
        />
      )}

      {editing && (
        <SiteConfigForm
          initial={editing}
          onClose={() => setEditing(null)}
          onSubmit={(payload) => handleUpdate(editing.id, payload)}
          submitting={loading}
        />
      )}

      {deleting && (
        <DeleteConfirmModal
          item={deleting}
          onCancel={() => setDeleting(null)}
          onConfirm={() => handleDelete(deleting.id)}
          loading={loading}
        />
      )}
    </div>
  )
}