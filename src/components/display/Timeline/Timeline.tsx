import React from 'react'
import { cn } from '../../../utils/cn'

export interface TimelineItem {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  timestamp?: React.ReactNode
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

export interface TimelineProps {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

const variantClasses = {
  default: 'bg-surface-hover text-text-muted border-border',
  success: 'bg-success-bg text-success border-success/30',
  error: 'bg-error-bg text-error border-error/30',
  warning: 'bg-warning-bg text-warning border-warning/30',
  info: 'bg-info-bg text-info border-info/30',
}

const connectorVariant = {
  default: 'bg-border',
  success: 'bg-success/30',
  error: 'bg-error/30',
  warning: 'bg-warning/30',
  info: 'bg-info/30',
}

export function Timeline({ items, orientation = 'vertical', className }: TimelineProps) {
  return (
    <ol className={cn('flex', orientation === 'vertical' ? 'flex-col' : 'flex-row', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const variant = item.variant ?? 'default'

        return (
          <li
            key={item.id}
            className={cn(
              'flex',
              orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col items-center flex-1'
            )}
          >
            {/* Icon + connector */}
            <div className={cn('flex flex-shrink-0', orientation === 'vertical' ? 'flex-col items-center' : 'flex-row items-center w-full')}>
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border flex-shrink-0',
                  variantClasses[variant]
                )}
              >
                {item.icon ?? (
                  <span className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    connectorVariant[variant],
                    orientation === 'vertical' ? 'w-0.5 flex-1 my-1 min-h-[1.5rem]' : 'h-0.5 flex-1 mx-1'
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className={cn('pb-6', isLast && 'pb-0', orientation === 'horizontal' && 'text-center mt-2 px-2')}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-sm font-medium text-text">{item.title}</p>
                {item.timestamp && (
                  <span className="text-xs text-text-muted">{item.timestamp}</span>
                )}
              </div>
              {item.description && (
                <p className="text-sm text-text-muted mt-0.5">{item.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
