import React, { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface CollapsibleProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  icon?: React.ReactNode
  variant?: 'default' | 'bordered' | 'filled'
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  icon,
  variant = 'default',
  className,
  triggerClassName,
  contentClassName,
}: CollapsibleProps) {
  const id = useId()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen

  const toggle = () => {
    if (disabled) return
    const next = !open
    setInternalOpen(next)
    onOpenChange?.(next)
  }

  const variantClasses = {
    default: '',
    bordered: 'border border-border rounded-lg overflow-hidden',
    filled: 'bg-surface rounded-lg overflow-hidden',
  }

  const triggerVariant = {
    default: 'hover:bg-surface-hover rounded-md',
    bordered: 'border-b border-border bg-surface-hover hover:bg-surface-active',
    filled: 'hover:bg-surface-active',
  }

  return (
    <div className={cn(variantClasses[variant], className)}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={toggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left',
          'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus/40',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          triggerVariant[variant],
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="flex-shrink-0 text-text-muted">{icon}</span>}
          <span className="text-sm font-medium text-text truncate">{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            'flex-shrink-0 text-text-muted transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={cn(
          'overflow-hidden transition-all duration-200',
          open ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className={cn('px-3 py-3', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}
