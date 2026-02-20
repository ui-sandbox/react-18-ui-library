import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  maxItems?: number
  className?: string
}

export function Breadcrumb({
  items,
  separator = <ChevronRight size={14} />,
  maxItems,
  className,
}: BreadcrumbProps) {
  let displayItems = items
  let truncated = false

  if (maxItems && items.length > maxItems) {
    truncated = true
    displayItems = [
      items[0],
      { label: '...', href: undefined },
      ...items.slice(-(maxItems - 2)),
    ]
  }

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 flex-wrap">
        {displayItems.map((item, i) => {
          const isLast = i === displayItems.length - 1
          const isEllipsis = truncated && item.label === '...'

          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-text-muted flex items-center" aria-hidden="true">
                  {separator}
                </span>
              )}
              {isLast || isEllipsis ? (
                <span
                  className={cn(
                    'text-sm',
                    isLast ? 'text-text font-medium' : 'text-text-muted'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
