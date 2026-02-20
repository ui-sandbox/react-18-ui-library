import React, { useId } from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import { cn } from '../../../utils/cn'

export interface SwitchProps {
  label?: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  labelPosition?: 'left' | 'right'
  className?: string
  id?: string
}

const sizeMap = {
  sm: { root: 'w-8 h-4', thumb: 'w-3 h-3 data-[state=checked]:translate-x-4', label: 'text-sm' },
  md: { root: 'w-10 h-5', thumb: 'w-4 h-4 data-[state=checked]:translate-x-5', label: 'text-sm' },
  lg: { root: 'w-12 h-6', thumb: 'w-5 h-5 data-[state=checked]:translate-x-6', label: 'text-base' },
}

export function Switch({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  size = 'md',
  labelPosition = 'right',
  className,
  id: externalId,
}: SwitchProps) {
  const generatedId = useId()
  const id = externalId ?? generatedId
  const sz = sizeMap[size]

  const switchEl = (
    <RadixSwitch.Root
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      className={cn(
        'relative inline-flex flex-shrink-0 items-center rounded-full border-2 border-transparent',
        'transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-border data-[state=checked]:bg-primary',
        sz.root
      )}
    >
      <RadixSwitch.Thumb
        className={cn(
          'block rounded-full bg-white shadow-sm transition-transform translate-x-0',
          sz.thumb
        )}
      />
    </RadixSwitch.Root>
  )

  if (!label && !description) return switchEl

  return (
    <div className={cn('flex items-start gap-3', className)}>
      {labelPosition === 'left' && (
        <div className="flex flex-col flex-1">
          {label && (
            <label
              htmlFor={id}
              className={cn('font-medium text-text cursor-pointer', sz.label, disabled && 'opacity-50 cursor-not-allowed')}
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </label>
          )}
          {description && <p className="text-xs text-text-muted">{description}</p>}
        </div>
      )}

      {switchEl}

      {labelPosition === 'right' && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={cn('font-medium text-text cursor-pointer', sz.label, disabled && 'opacity-50 cursor-not-allowed')}
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </label>
          )}
          {description && <p className="text-xs text-text-muted">{description}</p>}
        </div>
      )}
    </div>
  )
}
