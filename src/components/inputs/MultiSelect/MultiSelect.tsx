import React, { useState, useRef, useId, useEffect } from 'react'
import { Check, ChevronDown, X, Search } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface MultiSelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface MultiSelectGroup {
  label: string
  options: MultiSelectOption[]
}

export interface MultiSelectProps {
  options?: MultiSelectOption[]
  groups?: MultiSelectGroup[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  searchable?: boolean
  clearable?: boolean
  maxSelected?: number
  maxDisplayed?: number
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  containerClassName?: string
}

const sizeClasses = {
  sm: 'min-h-8 text-sm px-2.5',
  md: 'min-h-9 text-sm px-3',
  lg: 'min-h-11 text-base px-4',
}

export function MultiSelect({
  options = [],
  groups = [],
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Select options…',
  searchPlaceholder = 'Search…',
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  searchable = true,
  clearable = true,
  maxSelected,
  maxDisplayed = 3,
  size = 'md',
  fullWidth = false,
  className,
  containerClassName,
}: MultiSelectProps) {
  const id = useId()
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const value = controlledValue ?? internalValue

  const allOptions = [
    ...options,
    ...groups.flatMap((g) => g.options),
  ]

  const update = (next: string[]) => {
    setInternalValue(next)
    onChange?.(next)
  }

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      update(value.filter((v) => v !== optValue))
    } else {
      if (maxSelected && value.length >= maxSelected) return
      update([...value, optValue])
    }
  }

  const removeTag = (e: React.MouseEvent, optValue: string) => {
    e.stopPropagation()
    update(value.filter((v) => v !== optValue))
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    update([])
  }

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => searchRef.current?.focus())
      return () => cancelAnimationFrame(raf)
    } else {
      setSearch('')
    }
  }, [open])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filterOption = (opt: MultiSelectOption) =>
    opt.label.toLowerCase().includes(search.toLowerCase()) ||
    opt.description?.toLowerCase().includes(search.toLowerCase())

  const filteredOptions = options.filter(filterOption)
  const filteredGroups = groups
    .map((g) => ({ ...g, options: g.options.filter(filterOption) }))
    .filter((g) => g.options.length > 0)

  const hasResults = filteredOptions.length > 0 || filteredGroups.length > 0

  const selectedLabels = value.map((v) => allOptions.find((o) => o.value === v)?.label ?? v)
  const displayedTags = selectedLabels.slice(0, maxDisplayed)
  const overflow = selectedLabels.length - maxDisplayed

  const renderOption = (opt: MultiSelectOption) => {
    const selected = value.includes(opt.value)
    const atMax = !selected && maxSelected !== undefined && value.length >= maxSelected
    return (
      <div
        key={opt.value}
        role="option"
        aria-selected={selected}
        aria-disabled={opt.disabled || atMax}
        onClick={() => !opt.disabled && !atMax && toggle(opt.value)}
        className={cn(
          'flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm',
          selected ? 'bg-primary/10 text-primary' : 'text-text hover:bg-surface-hover',
          (opt.disabled || atMax) && 'opacity-40 cursor-not-allowed pointer-events-none'
        )}
      >
        <div className={cn('flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors',
          selected ? 'bg-primary border-primary' : 'border-border bg-surface'
        )}>
          {selected && <Check size={10} className="text-primary-foreground" />}
        </div>
        {opt.icon && <span className="flex-shrink-0 text-text-muted">{opt.icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="truncate">{opt.label}</div>
          {opt.description && <div className="text-xs text-text-muted truncate">{opt.description}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label htmlFor={`${id}-trigger`} className="text-sm font-medium text-text">
          {label}{required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div ref={containerRef} className={cn('relative', fullWidth && 'w-full', className)}>
        {/* Trigger */}
        <div
          id={`${id}-trigger`}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
          className={cn(
            'flex items-center flex-wrap gap-1.5 rounded-md border bg-surface cursor-pointer',
            'transition-colors outline-none py-1.5',
            open ? 'border-border-focus ring-2 ring-border-focus/20' : 'border-border',
            error && 'border-error ring-0',
            disabled && 'opacity-50 cursor-not-allowed',
            sizeClasses[size]
          )}
        >
          {value.length === 0 ? (
            <span className="text-text-muted flex-1">{placeholder}</span>
          ) : (
            <>
              {displayedTags.map((tag, i) => (
                <span key={value[i]} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                  {tag}
                  <button type="button" onClick={(e) => removeTag(e, value[i])} className="hover:text-primary/60 transition-colors" aria-label={`Remove ${tag}`}>
                    <X size={10} />
                  </button>
                </span>
              ))}
              {overflow > 0 && (
                <span className="text-xs text-text-muted bg-surface-hover px-2 py-0.5 rounded-full">+{overflow} more</span>
              )}
              <span className="flex-1" />
            </>
          )}
          <div className="flex items-center gap-1 ml-auto pr-1">
            {clearable && value.length > 0 && !disabled && (
              <button type="button" onClick={clearAll} className="text-text-muted hover:text-text transition-colors" aria-label="Clear all">
                <X size={14} />
              </button>
            )}
            <ChevronDown size={16} className={cn('text-text-muted transition-transform', open && 'rotate-180')} />
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 w-full mt-1 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                <Search size={14} className="text-text-muted flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
                />
              </div>
            )}
            <div role="listbox" aria-multiselectable="true" className="max-h-60 overflow-y-auto p-1.5">
              {!hasResults ? (
                <div className="py-6 text-center text-sm text-text-muted">No options found.</div>
              ) : (
                <>
                  {filteredOptions.map(renderOption)}
                  {filteredGroups.map((group) => (
                    <div key={group.label}>
                      <div className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">{group.label}</div>
                      {group.options.map(renderOption)}
                    </div>
                  ))}
                </>
              )}
            </div>
            {maxSelected && (
              <div className="px-3 py-1.5 border-t border-border text-xs text-text-muted">
                {value.length}/{maxSelected} selected
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
