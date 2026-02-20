import React, { useState, useRef, useId, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type TagSeparator = 'space' | 'comma' | 'enter'

export interface TagInputProps {
  value?: string[]
  onChange?: (value: string[]) => void
  separator?: TagSeparator[]
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  maxTags?: number
  allowDuplicates?: boolean
  fullWidth?: boolean
  className?: string
}

const SEPARATOR_KEYS: Record<TagSeparator, string[]> = {
  space: [' '],
  comma: [','],
  enter: ['Enter'],
}

export function TagInput({
  value = [],
  onChange,
  separator = ['space', 'comma', 'enter'],
  placeholder = 'Type and press Enter…',
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  maxTags,
  allowDuplicates = false,
  fullWidth = false,
  className,
}: TagInputProps) {
  const id = useId()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const separatorKeys = separator.flatMap((s) => SEPARATOR_KEYS[s])

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag) return
    if (!allowDuplicates && value.includes(tag)) {
      setInputValue('')
      return
    }
    if (maxTags && value.length >= maxTags) return
    onChange?.([...value, tag])
    setInputValue('')
  }

  const removeTag = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (separatorKeys.includes(e.key)) {
      e.preventDefault()
      addTag(inputValue)
      return
    }
    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (separator.includes('comma') && raw.includes(',')) {
      const parts = raw.split(',')
      const last = parts.pop() ?? ''
      parts.forEach((p) => addTag(p))
      setInputValue(last)
    } else if (separator.includes('space') && raw.endsWith(' ')) {
      addTag(raw)
    } else {
      setInputValue(raw)
    }
  }

  const atMax = !!maxTags && value.length >= maxTags

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'flex flex-col gap-2 min-h-[80px] w-full rounded-md border bg-surface px-3 py-2',
          'transition-colors cursor-text',
          'focus-within:border-border-focus focus-within:ring-2 focus-within:ring-border-focus/20',
          disabled && 'opacity-50 cursor-not-allowed',
          error ? 'border-error' : 'border-border'
        )}
      >
        {/* Input row */}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={atMax ? `Max ${maxTags} tags reached` : placeholder}
            disabled={disabled || atMax}
            aria-invalid={!!error}
            className={cn(
              'flex-1 text-sm bg-transparent outline-none text-text placeholder:text-text-muted',
              'disabled:cursor-not-allowed'
            )}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue('')}
              className="text-text-muted hover:text-text focus:outline-none"
              tabIndex={-1}
              aria-label="Clear input"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Divider */}
        {value.length > 0 && (
          <div className="border-t border-border" />
        )}

        {/* Tags area */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {value.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                <span>{tag}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="hover:text-primary/70 focus:outline-none flex-shrink-0"
                    aria-label={`Remove ${tag}`}
                  >
                    <X size={10} />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {maxTags && (
        <p className="text-xs text-text-muted">{value.length} / {maxTags} tags</p>
      )}

      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
