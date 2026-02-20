import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface StatProps {
  label: string
  value: React.ReactNode
  delta?: number
  deltaLabel?: string
  icon?: React.ReactNode
  iconBg?: 'primary' | 'success' | 'error' | 'warning' | 'info'
  description?: string
  loading?: boolean
  className?: string
}

const iconBgClasses = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success-bg text-success',
  error: 'bg-error-bg text-error',
  warning: 'bg-warning-bg text-warning',
  info: 'bg-info-bg text-info',
}

export function Stat({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  iconBg = 'primary',
  description,
  loading = false,
  className,
}: StatProps) {
  const isPositive = delta !== undefined && delta > 0
  const isNegative = delta !== undefined && delta < 0

  return (
    <div className={cn('flex flex-col gap-3 p-4 rounded-lg bg-surface border border-border shadow-sm', className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-text-muted">{label}</p>
        {icon && (
          <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0', iconBgClasses[iconBg])}>
            {icon}
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-8 w-24 rounded bg-surface-hover animate-pulse" />
          <div className="h-4 w-16 rounded bg-surface-hover animate-pulse" />
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-text">{value}</p>

          {delta !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  isPositive && 'text-success',
                  isNegative && 'text-error',
                  !isPositive && !isNegative && 'text-text-muted'
                )}
              >
                {isPositive ? (
                  <TrendingUp size={12} />
                ) : isNegative ? (
                  <TrendingDown size={12} />
                ) : (
                  <Minus size={12} />
                )}
                {Math.abs(delta)}%
              </span>
              {deltaLabel && (
                <span className="text-xs text-text-muted">{deltaLabel}</span>
              )}
            </div>
          )}

          {description && (
            <p className="text-xs text-text-muted">{description}</p>
          )}
        </>
      )}
    </div>
  )
}
