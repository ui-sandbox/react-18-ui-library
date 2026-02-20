import React, { useId } from 'react'
import { cn } from '../../../utils/cn'

export interface FormFieldProps {
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  helperText,
  error,
  required,
  disabled,
  htmlFor,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId()
  const id = htmlFor ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1', disabled && 'opacity-60', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  )
}
