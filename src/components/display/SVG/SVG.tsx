import React from 'react'
import { cn } from '../../../utils/cn'

export interface SVGProps {
  src?: string
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  size?: number | string
  color?: string
  className?: string
  title?: string
  role?: string
  'aria-label'?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  viewBox?: string
  fill?: string
  stroke?: string
}

export function SVG({
  src,
  children,
  width,
  height,
  size,
  color,
  className,
  title,
  role = 'img',
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  ...props
}: SVGProps) {
  const resolvedWidth = size ?? width ?? 24
  const resolvedHeight = size ?? height ?? 24

  if (src) {
    return (
      <img
        src={src}
        width={resolvedWidth}
        height={resolvedHeight}
        className={cn('flex-shrink-0', className)}
        alt={props['aria-label'] ?? title ?? ''}
        aria-hidden={props['aria-hidden']}
        style={{ color }}
      />
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={role}
      className={cn('flex-shrink-0', className)}
      style={{ color }}
      aria-label={props['aria-label']}
      aria-hidden={props['aria-hidden']}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}
