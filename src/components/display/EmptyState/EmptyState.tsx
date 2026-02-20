import React from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface EmptyStateProps {
  title?: string
  description?: string
  illustration?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = 'No data found',
  description,
  illustration,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-16 px-6 text-center', className)}>
      {illustration ? (
        <div className="mb-2">{illustration}</div>
      ) : (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-hover text-text-muted">
          {icon ?? <Inbox size={28} />}
        </div>
      )}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="text-base font-semibold text-text">{title}</h3>
        {description && <p className="text-sm text-text-muted">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
