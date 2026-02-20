import React, { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../utils/cn'
import { Spinner } from '../Spinner/Spinner'

export interface FullScreenLoaderState {
  visible: boolean
  text?: string
  icon?: React.ReactNode
  blur?: boolean
}

export interface FullScreenLoaderControls {
  show: (options?: Partial<Omit<FullScreenLoaderState, 'visible'>>) => void
  hide: () => void
  update: (options: Partial<Omit<FullScreenLoaderState, 'visible'>>) => void
}

const FullScreenLoaderContext = createContext<FullScreenLoaderControls | null>(null)

export interface FullScreenLoaderProviderProps {
  children: React.ReactNode
  defaultText?: string
  defaultBlur?: boolean
}

export function FullScreenLoaderProvider({
  children,
  defaultText = 'Loading…',
  defaultBlur = true,
}: FullScreenLoaderProviderProps) {
  const [state, setState] = useState<FullScreenLoaderState>({
    visible: false,
    text: defaultText,
    blur: defaultBlur,
  })

  const show = useCallback(
    (options?: Partial<Omit<FullScreenLoaderState, 'visible'>>) => {
      setState((prev) => ({
        ...prev,
        ...options,
        text: options?.text ?? defaultText,
        blur: options?.blur ?? defaultBlur,
        visible: true,
      }))
    },
    [defaultText, defaultBlur]
  )

  const hide = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }))
  }, [])

  const update = useCallback(
    (options: Partial<Omit<FullScreenLoaderState, 'visible'>>) => {
      setState((prev) => ({ ...prev, ...options }))
    },
    []
  )

  return (
    <FullScreenLoaderContext.Provider value={{ show, hide, update }}>
      {children}
      <FullScreenLoader {...state} />
    </FullScreenLoaderContext.Provider>
  )
}

export function useFullScreenLoader(): FullScreenLoaderControls {
  const ctx = useContext(FullScreenLoaderContext)
  if (!ctx) {
    throw new Error('useFullScreenLoader must be used within a FullScreenLoaderProvider')
  }
  return ctx
}

export interface FullScreenLoaderProps {
  visible?: boolean
  text?: string
  icon?: React.ReactNode
  blur?: boolean
  className?: string
}

export function FullScreenLoader({
  visible = false,
  text = 'Loading…',
  icon,
  blur = true,
  className,
}: FullScreenLoaderProps) {
  if (!visible) return null

  const content = (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4',
        blur ? 'backdrop-blur-sm bg-background/70' : 'bg-background/80',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface shadow-xl border border-border">
        <div className="text-primary">
          {icon ?? <Spinner size="xl" />}
        </div>
        {text && (
          <p className="text-sm font-medium text-text-muted animate-pulse">{text}</p>
        )}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
