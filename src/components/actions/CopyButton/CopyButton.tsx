import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type CopyButtonSize = 'sm' | 'md' | 'lg'
export type CopyButtonVariant = 'ghost' | 'outline' | 'solid'

export interface CopyButtonProps {
  value: string
  size?: CopyButtonSize
  variant?: CopyButtonVariant
  label?: string
  copiedLabel?: string
  timeout?: number
  onCopy?: (value: string) => void
  className?: string
  disabled?: boolean
}

const sizeClasses: Record<CopyButtonSize, string> = {
  sm: 'h-7 px-2 text-xs gap-1',
  md: 'h-8 px-2.5 text-sm gap-1.5',
  lg: 'h-10 px-3 text-sm gap-2',
}

const iconSize: Record<CopyButtonSize, number> = { sm: 12, md: 14, lg: 16 }

const variantClasses: Record<CopyButtonVariant, string> = {
  ghost: 'bg-transparent hover:bg-surface-hover text-text-muted hover:text-text',
  outline: 'border border-border bg-transparent hover:bg-surface-hover text-text-muted hover:text-text',
  solid: 'bg-surface-hover hover:bg-surface-active text-text border border-border',
}

export function CopyButton({
  value,
  size = 'md',
  variant = 'ghost',
  label,
  copiedLabel = 'Copied!',
  timeout = 2000,
  onCopy,
  className,
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (disabled || copied) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopy?.(value)
      setTimeout(() => setCopied(false), timeout)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      onCopy?.(value)
      setTimeout(() => setCopied(false), timeout)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      aria-label={copied ? copiedLabel : (label ?? 'Copy to clipboard')}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus/40',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        copied && 'text-success',
        className
      )}
    >
      {copied ? (
        <>
          <Check size={iconSize[size]} />
          {label && <span>{copiedLabel}</span>}
        </>
      ) : (
        <>
          <Copy size={iconSize[size]} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  )
}
