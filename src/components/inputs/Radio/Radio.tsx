import React, { useId } from 'react'
import * as RadixRadio from '@radix-ui/react-radio-group'
import { cn } from '../../../utils/cn'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { radio: 'w-3.5 h-3.5', dot: 'w-1.5 h-1.5', label: 'text-sm' },
  md: { radio: 'w-4 h-4', dot: 'w-2 h-2', label: 'text-sm' },
  lg: { radio: 'w-5 h-5', dot: 'w-2.5 h-2.5', label: 'text-base' },
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  orientation = 'vertical',
  label,
  error,
  disabled,
  required,
  size = 'md',
  className,
}: RadioGroupProps) {
  const groupId = useId()
  const sz = sizeMap[size]

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <p className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </p>
      )}
      <RadixRadio.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        orientation={orientation}
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        )}
        aria-label={label}
      >
        {options.map((opt) => {
          const id = `${groupId}-${opt.value}`
          return (
            <div key={opt.value} className="flex items-start gap-2">
              <RadixRadio.Item
                id={id}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  'flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  sz.radio,
                  'border-border bg-surface hover:border-primary',
                  'data-[state=checked]:border-primary data-[state=checked]:bg-surface'
                )}
              >
                <RadixRadio.Indicator
                  className={cn('rounded-full bg-primary', sz.dot)}
                />
              </RadixRadio.Item>
              <div className="flex flex-col">
                <label
                  htmlFor={id}
                  className={cn(
                    'font-medium text-text cursor-pointer leading-tight',
                    sz.label,
                    opt.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {opt.label}
                </label>
                {opt.description && (
                  <p className="text-xs text-text-muted mt-0.5">{opt.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </RadixRadio.Root>
      {error && <p className="text-xs text-error" role="alert">{error}</p>}
    </div>
  )
}
