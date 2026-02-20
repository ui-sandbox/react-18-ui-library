import React from 'react'
import { type LucideIcon, type LucideProps } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps extends Omit<LucideProps, 'size'> {
  icon: LucideIcon
  size?: IconSize | number
  color?: string
  className?: string
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
}

export function Icon({ icon: LucideIconComponent, size = 'md', color, className, ...props }: IconProps) {
  const resolvedSize = typeof size === 'number' ? size : sizeMap[size]

  return (
    <LucideIconComponent
      size={resolvedSize}
      color={color}
      className={cn('flex-shrink-0', className)}
      aria-hidden="true"
      {...props}
    />
  )
}
