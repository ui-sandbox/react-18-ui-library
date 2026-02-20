import React, { useState, useRef, useEffect, useId, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { DayPicker, DateRange, type CustomComponents } from 'react-day-picker'
import { format, isValid, setMonth, setYear, getMonth, getYear } from 'date-fns'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type DatePickerMode = 'single' | 'range'
export type DatePickerSize = 'sm' | 'md' | 'lg'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const selectStyle: React.CSSProperties = {
  appearance: 'none',
  WebkitAppearance: 'none',
  background: 'var(--color-surface-hover)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm, 4px)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  fontSize: '0.8125rem',
  fontWeight: 600,
  padding: '2px 20px 2px 6px',
  outline: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 4px center',
}

interface MonthCaptionProps {
  displayMonth: Date
  onMonthChange: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  yearRangeBefore?: number
  yearRangeAfter?: number
}

function MonthCaption({ displayMonth, onMonthChange, minDate, maxDate, yearRangeBefore = 10, yearRangeAfter = 5 }: MonthCaptionProps) {
  const today = new Date()
  const currentYear = getYear(displayMonth)
  const currentMonth = getMonth(displayMonth)

  const minYear = minDate ? getYear(minDate) : getYear(today) - yearRangeBefore
  const maxYear = maxDate ? getYear(maxDate) : getYear(today) + yearRangeAfter

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      <select
        value={currentMonth}
        onChange={(e) => onMonthChange(setMonth(displayMonth, Number(e.target.value)))}
        style={selectStyle}
        aria-label="Select month"
      >
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>{m}</option>
        ))}
      </select>
      <select
        value={currentYear}
        onChange={(e) => onMonthChange(setYear(displayMonth, Number(e.target.value)))}
        style={selectStyle}
        aria-label="Select year"
      >
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  )
}

export interface DatePickerSingleProps {
  mode?: 'single'
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
}

export interface DatePickerRangeProps {
  mode: 'range'
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
}

type DatePickerBaseProps = {
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  dateFormat?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  size?: DatePickerSize
  fullWidth?: boolean
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  /** How many years before current year to show in the year dropdown (default: 10) */
  yearRangeBefore?: number
  /** How many years after current year to show in the year dropdown (default: 5) */
  yearRangeAfter?: number
  className?: string
  containerClassName?: string
}

export type DatePickerProps = DatePickerBaseProps & (DatePickerSingleProps | DatePickerRangeProps)

const sizeClasses: Record<DatePickerSize, string> = {
  sm: 'h-8 text-sm px-2.5',
  md: 'h-9 text-sm px-3',
  lg: 'h-11 text-base px-4',
}

const dayPickerStyles = `
  /* react-day-picker v9 class names */
  .rdp-root { --rdp-accent-color: var(--color-primary); margin: 0; }
  .rdp-months { display: flex; gap: 1rem; }
  .rdp-month { width: auto; }
  .rdp-month_caption { display: flex; align-items: center; justify-content: space-between; padding: 0 0.25rem 0.75rem; min-width: 252px; }
  .rdp-month_grid { border-collapse: collapse; table-layout: fixed; }
  .rdp-caption_label { font-size: 0.875rem; font-weight: 600; color: var(--color-text); }
  .rdp-nav { display: flex; gap: 0.25rem; }
  .rdp-button_previous, .rdp-button_next { display: flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text-muted); cursor: pointer; transition: background 0.15s; }
  .rdp-button_previous:hover, .rdp-button_next:hover { background: var(--color-surface-hover); color: var(--color-text); }
  .rdp-weekdays { display: table-row; }
  .rdp-weekday { font-size: 0.75rem; font-weight: 500; color: var(--color-text-muted); text-align: center !important; padding: 0.25rem 0; width: 2.25rem; min-width: 2.25rem; }
  .rdp-weekday abbr { text-decoration: none; }
  .rdp-week { display: table-row; }
  .rdp-day { padding: 0.125rem; text-align: center; width: 2.25rem; min-width: 2.25rem; }
  .rdp-day_button { display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: var(--radius-md); font-size: 0.8125rem; color: var(--color-text); cursor: pointer; transition: background 0.15s, color 0.15s; border: none; background: transparent; }
  .rdp-day_button:hover:not(:disabled) { background: var(--color-surface-hover); }
  .rdp-selected .rdp-day_button { background: var(--color-primary) !important; color: var(--color-primary-foreground) !important; border-radius: var(--radius-md); }
  .rdp-today:not(.rdp-selected) .rdp-day_button { font-weight: 700; color: var(--color-primary); }
  .rdp-disabled .rdp-day_button { opacity: 0.35; cursor: not-allowed; }
  .rdp-outside .rdp-day_button { opacity: 0.4; }
  .rdp-range_start .rdp-day_button, .rdp-range_end .rdp-day_button { background: var(--color-primary) !important; color: var(--color-primary-foreground) !important; }
  .rdp-range_middle .rdp-day_button { background: color-mix(in srgb, var(--color-primary) 15%, transparent) !important; color: var(--color-primary) !important; border-radius: 0; }
  .rdp-range_start .rdp-day_button { border-radius: var(--radius-md) 0 0 var(--radius-md) !important; }
  .rdp-range_end .rdp-day_button { border-radius: 0 var(--radius-md) var(--radius-md) 0 !important; }
`

function formatDateDisplay(date: Date | undefined, fmt: string): string {
  if (!date || !isValid(date)) return ''
  return format(date, fmt)
}

