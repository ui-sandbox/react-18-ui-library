import React, { useId, useRef, useEffect, useCallback } from 'react'
import { cn } from '../../../utils/cn'

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix'> {
  label?: string
  helperText?: string
  error?: string
  prefixIcon?: React.ReactNode
  prefixImage?: string
  suffixIcon?: React.ReactNode
  suffixImage?: string
  autoResize?: boolean
  showCharCount?: boolean
  showMaxLength?: boolean
  maxLength?: number
  fullWidth?: boolean
  containerClassName?: string
  textareaClassName?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      prefixIcon,
      prefixImage,
      suffixIcon,
      suffixImage,
      autoResize = false,
      showCharCount = false,
      showMaxLength = false,
      maxLength,
      fullWidth = false,
      containerClassName,
      textareaClassName,
      value,
      onChange,
      disabled,
      required,
      rows = 3,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const internalRef = useRef<HTMLTextAreaElement>(null)

    const setRef = useCallback(
      (el: HTMLTextAreaElement | null) => {
        ;(internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
      },
      [ref]
    )

    const charCount = value !== undefined ? String(value).length : 0
    const hasPrefix = !!(prefixIcon || prefixImage)
    const hasSuffix = !!(suffixIcon || suffixImage)

    useEffect(() => {
      if (!autoResize || !internalRef.current) return
      const el = internalRef.current
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }, [value, autoResize])

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className={cn('relative', fullWidth && 'w-full')}>
          {hasPrefix && (
            <div className="absolute top-2.5 left-0 flex items-center justify-center w-9 text-text-muted">
              {prefixImage ? (
                <img src={prefixImage} alt="" className="w-4 h-4 object-contain" />
              ) : (
                <span className="flex items-center justify-center w-4 h-4">{prefixIcon}</span>
              )}
            </div>
          )}

          <textarea
            ref={setRef}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
            className={cn(
              'w-full rounded-md border bg-surface text-text placeholder:text-text-muted text-sm',
              'transition-colors outline-none resize-y py-2 px-3',
              'focus:border-border-focus focus:ring-2 focus:ring-border-focus/20',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover',
              error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border',
              hasPrefix && 'pl-9',
              hasSuffix && 'pr-9',
              autoResize && 'resize-none overflow-hidden',
              textareaClassName
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...props}
          />

          {hasSuffix && (
            <div className="absolute top-2.5 right-2 flex items-center justify-center text-text-muted">
              {suffixImage ? (
                <img src={suffixImage} alt="" className="w-4 h-4 object-contain" />
              ) : (
                <span className="flex items-center justify-center w-4 h-4">{suffixIcon}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p id={`${id}-error`} className="text-xs text-error" role="alert">
                {error}
              </p>
            )}
            {!error && helperText && (
              <p id={`${id}-helper`} className="text-xs text-text-muted">
                {helperText}
              </p>
            )}
          </div>
          {(showCharCount || showMaxLength) && (
            <p className={cn('text-xs text-text-muted ml-auto', maxLength && charCount >= maxLength && 'text-error')}>
              {charCount}{maxLength ? `/${maxLength}` : ''}
            </p>
          )}
        </div>
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
