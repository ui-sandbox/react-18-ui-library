import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-full select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border text-text bg-transparent',
        success: 'bg-success-bg text-success',
        error: 'bg-error-bg text-error',
        warning: 'bg-warning-bg text-warning',
        info: 'bg-info-bg text-info',
        ghost: 'bg-surface-hover text-text-muted',
      },
      size: {
        sm: 'text-xs px-1.5 py-0.5 min-w-[1.25rem] h-4',
        md: 'text-xs px-2 py-0.5 min-w-[1.5rem] h-5',
        lg: 'text-sm px-2.5 py-1 min-w-[1.75rem] h-6',
      },
      dot: {
        true: 'w-2 h-2 p-0 min-w-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      dot: false,
    },
  }
)

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children?: React.ReactNode
  className?: string
}

export function Badge({ variant, size, dot, children, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, dot }), className)}>
      {!dot && children}
    </span>
  )
}

export interface BadgeAnchorProps {
  children: React.ReactNode
  badge?: React.ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  className?: string
}

const positionClasses = {
  'top-right': '-top-1 -right-1',
  'top-left': '-top-1 -left-1',
  'bottom-right': '-bottom-1 -right-1',
  'bottom-left': '-bottom-1 -left-1',
}

export function BadgeAnchor({ children, badge, position = 'top-right', className }: BadgeAnchorProps) {
  return (
    <div className={cn('relative inline-flex', className)}>
      {children}
      {badge && (
        <span className={cn('absolute', positionClasses[position])}>
          {badge}
        </span>
      )}
    </div>
  )
}
