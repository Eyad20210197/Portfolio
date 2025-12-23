'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, XCircle } from 'lucide-react'

interface NotificationProps {
  message: string | null
  type: 'success' | 'error' | null
  onClose: () => void
}

export function Notification({ message, type, onClose }: NotificationProps) {
  if (!message || !type) return null

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100'
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400'
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700'
  const Icon = type === 'success' ? CheckCircle : XCircle

  return (
    <div
      className={cn(
        'rounded-md p-4 mb-4 border',
        bgColor,
        borderColor,
        textColor
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', textColor)} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                `focus:ring-offset-${
                  type === 'success' ? 'green' : 'red'
                }-100`,
                `focus:ring-${type === 'success' ? 'green' : 'red'}-400`,
                'hover:bg-opacity-75'
              )}
            >
              <span className="sr-only">Dismiss</span>
              <XCircle className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
