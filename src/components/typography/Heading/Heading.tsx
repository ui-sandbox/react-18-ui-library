import React from 'react'
import { cn } from '../../../utils/cn'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  size?: HeadingSize
  weight?: HeadingWeight
  truncate?: boolean
  color?: 'default' | 'muted' | 'primary' | 'error' | 'success' | 'warning'
}

const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
}

const sizeClasses: Record<HeadingSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
}

const weightClasses: Record<HeadingWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorClasses = {
  default: 'text-text',
  muted: 'text-text-muted',
  primary: 'text-primary',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
}

export function Heading({
  level = 2,
  size,
  weight = 'bold',
  truncate = false,
  color = 'default',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const resolvedSize = size ?? defaultSizeByLevel[level]

  return (
    <Tag
      className={cn(
        'font-base leading-tight',
        sizeClasses[resolvedSize],
        weightClasses[weight],
        colorClasses[color],
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
