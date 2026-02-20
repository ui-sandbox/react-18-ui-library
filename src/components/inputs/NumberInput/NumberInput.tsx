import React, { useId, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type NumberInputSize = 'sm' | 'md' | 'lg'

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'type'> {
  value?: number
  defaultValue?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  prefix?: string
  suffix?: string
  label?: string
  helperText?: string
  error?: string
  size?: NumberInputSize
  fullWidth?: boolean
  hideControls?: boolean
  showMaxLength?: boolean
  formatValue?: (value: number) => string
  containerClassName?: string
}

const sizeClasses: Record<NumberInputSize, { input: string; btn: string }> = {
  sm: { input: 'h-8 text-sm px-2.5', btn: 'h-4 w-6' },
  md: { input: 'h-9 text-sm px-3', btn: 'h-[18px] w-7' },
  lg: { input: 'h-11 text-base px-4', btn: 'h-5 w-8' },
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({
    value: controlledValue,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    precision,
    prefix,
    suffix,
    label,
    helperText,
    error,
    size = 'md',
    fullWidth = false,
    hideControls = false,
    showMaxLength = false,
    formatValue,
    disabled,
    required,
    id: externalId,
    containerClassName,
    className,
    ...props
  }, ref) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const [internalValue, setInternalValue] = useState<number | undefined>(defaultValue)
    const [inputStr, setInputStr] = useState(defaultValue !== undefined ? String(defaultValue) : '')

    const value = controlledValue !== undefined ? controlledValue : internalValue
    const sz = sizeClasses[size]

    const clamp = (v: number) => {
      let result = v
      if (min !== undefined) result = Math.max(min, result)
      if (max !== undefined) result = Math.min(max, result)
      if (precision !== undefined) result = parseFloat(result.toFixed(precision))
      return result
    }

    const commit = (v: number | undefined) => {
      setInternalValue(v)
      onChange?.(v)
      setInputStr(v !== undefined ? (formatValue ? formatValue(v) : String(v)) : '')
    }

    const increment = () => {
      const base = value ?? (min ?? 0)
      commit(clamp(base + step))
    }

    const decrement = () => {
      const base = value ?? (min ?? 0)
      commit(clamp(base - step))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      setInputStr(raw)
      const parsed = parseFloat(raw)
      if (raw === '' || raw === '-') {
        setInternalValue(undefined)
        onChange?.(undefined)
      } else if (!isNaN(parsed)) {
        setInternalValue(parsed)
        onChange?.(parsed)
      }
    }

    const handleBlur = () => {
      if (value !== undefined) commit(clamp(value))
      else setInputStr('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!hideControls) {
        if (e.key === 'ArrowUp') { e.preventDefault(); increment(); return }
        if (e.key === 'ArrowDown') { e.preventDefault(); decrement(); return }
      }
      const allowed = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End',
      ]
      if (allowed.includes(e.key)) return
      if (e.ctrlKey || e.metaKey) return
      const isDigit = /^[0-9]$/.test(e.key)
      const isMinus = e.key === '-' && (e.currentTarget.selectionStart === 0) && !e.currentTarget.value.includes('-')
      const isDot = (e.key === '.' || e.key === ',') && !e.currentTarget.value.includes('.')
      if (!isDigit && !isMinus && !isDot) e.preventDefault()
    }

    const displayValue = document.activeElement?.id === id
      ? inputStr
      : value !== undefined
        ? (formatValue ? formatValue(value) : String(value))
        : ''

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text">
            {label}{required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className={cn('relative flex items-center', fullWidth && 'w-full')}>
          {prefix && (
            <span className="absolute left-0 flex items-center justify-center h-full px-2.5 border-r border-border bg-surface-hover rounded-l-md text-sm text-text-muted select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            className={cn(
              'w-full rounded-md border bg-surface text-text placeholder:text-text-muted',
              'transition-colors outline-none',
              'focus:border-border-focus focus:ring-2 focus:ring-border-focus/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border',
              sz.input,
              prefix && 'pl-10',
              (suffix || !hideControls) && 'pr-10',
              className
            )}
            {...props}
          />
          {suffix && hideControls && (
            <span className="absolute right-0 flex items-center justify-center h-full px-2.5 border-l border-border bg-surface-hover rounded-r-md text-sm text-text-muted select-none">
              {suffix}
            </span>
          )}
          {!hideControls && (
            <div className="absolute right-0 flex flex-col h-full border-l border-border rounded-r-md overflow-hidden">
              <button
                type="button"
                tabIndex={-1}
                onClick={increment}
                disabled={disabled || (max !== undefined && (value ?? -Infinity) >= max)}
                className={cn('flex items-center justify-center flex-1 bg-surface-hover hover:bg-surface-active transition-colors disabled:opacity-40 disabled:cursor-not-allowed', sz.btn)}
                aria-label="Increment"
              >
                <ChevronUp size={10} />
              </button>
              <button
                type="button"
                tabIndex={-1}
                onClick={decrement}
                disabled={disabled || (min !== undefined && (value ?? Infinity) <= min)}
                className={cn('flex items-center justify-center flex-1 bg-surface-hover hover:bg-surface-active transition-colors border-t border-border disabled:opacity-40 disabled:cursor-not-allowed', sz.btn)}
                aria-label="Decrement"
              >
                <ChevronDown size={10} />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {error && <p className="text-xs text-error" role="alert">{error}</p>}
            {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
          </div>
          {showMaxLength && props.maxLength !== undefined && (
            <p className={cn('text-xs text-text-muted ml-auto', displayValue.length >= (props.maxLength ?? Infinity) && 'text-error')}>
              {displayValue.length}/{props.maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

NumberInput.displayName = 'NumberInput'
