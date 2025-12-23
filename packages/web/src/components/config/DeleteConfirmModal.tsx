'use client'
import React from 'react'
import type { SiteConfig } from '@/lib/types'

export default function DeleteConfirmModal({
  item,
  onCancel,
  onConfirm,
  loading,
}: {
  item: SiteConfig
  onCancel: () => void
  onConfirm: () => void
  loading?: boolean
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.35)',
        zIndex: 70,
      }}
    >
      <div style={{ background: '#fff', padding: 20, borderRadius: 8, width: 420 }}>
        <h3 style={{ marginTop: 0 }}>Confirm delete</h3>
        <p>
          Are you sure you want to delete <strong>{item.key}</strong>?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <button onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ color: '#b00020' }} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}