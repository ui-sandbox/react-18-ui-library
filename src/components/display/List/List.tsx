import React from 'react'
import { cn } from '../../../utils/cn'

export interface ListItemProps {
  id?: string
  primary: React.ReactNode
  secondary?: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  divider?: boolean
  className?: string
}

export interface ListProps {
  items?: ListItemProps[]
  ordered?: boolean
  divided?: boolean
  hoverable?: boolean
  compact?: boolean
  children?: React.ReactNode
  className?: string
}

export function ListItem({
  primary,
  secondary,
  leading,
  trailing,
  onClick,
  active,
  disabled,
  divider,
  className,
}: ListItemProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 px-3 py-2.5',
        onClick && !disabled && 'cursor-pointer hover:bg-surface-hover transition-colors',
        active && 'bg-primary/5 text-primary',
        disabled && 'opacity-50 cursor-not-allowed',
        divider && 'border-b border-border',
        className
      )}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {leading && (
        <div className="flex-shrink-0 flex items-center">{leading}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text truncate">{primary}</p>
        {secondary && (
          <p className="text-xs text-text-muted truncate mt-0.5">{secondary}</p>
        )}
      </div>
      {trailing && (
        <div className="flex-shrink-0 flex items-center">{trailing}</div>
      )}
    </li>
  )
}

export function List({
  items,
  ordered = false,
  divided = false,
  hoverable = true,
  compact = false,
  children,
  className,
}: ListProps) {
  const Tag = ordered ? 'ol' : 'ul'

  return (
    <Tag
      className={cn(
        'rounded-lg bg-surface border border-border overflow-hidden',
        divided && '[&>li]:border-b [&>li]:border-border [&>li:last-child]:border-0',
        compact && '[&>li]:py-1.5',
        className
      )}
    >
      {items
        ? items.map((item, i) => (
            <ListItem
              key={item.id ?? i}
              {...item}
              className={cn(!hoverable && 'cursor-default hover:bg-transparent', item.className)}
            />
          ))
        : children}
    </Tag>
  )
}
