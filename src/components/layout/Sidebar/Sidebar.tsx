import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
  badge?: string | number
  children?: SidebarItem[]
}

export interface SidebarProps {
  items?: SidebarItem[]
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  overlay?: boolean
  open?: boolean
  onClose?: () => void
  className?: string
}

function SidebarItemComponent({
  item,
  collapsed,
  depth = 0,
}: {
  item: SidebarItem
  collapsed: boolean
  depth?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const handleClick = () => {
    if (hasChildren) setExpanded((v) => !v)
    item.onClick?.()
  }

  return (
    <li>
      <a
        href={item.href}
        onClick={handleClick}
        title={collapsed ? item.label : undefined}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm',
          'text-sidebar-text hover:bg-sidebar-active-bg hover:text-white',
          item.active && 'bg-sidebar-active-bg text-white',
          depth > 0 && 'ml-4',
          collapsed && 'justify-center px-2'
        )}
      >
        {item.icon && (
          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && (
              <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <span className="ml-auto">
                {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            )}
          </>
        )}
      </a>
      {hasChildren && expanded && !collapsed && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              collapsed={collapsed}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Sidebar({
  items = [],
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  header,
  footer,
  overlay = false,
  open = true,
  onClose,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const collapsed = controlledCollapsed ?? internalCollapsed

  const toggleCollapsed = () => {
    const next = !collapsed
    setInternalCollapsed(next)
    onCollapsedChange?.(next)
  }

  return (
    <>
      {overlay && open && (
        <div
          className="fixed inset-0 bg-overlay md:hidden"
          style={{ zIndex: 'calc(var(--z-sidebar) - 1)' }}
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'flex flex-col h-full bg-sidebar transition-all duration-300',
          collapsed
            ? 'w-[var(--sidebar-collapsed-width)]'
            : 'w-[var(--sidebar-width)]',
          overlay && 'fixed top-0 left-0 bottom-0',
          overlay && !open && '-translate-x-full',
          'z-sidebar',
          className
        )}
      >
        {/* Header */}
        {header && (
          <div className={cn('flex-shrink-0 p-4', collapsed && 'px-2')}>
            {header}
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <ul className="space-y-1">
            {items.map((item) => (
              <SidebarItemComponent
                key={item.id}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {footer && (
          <div className={cn('flex-shrink-0 p-4 border-t border-border/20', collapsed && 'px-2')}>
            {footer}
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="flex-shrink-0 flex items-center justify-center h-10 border-t border-border/20 text-sidebar-text hover:text-white hover:bg-sidebar-active-bg transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  )
}
