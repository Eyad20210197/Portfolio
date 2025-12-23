'use client'
import React, { useEffect, useState } from 'react'
import type { SiteConfig } from '@/types'

type Props = {
  initial?: SiteConfig | null
  onSubmit: (payload: { key: string; value: string }) => Promise<void> | void
  onClose: () => void
  submitting?: boolean
}

export default function SiteConfigForm({
  initial,
  onSubmit,
  onClose,
  submitting,
}: Props) {
  const isEditMode = !!initial

  const [key, setKey] = useState(initial?.key ?? '')
  const [value, setValue] = useState(initial?.value ?? '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setKey(initial?.key ?? '')
    setValue(initial?.value ?? '')
    setError(null)
  }, [initial])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!key.trim()) {
      setError('Key is required')
      return
    }

    try {
      await onSubmit({ key: key.trim(), value })
    } catch (err: any) {
      setError(err?.message ?? 'Submit failed')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={submit}
        className="bg-white rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? 'Edit Site Config' : 'Create New Site Config'}
        </h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Key</label>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isEditMode}
            className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
            placeholder="home.hero.title"
          />
          {isEditMode && (
            <p className="text-xs text-gray-500 mt-1">
              Key cannot be changed after creation
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Value</label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
