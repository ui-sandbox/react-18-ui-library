import React from 'react'
import { cn } from '../../../utils/cn'

export interface BoxProps {
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav' | 'span' | 'p'
  bg?: 'surface' | 'background' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  bordered?: boolean
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  id?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  role?: string
  tabIndex?: number
  'aria-label'?: string
}

const bgClasses = {
  surface: 'bg-surface',
  background: 'bg-background',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  error: 'bg-error-bg text-error',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  info: 'bg-info-bg text-info',
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const paddingClasses = {
  none: '',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

export function Box({
  as: Component = 'div',
  bg,
  rounded,
  shadow,
  bordered = false,
  padding,
  className,
  children,
  ...props
}: BoxProps) {
  return (
    <Component
      className={cn(
        bg && bgClasses[bg],
        rounded && roundedClasses[rounded],
        shadow && shadowClasses[shadow],
        bordered && 'border border-border',
        padding && paddingClasses[padding],
        className
      )}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Component>
  )
}
