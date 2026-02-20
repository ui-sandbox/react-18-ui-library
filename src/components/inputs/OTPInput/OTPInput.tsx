import React, { useRef, useState, useId } from 'react'
import { cn } from '../../../utils/cn'

export type OTPInputSize = 'sm' | 'md' | 'lg'

export interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  size?: OTPInputSize
  mask?: boolean
  disabled?: boolean
  error?: string
  label?: string
  helperText?: string
  separator?: boolean
  separatorAt?: number[]
  autoFocus?: boolean
  className?: string
}

const sizeClasses: Record<OTPInputSize, string> = {
  sm: 'w-8 h-9 text-sm',
  md: 'w-10 h-11 text-base',
  lg: 'w-12 h-13 text-lg',
}

export function OTPInput({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  size = 'md',
  mask = false,
  disabled = false,
  error,
  label,
  helperText,
  separator = false,
  separatorAt = [],
  autoFocus = false,
  className,
}: OTPInputProps) {
  const id = useId()
  const [internalValue, setInternalValue] = useState('')
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const digits = value.split('').slice(0, length)

  const update = (newVal: string) => {
    if (!isControlled) setInternalValue(newVal)
    onChange?.(newVal)
    if (newVal.length === length) onComplete?.(newVal)
  }

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) return
    const char = raw[raw.length - 1]
    const newDigits = [...digits]
    newDigits[index] = char
    const newVal = newDigits.join('').slice(0, length)
    update(newVal)
    if (index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newDigits = [...digits]
      if (newDigits[index]) {
        newDigits[index] = ''
        update(newDigits.join(''))
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
        const prev = [...digits]
        prev[index - 1] = ''
        update(prev.join(''))
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    update(pasted)
    const focusIdx = Math.min(pasted.length, length - 1)
    inputsRef.current[focusIdx]?.focus()
  }

  const defaultSeparatorAt = separator ? [Math.floor(length / 2) - 1] : separatorAt

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={`${id}-0`} className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {Array.from({ length }).map((_, i) => (
          <React.Fragment key={i}>
            <input
              ref={(el) => { inputsRef.current[i] = el }}
              id={`${id}-${i}`}
              type={mask ? 'password' : 'text'}
              inputMode="numeric"
              maxLength={1}
              value={digits[i] ?? ''}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              disabled={disabled}
              autoFocus={autoFocus && i === 0}
              className={cn(
                'rounded-md border text-center font-mono font-semibold bg-surface text-text',
                'transition-colors outline-none',
                'focus:border-border-focus focus:ring-2 focus:ring-border-focus/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border',
                sizeClasses[size]
              )}
              aria-label={`Digit ${i + 1} of ${length}`}
            />
            {defaultSeparatorAt.includes(i) && (
              <span className="text-text-muted font-bold text-lg select-none">–</span>
            )}
          </React.Fragment>
        ))}
      </div>
      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
