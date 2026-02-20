import { useState, useCallback } from 'react'

export interface UseClipboardOptions {
  timeout?: number
  onSuccess?: (value: string) => void
  onError?: (error: Error) => void
}

export interface UseClipboardReturn {
  copied: boolean
  copy: (value: string) => Promise<void>
  reset: () => void
}

export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { timeout = 2000, onSuccess, onError } = options
  const [copied, setCopied] = useState(false)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)

  const reset = useCallback(() => {
    setCopied(false)
    if (timeoutId) clearTimeout(timeoutId)
  }, [timeoutId])

  const copy = useCallback(async (value: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value)
      } else {
        const el = document.createElement('textarea')
        el.value = value
        el.style.position = 'fixed'
        el.style.opacity = '0'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      setCopied(true)
      onSuccess?.(value)
      const id = setTimeout(() => setCopied(false), timeout)
      setTimeoutId(id)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to copy')
      onError?.(error)
    }
  }, [timeout, onSuccess, onError])

  return { copied, copy, reset }
}
