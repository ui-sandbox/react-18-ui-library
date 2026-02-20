import React, { useState, useRef, useEffect, useId, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check, X, Search } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface SearchSelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface SearchSelectGroup {
  label: string
  options: SearchSelectOption[]
}

interface SearchSelectBaseProps {
  options?: SearchSelectOption[]
  groups?: SearchSelectGroup[]
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  fullWidth?: boolean
  className?: string
  maxSelected?: number
}

export interface SearchSelectSingleProps extends SearchSelectBaseProps {
  multiple?: false
  value?: string
  onChange?: (value: string) => void
}

export interface SearchSelectMultiProps extends SearchSelectBaseProps {
  multiple: true
  value?: string[]
  onChange?: (value: string[]) => void
}

export type SearchSelectProps = SearchSelectSingleProps | SearchSelectMultiProps

function flattenOptions(
  options: SearchSelectOption[] = [],
  groups: SearchSelectGroup[] = []
): SearchSelectOption[] {
  return [...options, ...groups.flatMap((g) => g.options)]
}

export function SearchSelect(props: SearchSelectProps) {
  const {
    options = [],
    groups = [],
    placeholder = 'Select…',
    searchPlaceholder = 'Search…',
    label,
    helperText,
    error,
    disabled = false,
    required = false,
    clearable = true,
    fullWidth = false,
    className,
    maxSelected,
  } = props

  const id = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const chipsRowRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const [visibleCount, setVisibleCount] = useState<number>(Infinity)
  const measureRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const allOptions = flattenOptions(options, groups)

  const selectedValues: string[] = props.multiple
    ? (props.value ?? [])
    : props.value
    ? [props.value]
    : []

  const filtered = allOptions.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  const filteredGroups: SearchSelectGroup[] =
    groups.length > 0
      ? groups
          .map((g) => ({
            ...g,
            options: g.options.filter((o) =>
              o.label.toLowerCase().includes(query.toLowerCase())
            ),
          }))
          .filter((g) => g.options.length > 0)
      : []

  const isSelected = (val: string) => selectedValues.includes(val)

  const propsRef = React.useRef(props)
  propsRef.current = props

  const toggle = useCallback(
    (val: string) => {
      const p = propsRef.current
      if (p.multiple) {
        const current = p.value ?? []
        const next = current.includes(val)
          ? current.filter((v) => v !== val)
          : maxSelected && current.length >= maxSelected
          ? current
          : [...current, val]
        p.onChange?.(next)
      } else {
        p.onChange?.(val)
        setOpen(false)
        setQuery('')
      }
    },
    [maxSelected]
  )

  const removeChip = (val: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (props.multiple) {
      props.onChange?.((props.value ?? []).filter((v) => v !== val))
    }
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (props.multiple) {
      props.onChange?.([])
    } else {
      props.onChange?.('')
    }
  }

  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    const openUpward = spaceBelow < 260 && spaceAbove > spaceBelow
    setDropdownStyle({
      position: 'fixed',
      top: openUpward ? undefined : rect.bottom + 4,
      bottom: openUpward ? window.innerHeight - rect.top + 4 : undefined,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    })
  }, [])

  useEffect(() => {
    if (open) {
      updateDropdownPosition()
      setTimeout(() => searchRef.current?.focus(), 10)
    } else {
      setQuery('')
    }
  }, [open, updateDropdownPosition])

  useEffect(() => {
    if (!open) return
    const onScroll = () => updateDropdownPosition()
    const onResize = () => updateDropdownPosition()
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [open, updateDropdownPosition])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('[data-searchselect-dropdown]')
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedLabels = selectedValues
    .map((v) => allOptions.find((o) => o.value === v))
    .filter(Boolean) as SearchSelectOption[]

  const hasValue = selectedValues.length > 0

  // Measure from the off-screen clone (measureRef) — never mutates the visible DOM
  const recalcVisibleCount = useCallback(() => {
    if (!measureRef.current || !triggerRef.current || !props.multiple) return
    const chips = Array.from(measureRef.current.querySelectorAll<HTMLElement>('[data-chip-measure]'))
    if (chips.length === 0) { setVisibleCount(Infinity); return }

    // Available width = trigger width minus actions area (clear btn + chevron ~52px) minus padding (~24px)
    const triggerW = triggerRef.current.offsetWidth
    const ACTIONS_W = 56
    const PADDING = 24
    const MORE_BADGE_W = 60
    const GAP = 4
    const available = triggerW - ACTIONS_W - PADDING

    let used = 0
    let count = 0
    for (let i = 0; i < chips.length; i++) {
      const chipW = chips[i].offsetWidth + GAP
      const isLast = i === chips.length - 1
      // If this is the last chip, no badge needed — just check if it fits
      const spaceNeeded = isLast ? chipW : chipW + (i === 0 ? 0 : MORE_BADGE_W)
      if (used + chipW <= available - (isLast ? 0 : MORE_BADGE_W)) {
        used += chipW
        count++
      } else {
        break
      }
    }
    setVisibleCount(Math.max(1, count))
  }, [props.multiple])

  // Re-measure whenever selection changes or trigger resizes
  useEffect(() => {
    if (!props.multiple) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(recalcVisibleCount)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues.join(','), recalcVisibleCount])

  useEffect(() => {
    if (!props.multiple || !triggerRef.current) return
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(recalcVisibleCount)
    })
    ro.observe(triggerRef.current)
    return () => ro.disconnect()
  }, [props.multiple, recalcVisibleCount])

  const renderOption = (opt: SearchSelectOption) => (
    <button
      key={opt.value}
      type="button"
      disabled={opt.disabled || (!isSelected(opt.value) && !!maxSelected && selectedValues.length >= maxSelected)}
      onClick={() => toggle(opt.value)}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-left outline-none transition-colors',
        'hover:bg-surface-hover focus:bg-surface-hover',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isSelected(opt.value) && 'bg-primary/10 text-primary font-medium'
      )}
    >
      {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
      <span className="flex-1 truncate">{opt.label}</span>
      {isSelected(opt.value) && <Check size={14} className="flex-shrink-0" />}
    </button>
  )

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)} ref={containerRef}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Trigger */}
      <div
        ref={triggerRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={!!error}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !disabled && setOpen((o) => !o) }
          if (e.key === 'Escape') setOpen(false)
        }}
        className={cn(
          'flex items-center gap-2 min-h-9 px-3 py-1.5 w-full rounded-md border bg-surface text-sm',
          'transition-colors outline-none cursor-pointer select-none',
          'focus:border-border-focus focus:ring-2 focus:ring-border-focus/20',
          disabled && 'opacity-50 cursor-not-allowed',
          error ? 'border-error' : open ? 'border-border-focus ring-2 ring-border-focus/20' : 'border-border'
        )}
      >
        {/* Visible chips — only the slice that fits */}
        <div className="flex-1 flex items-center gap-1 min-w-0 overflow-hidden">
          {props.multiple && selectedLabels.length > 0 ? (
            <>
              {selectedLabels.slice(0, visibleCount).map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary flex-shrink-0"
                >
                  <span className="max-w-[120px] truncate">{opt.label}</span>
                  <button
                    type="button"
                    onClick={(e) => removeChip(opt.value, e)}
                    className="hover:text-primary/70 focus:outline-none"
                    aria-label={`Remove ${opt.label}`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              {selectedLabels.length > visibleCount && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-hover text-text-muted flex-shrink-0 whitespace-nowrap">
                  +{selectedLabels.length - visibleCount} more
                </span>
              )}
            </>
          ) : !props.multiple && selectedLabels.length > 0 ? (
            <span className="text-text truncate">{selectedLabels[0].label}</span>
          ) : (
            <span className="text-text-muted truncate">{placeholder}</span>
          )}
        </div>

        {/* Off-screen measurement clone — all chips always visible, never interactable */}
        {props.multiple && (
          <div
            ref={measureRef}
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: -9999,
              left: -9999,
              visibility: 'hidden',
              pointerEvents: 'none',
              display: 'flex',
              gap: 4,
              flexWrap: 'nowrap',
            }}
          >
            {selectedLabels.map((opt) => (
              <span
                key={opt.value}
                data-chip-measure=""
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary flex-shrink-0"
              >
                <span className="max-w-[120px] truncate">{opt.label}</span>
                <span style={{ width: 10, height: 10, display: 'inline-block' }} />
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 flex-shrink-0">
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={clearAll}
              className="text-text-muted hover:text-text focus:outline-none"
              aria-label="Clear selection"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={14}
            className={cn('text-text-muted transition-transform', open && 'rotate-180')}
          />
        </div>
      </div>

      {/* Dropdown — rendered in a portal so it floats above all parents */}
      {open && createPortal(
        <div
          data-searchselect-dropdown=""
          className={cn(
            'bg-surface border border-border rounded-md shadow-xl overflow-hidden',
            'animate-in fade-in-0 zoom-in-95'
          )}
          style={dropdownStyle}
        >
          {/* Search input */}
          <div className="p-2 border-b border-border">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-background">
              <Search size={14} className="text-text-muted flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 text-sm bg-transparent outline-none text-text placeholder:text-text-muted"
                onClick={(e) => e.stopPropagation()}
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="text-text-muted hover:text-text">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="p-1 max-h-60 overflow-y-auto" role="listbox">
            {filteredGroups.length > 0
              ? filteredGroups.map((group) => (
                  <div key={group.label}>
                    <p className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wide">
                      {group.label}
                    </p>
                    {group.options.map(renderOption)}
                  </div>
                ))
              : groups.length === 0
              ? filtered.length > 0
                ? filtered.map(renderOption)
                : (
                  <p className="px-3 py-4 text-sm text-text-muted text-center">No options found</p>
                )
              : (
                <p className="px-3 py-4 text-sm text-text-muted text-center">No options found</p>
              )}
          </div>

          {props.multiple && maxSelected && (
            <div className="px-3 py-2 border-t border-border text-xs text-text-muted">
              {selectedValues.length} / {maxSelected} selected
            </div>
          )}
        </div>,
        document.body
      )}

      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