function formatRangeDisplay(range: DateRange | undefined, fmt: string): string {
  if (!range) return ''
  const from = range.from ? format(range.from, fmt) : ''
  const to = range.to ? format(range.to, fmt) : ''
  if (from && to) return `${from} – ${to}`
  if (from) return `${from} – …`
  return ''
}

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    helperText,
    error,
    placeholder,
    dateFormat = 'MMM d, yyyy',
    disabled = false,
    required = false,
    clearable = true,
    size = 'md',
    fullWidth = false,
    minDate,
    maxDate,
    disabledDates,
    yearRangeBefore,
    yearRangeAfter,
    className,
    containerClassName,
  } = props

  const id = useId()
  const [open, setOpen] = useState(false)
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date())
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const isRange = props.mode === 'range'

  // Single mode state
  const [singleInternal, setSingleInternal] = useState<Date | undefined>(
    !isRange ? (props as DatePickerSingleProps).defaultValue : undefined
  )
  const singleValue = !isRange
    ? ((props as DatePickerSingleProps).value ?? singleInternal)
    : undefined

  // Range mode state
  const [rangeInternal, setRangeInternal] = useState<DateRange | undefined>(
    isRange ? (props as DatePickerRangeProps).defaultValue : undefined
  )
  const rangeValue = isRange
    ? ((props as DatePickerRangeProps).value ?? rangeInternal)
    : undefined

  const displayValue = isRange
    ? formatRangeDisplay(rangeValue, dateFormat)
    : formatDateDisplay(singleValue, dateFormat)

  const hasValue = isRange ? !!(rangeValue?.from) : !!singleValue

  const updatePopoverPosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const popoverHeight = 360
    const openUpward = spaceBelow < popoverHeight && rect.top > popoverHeight
    setPopoverStyle({
      position: 'fixed',
      left: rect.left,
      zIndex: 9999,
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    })
  }, [])

  useEffect(() => {
    if (open) updatePopoverPosition()
  }, [open, updatePopoverPosition])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        !containerRef.current?.contains(target) &&
        !(document.getElementById(`${id}-popover`)?.contains(target))
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [id])

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isRange) {
      setRangeInternal(undefined)
      ;(props as DatePickerRangeProps).onChange?.(undefined)
    } else {
      setSingleInternal(undefined)
      ;(props as DatePickerSingleProps).onChange?.(undefined)
    }
  }

  const disabledMatcher = disabledDates
    ? (date: Date) => disabledDates.some((d) => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
    : undefined

  return (
    <>
      <style>{dayPickerStyles}</style>
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label htmlFor={`${id}-trigger`} className="text-sm font-medium text-text">
            {label}{required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div ref={containerRef} className={cn(fullWidth && 'w-full')}>
          {/* Trigger */}
          <div
            ref={triggerRef}
            id={`${id}-trigger`}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-disabled={disabled}
            onClick={() => !disabled && setOpen((v) => !v)}
            className={cn(
              'flex items-center gap-2 rounded-md border bg-surface cursor-pointer',
              'transition-colors outline-none',
              open ? 'border-border-focus ring-2 ring-border-focus/20' : 'border-border',
              error && 'border-error ring-0',
              disabled && 'opacity-50 cursor-not-allowed',
              sizeClasses[size],
              fullWidth && 'w-full',
              className
            )}
          >
            <Calendar size={15} className="text-text-muted flex-shrink-0" />
            <span className={cn('flex-1 text-sm', displayValue ? 'text-text' : 'text-text-muted')}>
              {displayValue || (placeholder ?? (isRange ? 'Select date range' : 'Select date'))}
            </span>
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-text-muted hover:text-text transition-colors flex-shrink-0"
                aria-label="Clear date"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Popover rendered via portal to escape overflow clipping */}
          {open && typeof document !== 'undefined' && createPortal(
            <div
              id={`${id}-popover`}
              style={popoverStyle}
              className="bg-surface border border-border rounded-xl shadow-2xl p-3"
              role="dialog"
              aria-label="Date picker"
            >
              {/* Prev / Next nav + Month+Year dropdowns */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setDisplayMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.75rem', height: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDisplayMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.75rem', height: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                    aria-label="Next month"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
                <MonthCaption
                  displayMonth={displayMonth}
                  onMonthChange={setDisplayMonth}
                  minDate={minDate}
                  maxDate={maxDate}
                  yearRangeBefore={yearRangeBefore}
                  yearRangeAfter={yearRangeAfter}
                />
              </div>
              {isRange ? (
                <DayPicker
                  mode="range"
                  month={displayMonth}
                  onMonthChange={setDisplayMonth}
                  selected={rangeValue}
                  onSelect={(range) => {
                    setRangeInternal(range)
                    ;(props as DatePickerRangeProps).onChange?.(range)
                    if (range?.from && range?.to) setOpen(false)
                  }}
                  disabled={[
                    ...(minDate ? [{ before: minDate }] : []),
                    ...(maxDate ? [{ after: maxDate }] : []),
                    ...(disabledMatcher ? [disabledMatcher] : []),
                  ]}
                  hideNavigation
                  components={{} as Partial<CustomComponents>}
                />
              ) : (
                <DayPicker
                  mode="single"
                  month={displayMonth}
                  onMonthChange={setDisplayMonth}
                  selected={singleValue}
                  onSelect={(date) => {
                    setSingleInternal(date)
                    ;(props as DatePickerSingleProps).onChange?.(date)
                    setOpen(false)
                  }}
                  disabled={[
                    ...(minDate ? [{ before: minDate }] : []),
                    ...(maxDate ? [{ after: maxDate }] : []),
                    ...(disabledMatcher ? [disabledMatcher] : []),
                  ]}
                  hideNavigation
                  components={{} as Partial<CustomComponents>}
                />
              )}
            </div>,
            document.body
          )}
        </div>

        {error && <p className="text-xs text-error" role="alert">{error}</p>}
        {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
      </div>
    </>
  )
}
