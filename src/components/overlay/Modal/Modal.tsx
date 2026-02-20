import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  showClose?: boolean
  closeOnOverlayClick?: boolean
  children?: React.ReactNode
  trigger?: React.ReactNode
  className?: string
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
}

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  footer,
  size = 'md',
  showClose = true,
  closeOnOverlayClick = true,
  children,
  trigger,
  className,
}: ModalProps) {
  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}

      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            'fixed inset-0 bg-overlay z-modal',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
          )}
          onClick={closeOnOverlayClick ? undefined : (e) => e.stopPropagation()}
        />

        <RadixDialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full bg-surface rounded-lg shadow-xl border border-border',
            'flex flex-col z-modal',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'focus:outline-none',
            sizeClasses[size],
            className
          )}
        >
          {/* Header */}
          {(title || showClose) && (
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border flex-shrink-0">
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
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </RadixDialog.Close>
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-auto px-6 py-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex-shrink-0 px-6 py-4 border-t border-border">{footer}</div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
