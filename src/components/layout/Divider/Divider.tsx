import React from 'react'
import { cn } from '../../../utils/cn'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: React.ReactNode
  labelPosition?: 'left' | 'center' | 'right'
  className?: string
  style?: React.CSSProperties
  id?: string
}

export function Divider({
  orientation = 'horizontal',
  label,
  labelPosition = 'center',
  className,
  style,
  id,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn('inline-block self-stretch w-px bg-border mx-2', className)}
        style={style}
        id={id}
        role="separator"
        aria-orientation="vertical"
      />
    )
  }

  if (label) {
    return (
      <div
        className={cn(
          'flex items-center gap-3 w-full my-2',
          labelPosition === 'left' && 'flex-row',
          labelPosition === 'right' && 'flex-row-reverse',
          className
        )}
        style={style}
        id={id}
        role="separator"
      >
        {labelPosition !== 'left' && <div className="flex-1 h-px bg-border" />}
        <span className="text-xs text-text-muted whitespace-nowrap px-1">{label}</span>
        {labelPosition !== 'right' && <div className="flex-1 h-px bg-border" />}
      </div>
    )
  }

  return (
    <hr
      className={cn('border-0 border-t border-border my-2 w-full', className)}
      style={style}
      id={id}
      role="separator"
    />
  )
}
