import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface NavbarLink {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  icon?: React.ReactNode
}

export interface NavbarProps {
  logo?: React.ReactNode
  links?: NavbarLink[]
  actions?: React.ReactNode
  sticky?: boolean
  fixed?: boolean
  bordered?: boolean
  className?: string
  onMenuToggle?: (open: boolean) => void
}

export function Navbar({
  logo,
  links = [],
  actions,
  sticky = false,
  fixed = false,
  bordered = true,
  className,
  onMenuToggle,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleMenuToggle = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    onMenuToggle?.(next)
  }

  return (
    <header
      className={cn(
        'w-full bg-navbar font-base',
        sticky && 'sticky top-0',
        fixed && 'fixed top-0 left-0 right-0',
        bordered && 'border-b border-border',
        'z-navbar',
        className
      )}
      style={{ height: 'var(--navbar-height)' }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo */}
        {logo && <div className="flex-shrink-0">{logo}</div>}

        {/* Desktop Links */}
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={link.onClick}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
                  link.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                )}
              >
                {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        {actions && (
          <div className="hidden md:flex items-center gap-2">{actions}</div>
        )}

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-navbar px-4 pb-4">
          <nav className="flex flex-col gap-1 mt-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => {
                  link.onClick?.()
                  setMobileOpen(false)
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
                  link.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                )}
              >
                {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                {link.label}
              </a>
            ))}
          </nav>
          {actions && <div className="flex items-center gap-2 mt-3">{actions}</div>}
        </div>
      )}
    </header>
  )
}
