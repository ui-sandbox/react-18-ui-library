import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  size?: RatingSize
  disabled?: boolean
  readOnly?: boolean
  allowHalf?: boolean
  allowClear?: boolean
  label?: string
  helperText?: string
  className?: string
  icon?: React.ReactNode
  emptyIcon?: React.ReactNode
}

const sizeMap: Record<RatingSize, number> = { sm: 16, md: 20, lg: 28 }

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  size = 'md',
  disabled = false,
  readOnly = false,
  allowHalf = false,
  allowClear = true,
  label,
  helperText,
  className,
  icon,
  emptyIcon,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const iconSize = sizeMap[size]
  const interactive = !disabled && !readOnly

  const handleClick = (star: number) => {
    if (!interactive) return
    const newVal = allowClear && star === value ? 0 : star
    setInternalValue(newVal)
    onChange?.(newVal)
  }

  const getStarFill = (star: number) => {
    const display = hoverValue ?? value
    if (display >= star) return 'full'
    if (allowHalf && display >= star - 0.5) return 'half'
    return 'empty'
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <span className="text-sm font-medium text-text">{label}</span>}
      <div
        className={cn('flex items-center gap-0.5', interactive && 'cursor-pointer')}
        onMouseLeave={() => interactive && setHoverValue(null)}
        role={interactive ? 'slider' : 'img'}
        aria-label={`Rating: ${value} out of ${max}`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {Array.from({ length: max }, (_, i) => {
          const star = i + 1
          const fill = getStarFill(star)
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => interactive && setHoverValue(star)}
              disabled={disabled}
              className={cn(
                'relative transition-transform focus:outline-none',
                interactive && 'hover:scale-110',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-label={`Rate ${star} out of ${max}`}
              tabIndex={interactive ? 0 : -1}
            >
              {fill === 'empty' ? (
                emptyIcon ?? (
                  <Star
                    size={iconSize}
                    className="text-border fill-transparent transition-colors"
                  />
                )
              ) : fill === 'full' ? (
                icon ?? (
                  <Star
                    size={iconSize}
                    className={cn(
                      'transition-colors',
                      hoverValue !== null ? 'text-warning fill-warning' : 'text-warning fill-warning'
                    )}
                  />
                )
              ) : (
                <span className="relative inline-block">
                  <Star size={iconSize} className="text-border fill-transparent" />
                  <span className="absolute inset-0 overflow-hidden w-1/2">
                    <Star size={iconSize} className="text-warning fill-warning" />
                  </span>
                </span>
              )}
            </button>
          )
        })}
      </div>
      {helperText && <p className="text-xs text-text-muted">{helperText}</p>}
    </div>
  )
}
