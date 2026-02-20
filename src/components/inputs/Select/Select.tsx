import React, { useId } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface SelectProps {
  options?: SelectOption[]
  groups?: SelectGroup[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  className?: string
}

export function Select({
  options = [],
  groups = [],
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  disabled,
  required,
  fullWidth = false,
  className,
}: SelectProps) {
  const id = useId()

  const renderOption = (opt: SelectOption) => (
    <RadixSelect.Item
      key={opt.value}
      value={opt.value}
      disabled={opt.disabled}
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer outline-none',
        'text-text hover:bg-surface-hover focus:bg-surface-hover',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        'data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary'
      )}
    >
      <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="ml-auto">
        <Check size={14} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={id}
          className={cn(
            'flex items-center justify-between gap-2 h-9 px-3 w-full rounded-md border bg-surface text-sm',
            'transition-colors outline-none cursor-pointer',
            'focus:border-border-focus focus:ring-2 focus:ring-border-focus/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'data-[placeholder]:text-text-muted',
            error ? 'border-error' : 'border-border',
            fullWidth && 'w-full'
          )}
          aria-invalid={!!error}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown size={14} className="text-text-muted" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className={cn(
              'z-dropdown bg-surface border border-border rounded-md shadow-lg overflow-hidden',
              'animate-in fade-in-0 zoom-in-95'
            )}
            position="popper"
            sideOffset={4}
          >
            <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1 text-text-muted">
              <ChevronUp size={14} />
            </RadixSelect.ScrollUpButton>

            <RadixSelect.Viewport className="p-1 max-h-60">
              {groups.length > 0
                ? groups.map((group) => (
                    <RadixSelect.Group key={group.label}>
                      <RadixSelect.Label className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wide">
                        {group.label}
                      </RadixSelect.Label>
                      {group.options.map(renderOption)}
                    </RadixSelect.Group>
                  ))
                : options.map(renderOption)}
            </RadixSelect.Viewport>

            <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1 text-text-muted">
              <ChevronDown size={14} />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
