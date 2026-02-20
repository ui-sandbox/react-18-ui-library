import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { AlertTriangle, Info, Trash2, X } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { Button } from '../../inputs/Button/Button'

export type ConfirmVariant = 'default' | 'danger' | 'warning'
type ButtonVariant = 'primary' | 'danger' | 'outline' | 'ghost' | 'secondary' | 'success' | 'link'

export interface ConfirmOptions {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmVariant
}

interface ConfirmState extends ConfirmOptions {
  open: boolean
  resolve: ((value: boolean) => void) | null
}

interface ConfirmDialogContextValue {
  confirm: (options?: ConfirmOptions) => Promise<boolean>
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(null)

export function useConfirm(): (options?: ConfirmOptions) => Promise<boolean> {
  const ctx = useContext(ConfirmDialogContext)
  if (!ctx) {
    throw new Error('useConfirm must be used within a ConfirmDialogProvider')
  }
  return ctx.confirm
}

export interface ConfirmDialogProviderProps {
  children: React.ReactNode
}

const variantConfig: Record<ConfirmVariant, {
  icon: React.ReactNode
  iconBg: string
  confirmVariant: ButtonVariant
  confirmClassName?: string
  defaultTitle: string
  defaultConfirm: string
}> = {
  default: {
    icon: <Info size={20} />,
    iconBg: 'bg-primary/10 text-primary',
    confirmVariant: 'primary',
    defaultTitle: 'Are you sure?',
    defaultConfirm: 'Confirm',
  },
  danger: {
    icon: <Trash2 size={20} />,
    iconBg: 'bg-error/10 text-error',
    confirmVariant: 'danger',
    defaultTitle: 'Delete this item?',
    defaultConfirm: 'Delete',
  },
  warning: {
    icon: <AlertTriangle size={20} />,
    iconBg: 'bg-warning/10 text-warning',
    confirmVariant: 'primary',
    confirmClassName: 'bg-warning hover:bg-warning/90 text-white',
    defaultTitle: 'Are you sure?',
    defaultConfirm: 'Proceed',
  },
}

export function ConfirmDialogProvider({ children }: ConfirmDialogProviderProps) {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    resolve: null,
  })

  const confirm = useCallback((options?: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setState({
        open: true,
        resolve,
        ...options,
      })
    })
  }, [])

  const handleResponse = (value: boolean) => {
    state.resolve?.(value)
    setState((prev) => ({ ...prev, open: false, resolve: null }))
  }

  const variant = state.variant ?? 'default'
  const config = variantConfig[variant]
  const title = state.title ?? config.defaultTitle
  const description = state.description
  const confirmLabel = state.confirmLabel ?? config.defaultConfirm
  const cancelLabel = state.cancelLabel ?? 'Cancel'

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <RadixDialog.Root open={state.open} onOpenChange={(open) => { if (!open) handleResponse(false) }}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm animate-in fade-in-0" />
          <RadixDialog.Content
            className={cn(
              'fixed z-[1001] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-full max-w-md bg-surface rounded-xl shadow-2xl border border-border p-6',
              'animate-in fade-in-0 zoom-in-95'
            )}
            aria-describedby={description ? 'confirm-desc' : undefined}
          >
            <div className="flex items-start gap-4">
              <div className={cn('flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', config.iconBg)}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <RadixDialog.Title className="text-base font-semibold text-text">
                  {title}
                </RadixDialog.Title>
                {description && (
                  <p id="confirm-desc" className="mt-1 text-sm text-text-muted">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleResponse(false)}
                className="flex-shrink-0 text-text-muted hover:text-text transition-colors focus:outline-none"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResponse(false)}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={config.confirmVariant}
                size="sm"
                className={config.confirmClassName}
                onClick={() => handleResponse(true)}
              >
                {confirmLabel}
              </Button>
            </div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </ConfirmDialogContext.Provider>
  )
}

export interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = 'default',
}: ConfirmDialogProps) {
  const config = variantConfig[variant]

  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => { if (!o) onCancel() }}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm animate-in fade-in-0" />
        <RadixDialog.Content
          className={cn(
            'fixed z-[1001] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-md bg-surface rounded-xl shadow-2xl border border-border p-6',
            'animate-in fade-in-0 zoom-in-95'
          )}
          aria-describedby={description ? 'confirm-desc-static' : undefined}
        >
          <div className="flex items-start gap-4">
            <div className={cn('flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', config.iconBg)}>
              {config.icon}
            </div>
            <div className="flex-1 min-w-0">
              <RadixDialog.Title className="text-base font-semibold text-text">
                {title ?? config.defaultTitle}
              </RadixDialog.Title>
              {description && (
                <p id="confirm-desc-static" className="mt-1 text-sm text-text-muted">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onCancel}
              className="flex-shrink-0 text-text-muted hover:text-text transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center justify-end gap-3 mt-6">
            <Button variant="outline" size="sm" onClick={onCancel}>
              {cancelLabel ?? 'Cancel'}
            </Button>
            <Button variant={config.confirmVariant} size="sm" className={config.confirmClassName} onClick={onConfirm}>
              {confirmLabel ?? config.defaultConfirm}
            </Button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
