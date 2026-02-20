import React, { useState, useEffect, useRef, useCallback, useId } from 'react'
import { createPortal } from 'react-dom'
import { Search, X, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { Kbd } from '../../typography/Kbd/Kbd'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  group?: string
  disabled?: boolean
  onSelect: () => void
}

export interface CommandGroup {
  id: string
  label: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  items?: CommandItem[]
  groups?: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  loading?: boolean
  onSearch?: (query: string) => void
  hotkey?: string
  maxHeight?: number
  className?: string
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-sm">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export function CommandPalette({
  open,
  onClose,
  items = [],
  groups = [],
  placeholder = 'Search commands…',
  emptyMessage = 'No results found.',
  loading = false,
  onSearch,
  maxHeight = 400,
  className,
}: CommandPaletteProps) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Flatten all items for keyboard nav
  const allItems = React.useMemo(() => {
    const flatGroups = groups.flatMap((g) =>
      g.items.filter((item) =>
        !item.disabled &&
        (item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()))
      )
    )
    const flatItems = items.filter(
      (item) =>
        !item.disabled &&
        (item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()))
    )
    return [...flatItems, ...flatGroups]
  }, [items, groups, query])

  const filteredGroups = React.useMemo(() => {
    if (groups.length === 0) return []
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) =>
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((g) => g.items.length > 0)
  }, [groups, query])

  const filteredItems = React.useMemo(() => {
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
    )
  }, [items, query])

  const hasResults = filteredItems.length > 0 || filteredGroups.length > 0

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    onSearch?.(query)
  }, [query, onSearch])

  const handleSelect = useCallback((item: CommandItem) => {
    if (item.disabled) return
    item.onSelect()
    onClose()
  }, [onClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, allItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = allItems[activeIndex]
      if (item) handleSelect(item)
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  if (!open) return null
  if (typeof document === 'undefined') return null

  // Build a flat ordered list for index-based rendering — stable, not mutated during render
  const orderedItems: CommandItem[] = [
    ...filteredItems,
    ...filteredGroups.flatMap((g) => g.items),
  ]

  const renderItem = (item: CommandItem) => {
    const idx = orderedItems.indexOf(item)
    const isActive = idx === activeIndex
    return (
      <div
        key={item.id}
        data-active={isActive}
        role="option"
        aria-selected={isActive}
        aria-disabled={item.disabled}
        onClick={() => !item.disabled && handleSelect(item)}
        onMouseEnter={() => setActiveIndex(idx)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors',
          isActive ? 'bg-primary text-primary-foreground' : 'text-text hover:bg-surface-hover',
          item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
        )}
      >
        {item.icon && (
          <span className={cn('flex-shrink-0', isActive ? 'text-primary-foreground' : 'text-text-muted')}>
            {item.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {highlight(item.label, query)}
          </div>
          {item.description && (
            <div className={cn('text-xs truncate', isActive ? 'text-primary-foreground/70' : 'text-text-muted')}>
              {highlight(item.description, query)}
            </div>
          )}
        </div>
        {item.shortcut && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {item.shortcut.map((k) => (
              <Kbd key={k} size="sm">{k}</Kbd>
            ))}
          </div>
        )}
        <ChevronRight size={14} className={cn('flex-shrink-0', isActive ? 'text-primary-foreground/70' : 'text-text-muted')} />
      </div>
    )
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className={cn(
          'relative w-full max-w-lg bg-surface rounded-xl shadow-2xl border border-border overflow-hidden',
          className
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          {loading ? (
            <Loader2 size={18} className="text-text-muted animate-spin flex-shrink-0" />
          ) : (
            <Search size={18} className="text-text-muted flex-shrink-0" />
          )}
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="text"
            role="combobox"
            aria-expanded={true}
            aria-controls={`${id}-list`}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-text placeholder:text-text-muted outline-none text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-text-muted hover:text-text transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <Kbd size="sm">Esc</Kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          className="overflow-y-auto p-2"
          style={{ maxHeight }}
        >
          {loading && !hasResults ? (
            <div className="flex items-center justify-center py-8 text-text-muted text-sm gap-2">
              <Loader2 size={16} className="animate-spin" />
              Searching…
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-text-muted text-sm">{emptyMessage}</div>
          ) : (
            <>
              {filteredItems.map(renderItem)}
              {filteredGroups.map((group) => (
                <div key={group.id}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.items.map(renderItem)}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-2 border-t border-border text-xs text-text-muted">
          <span className="flex items-center gap-1"><Kbd size="sm">↑</Kbd><Kbd size="sm">↓</Kbd> Navigate</span>
          <span className="flex items-center gap-1"><Kbd size="sm">↵</Kbd> Select</span>
          <span className="flex items-center gap-1"><Kbd size="sm">Esc</Kbd> Close</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { open, setOpen, toggle: () => setOpen((v) => !v) }
}
