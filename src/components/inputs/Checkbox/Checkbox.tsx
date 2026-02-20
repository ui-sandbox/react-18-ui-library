import React, { useId } from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface CheckboxProps {
  label?: string
  description?: string
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  required?: boolean
  error?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  id?: string
}

const sizeMap = {
  sm: { box: 'w-3.5 h-3.5', icon: 10, label: 'text-sm' },
  md: { box: 'w-4 h-4', icon: 12, label: 'text-sm' },
  lg: { box: 'w-5 h-5', icon: 14, label: 'text-base' },
}

export function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  error,
  size = 'md',
  className,
  id: externalId,
}: CheckboxProps) {
  const generatedId = useId()
  const id = externalId ?? generatedId
  const sz = sizeMap[size]

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-start gap-2">
        <RadixCheckbox.Root
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          className={cn(
            'flex-shrink-0 flex items-center justify-center rounded border-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sz.box,
            checked === true || checked === 'indeterminate'
              ? 'bg-primary border-primary'
              : 'bg-surface border-border hover:border-primary'
          )}
        >
          <RadixCheckbox.Indicator>
            {checked === 'indeterminate' ? (
              <Minus size={sz.icon} className="text-primary-foreground" />
            ) : (
              <Check size={sz.icon} className="text-primary-foreground" />
            )}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'font-medium text-text cursor-pointer leading-tight',
                  sz.label,
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {label}
                {required && <span className="text-error ml-1">*</span>}
              </label>
            )}
            {description && (
              <p className="text-xs text-text-muted mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-error ml-6" role="alert">{error}</p>}
    </div>
  )
}
