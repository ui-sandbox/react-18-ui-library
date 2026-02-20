import React, { useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface ChipSelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export type ChipSelectSize = 'sm' | 'md' | 'lg'

export interface ChipSelectProps {
  options: ChipSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
  maxSelect?: number
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: ChipSelectSize
  className?: string
  fullWidth?: boolean
}

const sizeClasses: Record<ChipSelectSize, string> = {
  sm: 'px-2.5 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-sm gap-2',
}

export function ChipSelect({
  options,
  value = [],
  onChange,
  multiple = true,
  maxSelect,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  size = 'md',
  className,
  fullWidth = true,
}: ChipSelectProps) {
  const id = useId()

  const isSelected = (val: string) => value.includes(val)

  const toggle = (val: string) => {
    if (disabled) return
    const opt = options.find((o) => o.value === val)
    if (opt?.disabled) return

    if (multiple) {
      if (isSelected(val)) {
        onChange?.(value.filter((v) => v !== val))
      } else {
        if (maxSelect && value.length >= maxSelect) return
        onChange?.([...value, val])
      }
    } else {
      onChange?.(isSelected(val) ? [] : [val])
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label id={id} className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div
        role="group"
        aria-labelledby={label ? id : undefined}
        className={cn(
          'flex flex-wrap gap-2',
          disabled && 'opacity-60 pointer-events-none'
        )}
      >
        {options.map((opt) => {
          const selected = isSelected(opt.value)
          const atMax = !selected && !!maxSelect && value.length >= maxSelect
          const isDisabled = opt.disabled || atMax

          return (
            <button
              key={opt.value}
              type="button"
              role="checkbox"
              aria-checked={selected}
              disabled={isDisabled}
              onClick={() => toggle(opt.value)}
              className={cn(
                'inline-flex items-center rounded-full border font-medium transition-all',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1',
                sizeClasses[size],
                selected
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-surface text-text border-border hover:border-primary/50 hover:bg-primary/5',
                isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              {opt.icon && (
                <span className={cn('flex-shrink-0', selected ? 'text-primary-foreground' : 'text-text-muted')}>
                  {opt.icon}
                </span>
              )}
              <span>{opt.label}</span>
              {selected && <Check size={12} className="flex-shrink-0" />}
            </button>
          )
        })}
      </div>

      {maxSelect && (
        <p className="text-xs text-text-muted">
          {value.length} of {maxSelect} selected
        </p>
      )}

      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
