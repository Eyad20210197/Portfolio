'use client'
import React from 'react'
import type { SiteConfig } from '@/types'

export default function SiteConfigTable({
  items,
  loading,
  onEdit,
  onDelete,
}: {
  items: SiteConfig[]
  loading: boolean
  onEdit: (item: SiteConfig) => void
  onDelete: (item: SiteConfig) => void
}) {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Key</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Value</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} style={{ padding: 12 }}>
                Loading...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ padding: 12 }}>
                No site config entries yet.
              </td>
            </tr>
          ) : (
            items.map((it) => (
              <tr key={it.id}>
                <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{it.key}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0', whiteSpace: 'pre-wrap' }}>
                  {it.value}
                </td>
                <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>
                <button
                  onClick={() => onEdit(it)}
                   className="text-blue-600 hover:underline"
                  >
                    Edit
                </button>

                  <button onClick={() => onDelete(it)} className="ml-2 text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}