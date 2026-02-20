import React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'
import { cn } from '../../../utils/cn'

export type SliderSize = 'sm' | 'md' | 'lg'

export interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  size?: SliderSize
  showTooltip?: boolean
  showMarks?: boolean
  formatValue?: (value: number) => string
  label?: string
  helperText?: string
  className?: string
}

const trackSize: Record<SliderSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
}

const thumbSize: Record<SliderSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export function Slider({
  value,
  defaultValue = [0],
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = 'horizontal',
  size = 'md',
  showTooltip = false,
  showMarks = false,
  formatValue = (v) => String(v),
  label,
  helperText,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue)
  const [hoveredThumb, setHoveredThumb] = React.useState<number | null>(null)

  const currentValue = value ?? internalValue

  const handleValueChange = (v: number[]) => {
    setInternalValue(v)
    onValueChange?.(v)
  }

  const marks = React.useMemo(() => {
    if (!showMarks) return []
    const count = Math.floor((max - min) / step)
    return Array.from({ length: count + 1 }, (_, i) => min + i * step)
  }, [showMarks, min, max, step])

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text">{label}</span>
          <span className="text-sm text-text-muted">{currentValue.map(formatValue).join(' – ')}</span>
        </div>
      )}

      <RadixSlider.Root
        className={cn(
          'relative flex items-center select-none touch-none',
          orientation === 'horizontal' ? 'w-full' : 'flex-col h-40 w-5',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        value={currentValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        onValueCommit={onValueCommit}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        orientation={orientation}
      >
        <RadixSlider.Track
          className={cn(
            'relative grow rounded-full bg-surface-hover overflow-hidden',
            orientation === 'horizontal' ? `w-full ${trackSize[size]}` : `h-full w-${size === 'sm' ? '1' : size === 'md' ? '1.5' : '2'}`
          )}
        >
          <RadixSlider.Range className="absolute bg-primary rounded-full h-full" />
        </RadixSlider.Track>

        {currentValue.map((val, i) => (
          <RadixSlider.Thumb
            key={`thumb-${i}`}
            className={cn(
              'block rounded-full bg-white border-2 border-primary shadow-md',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              'transition-transform hover:scale-110',
              'cursor-grab active:cursor-grabbing',
              thumbSize[size],
              disabled && 'cursor-not-allowed hover:scale-100'
            )}
            onMouseEnter={() => showTooltip && setHoveredThumb(i)}
            onMouseLeave={() => showTooltip && setHoveredThumb(null)}
            aria-label={`Slider thumb ${i + 1}`}
          >
            {showTooltip && hoveredThumb === i && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text text-background text-xs px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
                {formatValue(val)}
              </div>
            )}
          </RadixSlider.Thumb>
        ))}
      </RadixSlider.Root>

      {showMarks && (
        <div className="relative flex justify-between mt-1">
          {marks.map((mark) => (
            <span key={mark} className="text-xs text-text-muted">{formatValue(mark)}</span>
          ))}
        </div>
      )}

      {helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
