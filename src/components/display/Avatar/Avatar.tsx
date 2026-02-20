import React, { useState } from 'react'
import { User } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  icon?: React.ReactNode
  size?: AvatarSize
  status?: AvatarStatus
  rounded?: boolean
  className?: string
}

export interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, { container: string; text: string; icon: number }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', icon: 12 },
  sm: { container: 'w-8 h-8', text: 'text-sm', icon: 14 },
  md: { container: 'w-10 h-10', text: 'text-sm', icon: 16 },
  lg: { container: 'w-12 h-12', text: 'text-base', icon: 20 },
  xl: { container: 'w-16 h-16', text: 'text-lg', icon: 24 },
  '2xl': { container: 'w-20 h-20', text: 'text-xl', icon: 28 },
}

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-text-muted',
  away: 'bg-warning',
  busy: 'bg-error',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f59e0b', '#10b981', '#3b82f6', '#06b6d4',
  ]
  return colors[Math.abs(hash) % colors.length]
}

export function Avatar({
  src,
  alt,
  name,
  icon,
  size = 'md',
  status,
  rounded = true,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const sz = sizeClasses[size]
  const initials = name ? getInitials(name) : null
  const bgColor = name ? stringToColor(name) : undefined

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden',
          sz.container,
          rounded ? 'rounded-full' : 'rounded-md',
          !src || imgError ? 'text-white' : ''
        )}
        style={{ backgroundColor: !src || imgError ? bgColor ?? 'var(--color-secondary)' : undefined }}
        aria-label={alt ?? name}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt ?? name ?? ''}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span className={cn('font-semibold select-none', sz.text)}>{initials}</span>
        ) : icon ? (
          <span>{icon}</span>
        ) : (
          <User size={sz.icon} />
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-surface',
            statusColors[status],
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
          )}
          aria-label={status}
        />
      )}
    </div>
  )
}

export function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max
  const sz = sizeClasses[size]

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((avatar, i) => (
        <div key={avatar.src ?? avatar.name ?? i} className="-ml-2 first:ml-0 ring-2 ring-surface rounded-full">
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            '-ml-2 flex items-center justify-center rounded-full bg-surface-hover border-2 border-surface text-text-muted font-medium',
            sz.container,
            sz.text
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
