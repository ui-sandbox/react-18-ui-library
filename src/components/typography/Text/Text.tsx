import React from 'react'
import { cn } from '../../../utils/cn'

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'default' | 'muted' | 'disabled' | 'primary' | 'error' | 'success' | 'warning' | 'inherit'
export type TextAs = 'p' | 'span' | 'div' | 'strong' | 'em' | 'small'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: TextAs
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  truncate?: boolean
  clamp?: 1 | 2 | 3 | 4 | 5
  italic?: boolean
  underline?: boolean
}

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const weightClasses: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorClasses: Record<TextColor, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  disabled: 'text-text-disabled',
  primary: 'text-primary',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
  inherit: 'text-inherit',
}

const clampClasses: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
}

export function Text({
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  truncate = false,
  clamp,
  italic = false,
  underline = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        'font-base leading-normal',
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        truncate && 'truncate',
        clamp && clampClasses[clamp],
        italic && 'italic',
        underline && 'underline underline-offset-2',
        className
      )}
      {...(props as React.HTMLAttributes<HTMLParagraphElement>)}
    >
      {children}
    </Tag>
  )
}
