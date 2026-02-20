import React from 'react'
import { cn } from '../../../utils/cn'

export type SkeletonVariant = 'text' | 'rect' | 'circle'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  lines?: number
  className?: string
  animated?: boolean
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  lines = 1,
  className,
  animated = true,
}: SkeletonProps) {
  const base = cn(
    'bg-surface-hover',
    animated && 'animate-pulse',
    variant === 'circle' && 'rounded-full',
    variant === 'text' && 'rounded',
    variant === 'rect' && 'rounded-md',
    className
  )

  const style: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, 'h-4')}
            style={{ ...style, width: i === lines - 1 ? '75%' : '100%' }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(base, variant === 'text' && 'h-4', variant === 'circle' && 'w-10 h-10')}
      style={style}
    />
  )
}

export interface SkeletonCardProps {
  showAvatar?: boolean
  lines?: number
  className?: string
}

export function SkeletonCard({ showAvatar = true, lines = 3, className }: SkeletonCardProps) {
  return (
    <div className={cn('p-4 rounded-lg border border-border bg-surface space-y-3', className)}>
      {showAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      )}
      <Skeleton variant="text" lines={lines} />
    </div>
  )
}
