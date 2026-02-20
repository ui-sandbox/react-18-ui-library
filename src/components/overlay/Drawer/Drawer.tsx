import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface DrawerProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: DrawerSide
  size?: DrawerSize
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  showClose?: boolean
  children?: React.ReactNode
  trigger?: React.ReactNode
  className?: string
}

const sideClasses: Record<DrawerSide, string> = {
  left: 'left-0 top-0 bottom-0 h-full data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  right: 'right-0 top-0 bottom-0 h-full data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  top: 'top-0 left-0 right-0 w-full data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom: 'bottom-0 left-0 right-0 w-full data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
}

const sizeClasses: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: { sm: 'w-64', md: 'w-80', lg: 'w-96', xl: 'w-[32rem]' },
  right: { sm: 'w-64', md: 'w-80', lg: 'w-96', xl: 'w-[32rem]' },
  top: { sm: 'h-48', md: 'h-64', lg: 'h-80', xl: 'h-96' },
  bottom: { sm: 'h-48', md: 'h-64', lg: 'h-80', xl: 'h-96' },
}

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  side = 'right',
  size = 'md',
  title,
  description,
  footer,
  showClose = true,
  children,
  trigger,
  className,
}: DrawerProps) {
  const isVertical = side === 'left' || side === 'right'

  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}

      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            'fixed inset-0 bg-overlay z-sidebar',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
          )}
        />

        <RadixDialog.Content
          className={cn(
            'fixed bg-surface shadow-xl border-border flex flex-col z-sidebar',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:duration-300 data-[state=closed]:duration-200',
            'focus:outline-none',
            sideClasses[side],
            sizeClasses[side][size],
            side === 'left' && 'border-r',
            side === 'right' && 'border-l',
            side === 'top' && 'border-b',
            side === 'bottom' && 'border-t',
            className
          )}
        >
          {/* Header */}
          {(title || showClose) && (
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-border flex-shrink-0">
              <div className="flex-1 min-w-0">
                {title && (
                  <RadixDialog.Title className="text-base font-semibold text-text">
                    {title}
                  </RadixDialog.Title>
                )}
                {description && (
                  <RadixDialog.Description className="text-sm text-text-muted mt-0.5">
                    {description}
                  </RadixDialog.Description>
                )}
              </div>
              {showClose && (
                <RadixDialog.Close asChild>
                  <button
                    type="button"
                    className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                    aria-label="Close drawer"
                  >
                    <X size={16} />
                  </button>
                </RadixDialog.Close>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn('flex-1 overflow-auto p-5')}>{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex-shrink-0 px-5 py-4 border-t border-border">{footer}</div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
