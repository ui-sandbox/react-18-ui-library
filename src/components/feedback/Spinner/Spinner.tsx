import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface SpinnerProps {
  size?: SpinnerSize
  color?: 'primary' | 'secondary' | 'white' | 'current'
  label?: string
  overlay?: boolean
  className?: string
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  white: 'text-white',
  current: 'text-current',
}

export function Spinner({ size = 'md', color = 'primary', label = 'Loading...', overlay = false, className }: SpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', colorClasses[color], className)}
    >
      <Loader2 size={sizeMap[size]} className="animate-spin" />
      <span className="sr-only">{label}</span>
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-overlay z-modal">
        {spinner}
      </div>
    )
  }

  return spinner
}
