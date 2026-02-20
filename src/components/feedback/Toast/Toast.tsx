import React from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { type Toast as ToastData, type ToastPosition } from '../../../hooks/useToast'

const variantClasses = {
  info: 'border-info/30 bg-info-bg text-info',
  success: 'border-success/30 bg-success-bg text-success',
  warning: 'border-warning/30 bg-warning-bg text-warning',
  error: 'border-error/30 bg-error-bg text-error',
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
}

export interface ToastProviderProps {
  toasts: ToastData[]
  onDismiss: (id: string) => void
  position?: ToastPosition
}

export function ToastProvider({ toasts, onDismiss, position = 'bottom-right' }: ToastProviderProps) {
  return (
    <RadixToast.Provider swipeDirection="right">
      {toasts.map((toast) => {
        const variant = toast.variant ?? 'info'
        const IconComponent = icons[variant]

        return (
          <RadixToast.Root
            key={toast.id}
            open
            onOpenChange={(open) => { if (!open) onDismiss(toast.id) }}
            duration={toast.duration}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border shadow-lg w-80 max-w-[calc(100vw-2rem)]',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full',
              variantClasses[variant]
            )}
          >
            <span className="flex-shrink-0 mt-0.5">
              <IconComponent size={16} />
            </span>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <RadixToast.Title className="font-semibold text-sm">
                  {toast.title}
                </RadixToast.Title>
              )}
              {toast.description && (
                <RadixToast.Description className="text-sm opacity-90 mt-0.5">
                  {toast.description}
                </RadixToast.Description>
              )}
            </div>
            <RadixToast.Close asChild>
              <button
                type="button"
                className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded hover:opacity-70 transition-opacity"
                aria-label="Close notification"
              >
                <X size={14} />
              </button>
            </RadixToast.Close>
          </RadixToast.Root>
        )
      })}

      <RadixToast.Viewport
        className={cn(
          'fixed flex flex-col gap-2 z-toast',
          positionClasses[position]
        )}
      />
    </RadixToast.Provider>
  )
}
