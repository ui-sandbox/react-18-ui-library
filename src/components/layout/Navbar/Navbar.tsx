import React, { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface NavbarLink {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  icon?: React.ReactNode
}

export interface NavbarProfileMenuItem {
  name: string
  href?: string
  onClick?: () => void
}

export interface NavbarProfile {
  name: string
  email?: string
  avatarUrl?: string
  menuItems?: NavbarProfileMenuItem[]
}

export interface NavbarProps {
  logo?: React.ReactNode
  links?: NavbarLink[]
  actions?: React.ReactNode
  profile?: NavbarProfile
  sticky?: boolean
  fixed?: boolean
  bordered?: boolean
  className?: string
  onMenuToggle?: (open: boolean) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}

export function Navbar({
  logo,
  links = [],
  actions,
  profile,
  sticky = false,
  fixed = false,
  bordered = true,
  className,
  onMenuToggle,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!profileOpen) return
    const handler = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileOpen])

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
            {links.map((link) => (
              <a
                key={`${link.label}-${link.href ?? ''}`}
                href={link.href}
                onClick={link.onClick}
                aria-current={link.active ? 'page' : undefined}
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

        {/* Profile */}
        {profile && (
          <div ref={profileRef} className="hidden md:flex items-center ml-2 relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className={cn(
                'flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors',
                'hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
              )}
            >
              {/* Avatar */}
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-border"
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0 ring-2 ring-border">
                  {getInitials(profile.name)}
                </span>
              )}
              {/* Name + email */}
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-medium text-text max-w-[120px] truncate">{profile.name}</span>
                {profile.email && (
                  <span className="text-xs text-text-muted max-w-[120px] truncate">{profile.email}</span>
                )}
              </div>
              {profile.menuItems && profile.menuItems.length > 0 && (
                <ChevronDown
                  size={14}
                  className={cn('text-text-muted transition-transform flex-shrink-0', profileOpen && 'rotate-180')}
                />
              )}
            </button>

            {/* Dropdown */}
            {profileOpen && profile.menuItems && profile.menuItems.length > 0 && (
              <div
                role="menu"
                className={cn(
                  'absolute right-0 top-full mt-1.5 min-w-[180px] bg-surface border border-border rounded-lg shadow-lg py-1 z-dropdown',
                  'animate-in fade-in-0 zoom-in-95'
                )}
              >
                {profile.menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    role="menuitem"
                    onClick={() => {
                      item.onClick?.()
                      setProfileOpen(false)
                    }}
                    className="flex items-center px-3 py-2 text-sm text-text hover:bg-surface-hover transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>
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
            {links.map((link) => (
              <a
                key={`mobile-${link.label}-${link.href ?? ''}`}
                href={link.href}
                aria-current={link.active ? 'page' : undefined}
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

          {/* Mobile profile */}
          {profile && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3 px-1 mb-2">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-border"
                  />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0 ring-2 ring-border">
                    {getInitials(profile.name)}
                  </span>
                )}
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-sm font-medium text-text truncate">{profile.name}</span>
                  {profile.email && (
                    <span className="text-xs text-text-muted truncate">{profile.email}</span>
                  )}
                </div>
              </div>
              {profile.menuItems && profile.menuItems.length > 0 && (
                <div className="flex flex-col gap-0.5">
                  {profile.menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        item.onClick?.()
                        setMobileOpen(false)
                      }}
                      className="flex items-center px-3 py-2 text-sm text-text-muted hover:text-text hover:bg-surface-hover rounded-md transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
