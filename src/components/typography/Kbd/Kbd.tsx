import React from 'react'
import { cn } from '../../../utils/cn'

export type KbdSize = 'sm' | 'md' | 'lg'

export interface KbdProps {
  children: React.ReactNode
  size?: KbdSize
  className?: string
}

const sizeClasses: Record<KbdSize, string> = {
  sm: 'text-[10px] px-1 py-0.5 min-w-[18px]',
  md: 'text-xs px-1.5 py-0.5 min-w-[22px]',
  lg: 'text-sm px-2 py-1 min-w-[28px]',
}

export function Kbd({ children, size = 'md', className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center rounded border font-mono font-medium',
        'bg-surface-hover border-border text-text-muted',
        'shadow-[0_1px_0_1px_var(--color-border)]',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </kbd>
  )
}
