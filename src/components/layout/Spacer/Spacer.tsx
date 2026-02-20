import React from 'react'
import { cn } from '../../../utils/cn'

export interface SpacerProps {
  size?: number | string
  axis?: 'horizontal' | 'vertical' | 'both'
  className?: string
}

export function Spacer({ size = 4, axis = 'vertical', className }: SpacerProps) {
  const sizeValue = typeof size === 'number' ? `${size * 0.25}rem` : size

  return (
    <span
      className={cn('block', className)}
      style={{
        width: axis === 'horizontal' || axis === 'both' ? sizeValue : undefined,
        height: axis === 'vertical' || axis === 'both' ? sizeValue : undefined,
        minWidth: axis === 'horizontal' || axis === 'both' ? sizeValue : undefined,
        minHeight: axis === 'vertical' || axis === 'both' ? sizeValue : undefined,
      }}
      aria-hidden="true"
    />
  )
}
