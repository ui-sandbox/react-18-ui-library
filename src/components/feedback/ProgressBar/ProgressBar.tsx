import React from 'react'
import { cn } from '../../../utils/cn'

export type ProgressVariant = 'primary' | 'success' | 'error' | 'warning' | 'info'
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ProgressBarProps {
  value?: number
  max?: number
  variant?: ProgressVariant
  size?: ProgressSize
  label?: string
  showValue?: boolean
  striped?: boolean
  animated?: boolean
  indeterminate?: boolean
  className?: string
}

const variantClasses: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  error: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-info',
}

const sizeClasses: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
  striped = false,
  animated = false,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-text">{label}</span>}
          {showValue && !indeterminate && (
            <span className="text-xs text-text-muted">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className={cn('w-full bg-surface-hover rounded-full overflow-hidden', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            variantClasses[variant],
            striped && 'bg-stripes',
            indeterminate && 'animate-indeterminate w-1/3',
            !indeterminate && 'transition-[width]'
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
