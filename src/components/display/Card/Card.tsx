import React from 'react'
import { cn } from '../../../utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  footer?: React.ReactNode
  hoverable?: boolean
  clickable?: boolean
  bordered?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({
  header,
  footer,
  hoverable = false,
  clickable = false,
  bordered = true,
  shadow = 'sm',
  padding = 'md',
  className,
  children,
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-surface',
        bordered && 'border border-border',
        shadowClasses[shadow],
        hoverable && 'transition-shadow hover:shadow-md',
        (clickable || onClick) && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      onKeyDown={
        (clickable || onClick)
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>) }
          : undefined
      }
      {...props}
    >
      {header && (
        <div className={cn('border-b border-border', paddingClasses[padding])}>
          {header}
        </div>
      )}
      <div className={cn(paddingClasses[padding])}>{children}</div>
      {footer && (
        <div className={cn('border-t border-border', paddingClasses[padding])}>
          {footer}
        </div>
      )}
    </div>
  )
}
