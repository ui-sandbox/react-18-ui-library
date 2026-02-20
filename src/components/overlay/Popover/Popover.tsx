import React from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import { X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'
  | 'top-start' | 'top-end' | 'right-start' | 'right-end'
  | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'

export interface PopoverProps {
  content: React.ReactNode
  children: React.ReactNode
  placement?: PopoverPlacement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showClose?: boolean
  arrow?: boolean
  className?: string
  contentClassName?: string
}

export function Popover({
  content,
  children,
  placement = 'bottom',
  open,
  defaultOpen,
  onOpenChange,
  showClose = false,
  arrow = true,
  className,
  contentClassName,
}: PopoverProps) {
  const [side, align] = placement.split('-') as [RadixPopover.PopoverContentProps['side'], RadixPopover.PopoverContentProps['align']]

  return (
    <RadixPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild className={className}>
        {children}
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align ?? 'center'}
          sideOffset={8}
          className={cn(
            'z-dropdown bg-surface border border-border rounded-lg shadow-lg p-4 max-w-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'focus:outline-none',
            contentClassName
          )}
        >
          {showClose && (
            <RadixPopover.Close asChild>
              <button
                type="button"
                className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                aria-label="Close popover"
              >
                <X size={14} />
              </button>
            </RadixPopover.Close>
          )}
          {content}
          {arrow && <RadixPopover.Arrow className="fill-border" />}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
