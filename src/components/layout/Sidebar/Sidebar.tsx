import React, { useState } from 'react'
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
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
  /** Compact icon/logo shown in the header area when the sidebar is collapsed */
  collapsedIcon?: React.ReactNode
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
    <li className="relative">
      <a
        href={item.href}
        onClick={handleClick}
        title={collapsed ? item.label : undefined}
        aria-current={item.active ? 'page' : undefined}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg cursor-pointer text-sm font-medium',
          'transition-all duration-150 outline-none',
          collapsed
            ? 'justify-center w-10 h-10 mx-auto'
            : 'px-3 py-2.5',
          item.active
            ? 'bg-white/10 text-white'
            : 'text-sidebar-text hover:bg-white/8 hover:text-white',
          depth > 0 && !collapsed && 'ml-3 text-xs'
        )}
      >
        {/* Active left accent bar */}
        {item.active && !collapsed && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary" />
        )}

        {item.icon && (
          <span
            className={cn(
              'flex-shrink-0 flex items-center justify-center transition-colors',
              collapsed ? 'w-5 h-5' : 'w-4 h-4',
              item.active ? 'text-primary' : 'text-sidebar-icon group-hover:text-white'
            )}
          >
            {item.icon}
          </span>
        )}

        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && (
              <span className="ml-auto text-[10px] font-semibold bg-primary/20 text-primary rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center leading-4">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown
                size={13}
                className={cn(
                  'ml-auto flex-shrink-0 text-sidebar-icon transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {collapsed && (
          <span
            role="tooltip"
            className={cn(
              'pointer-events-none absolute left-full ml-3 z-50',
              'whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
              'before:absolute before:right-full before:top-1/2 before:-translate-y-1/2',
              'before:border-4 before:border-transparent before:border-r-gray-900'
            )}
          >
            {item.label}
            {item.badge !== undefined && (
              <span className="ml-1.5 bg-primary/30 text-primary rounded-full px-1.5 py-0.5 text-[10px]">
                {item.badge}
              </span>
            )}
          </span>
        )}
      </a>

      {hasChildren && expanded && !collapsed && (
        <ul className="mt-0.5 ml-3 pl-3 border-l border-white/10 space-y-0.5">
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
  collapsedIcon,
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
          'relative flex flex-col h-full bg-sidebar',
          'transition-[width] duration-300 ease-in-out will-change-[width]',
          collapsed
            ? 'w-[var(--sidebar-collapsed-width)]'
            : 'w-[var(--sidebar-width)]',
          overlay && 'fixed top-0 left-0 bottom-0',
          overlay && !open && '-translate-x-full',
          'z-sidebar',
          className
        )}
      >
        {/* ── Header — only rendered when content is provided ── */}
        {(header || collapsedIcon) && (
          <div
            className={cn(
              'flex-shrink-0 flex items-center border-b border-white/8',
              collapsed ? 'justify-center h-16 px-0' : 'px-4 h-16'
            )}
          >
            {/* Expanded: full header content */}
            {!collapsed && (
              <div className="flex-1 min-w-0 overflow-hidden">
                {header}
              </div>
            )}

            {/* Collapsed: compact icon */}
            {collapsed && (
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/8">
                {collapsedIcon}
              </div>
            )}
          </div>
        )}

        {/* ── Nav Items ───────────────────────────── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2">
          <ul className={cn('space-y-0.5', collapsed && 'flex flex-col items-center')}>
            {items.map((item) => (
              <SidebarItemComponent
                key={item.id}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>

        {/* ── Footer — optional, always at bottom ── */}
        {footer && (
          <div
            className={cn(
              'flex-shrink-0 border-t border-white/8 transition-all duration-300',
              collapsed ? 'px-2 py-3' : 'px-4 py-3'
            )}
          >
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                collapsed ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100'
              )}
            >
              {footer}
            </div>
          </div>
        )}

        {/* ── Floating collapse tab on right edge ── */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'absolute -right-3',
            (header || collapsedIcon) ? 'top-[4.5rem]' : 'top-3',
            'z-10 flex items-center justify-center',
            'w-6 h-6 rounded-full',
            'bg-sidebar border border-white/15 shadow-md',
            'text-sidebar-text hover:text-white hover:bg-primary hover:border-primary',
            'transition-all duration-200 hover:scale-110',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          )}
        >
          {collapsed
            ? <PanelLeftOpen size={12} />
            : <PanelLeftClose size={12} />}
        </button>
      </aside>
    </>
  )
}
