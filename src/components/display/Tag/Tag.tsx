import React from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const tagVariants = cva(
  'inline-flex items-center gap-1 font-medium rounded-md select-none',
  {
    variants: {
      variant: {
        default: 'bg-surface-hover text-text border border-border',
        primary: 'bg-primary/10 text-primary border border-primary/20',
        success: 'bg-success-bg text-success border border-success/20',
        error: 'bg-error-bg text-error border border-error/20',
        warning: 'bg-warning-bg text-warning border border-warning/20',
        info: 'bg-info-bg text-info border border-info/20',
      },
      size: {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-1',
        lg: 'text-sm px-3 py-1.5',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: false,
    },
  }
)

export interface TagProps extends VariantProps<typeof tagVariants> {
  children: React.ReactNode
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  className?: string
}

export function Tag({ variant, size, rounded, children, icon, removable, onRemove, className }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size, rounded }), className)}>
      {icon && <span className="flex items-center w-3.5 h-3.5">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-black/10 transition-colors ml-0.5"
          aria-label="Remove tag"
        >
          <X size={10} />
        </button>
      )}
    </span>
  )
}
