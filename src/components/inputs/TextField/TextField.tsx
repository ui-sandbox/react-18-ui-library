import React, { useState, useId } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type TextFieldSize = 'sm' | 'md' | 'lg'

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string
  helperText?: string
  error?: string
  size?: TextFieldSize
  prefixIcon?: React.ReactNode
  prefixImage?: string
  prefixText?: string
  suffixIcon?: React.ReactNode
  suffixImage?: string
  suffixText?: string
  clearable?: boolean
  onClear?: () => void
  fullWidth?: boolean
  showMaxLength?: boolean
  containerClassName?: string
  inputClassName?: string
}

const sizeClasses: Record<TextFieldSize, { input: string; icon: string; adornment: string }> = {
  sm: { input: 'h-8 text-sm px-2.5', icon: 'w-8', adornment: 'text-xs' },
  md: { input: 'h-9 text-sm px-3', icon: 'w-9', adornment: 'text-sm' },
  lg: { input: 'h-11 text-base px-4', icon: 'w-11', adornment: 'text-base' },
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      prefixIcon,
      prefixImage,
      prefixText,
      suffixIcon,
      suffixImage,
      suffixText,
      clearable = false,
      onClear,
      fullWidth = false,
      showMaxLength = false,
      containerClassName,
      inputClassName,
      type = 'text',
      value,
      onChange,
      disabled,
      required,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const hasPrefix = !!(prefixIcon || prefixImage || prefixText)
    const hasSuffix = !!(suffixIcon || suffixImage || suffixText || clearable || isPassword)
    const sz = sizeClasses[size]

    const hasValue = value !== undefined ? String(value).length > 0 : false
    const charCount = value !== undefined ? String(value).length : 0
    const maxLen = props.maxLength

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className={cn('relative flex items-center', fullWidth && 'w-full')}>
          {/* Prefix */}
          {hasPrefix && (
            <div
              className={cn(
                'absolute left-0 flex items-center justify-center h-full border-r border-border bg-surface-hover rounded-l-md',
                sz.icon,
                'text-text-muted',
                sz.adornment
              )}
            >
              {prefixImage ? (
                <img src={prefixImage} alt="" className="w-4 h-4 object-contain" />
              ) : prefixIcon ? (
                <span className="flex items-center justify-center w-4 h-4">{prefixIcon}</span>
              ) : (
                <span className="px-2 whitespace-nowrap">{prefixText}</span>
              )}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={cn(
              'w-full rounded-md border bg-surface text-text placeholder:text-text-muted',
              'transition-colors outline-none',
              'focus:border-border-focus focus:ring-2 focus:ring-border-focus/20',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover',
              error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border',
              sz.input,
              hasPrefix && 'pl-[calc(var(--prefix-width,2.25rem)+0.5rem)]',
              hasSuffix && 'pr-[calc(var(--suffix-width,2.25rem)+0.5rem)]',
              inputClassName
            )}
            style={{
              paddingLeft: hasPrefix ? `calc(${sz.icon.replace('w-', '')}*0.25rem + 0.75rem)` : undefined,
              paddingRight: hasSuffix ? `calc(${sz.icon.replace('w-', '')}*0.25rem + 0.75rem)` : undefined,
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...props}
          />

          {/* Suffix */}
          {hasSuffix && (
            <div
              className={cn(
                'absolute right-0 flex items-center justify-center h-full gap-1 pr-2',
                'text-text-muted',
                sz.adornment
              )}
            >
              {suffixImage ? (
                <img src={suffixImage} alt="" className="w-4 h-4 object-contain" />
              ) : suffixIcon ? (
                <span className="flex items-center justify-center w-4 h-4">{suffixIcon}</span>
              ) : suffixText ? (
                <span className="whitespace-nowrap border-l border-border pl-2">{suffixText}</span>
              ) : null}

              {clearable && hasValue && !disabled && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-surface-hover transition-colors"
                  aria-label="Clear input"
                >
                  <X size={12} />
                </button>
              )}

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="flex items-center justify-center w-4 h-4 hover:text-text transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
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
          {showMaxLength && maxLen !== undefined && (
            <p className={cn('text-xs text-text-muted ml-auto', charCount >= maxLen && 'text-error')}>
              {charCount}/{maxLen}
            </p>
          )}
        </div>
      </div>
    )
  }
)

TextField.displayName = 'TextField'
