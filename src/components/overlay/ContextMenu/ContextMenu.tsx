import React from 'react'
import * as RadixContextMenu from '@radix-ui/react-context-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface ContextMenuItem {
  type?: 'item' | 'separator' | 'label' | 'checkbox' | 'radio'
  label?: string
  icon?: React.ReactNode
  shortcut?: string
  disabled?: boolean
  destructive?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  onClick?: () => void
  children?: ContextMenuItem[]
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  children: React.ReactNode
  className?: string
}

const itemBase = cn(
  'flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer outline-none select-none',
  'transition-colors',
  'data-[highlighted]:bg-surface-hover data-[highlighted]:text-text',
  'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none'
)

function stableKey(item: ContextMenuItem, i: number): string {
  return `${item.type ?? 'item'}-${item.label ?? ''}-${i}`
}

function renderItems(items: ContextMenuItem[]) {
  return items.map((item, i) => {
    if (item.type === 'separator') {
      return <RadixContextMenu.Separator key={`separator-${i}`} className="my-1 h-px bg-border" />
    }

    if (item.type === 'label') {
      return (
        <RadixContextMenu.Label key={stableKey(item, i)} className="px-2 py-1 text-xs font-semibold text-text-muted uppercase tracking-wide">
          {item.label}
        </RadixContextMenu.Label>
      )
    }

    if (item.type === 'checkbox') {
      return (
        <RadixContextMenu.CheckboxItem
          key={stableKey(item, i)}
          checked={item.checked}
          onCheckedChange={item.onCheckedChange}
          disabled={item.disabled}
          className={cn(itemBase, 'pl-7 relative', item.destructive && 'text-error')}
        >
          <RadixContextMenu.ItemIndicator className="absolute left-2">
            <Check size={12} />
          </RadixContextMenu.ItemIndicator>
          {item.label}
        </RadixContextMenu.CheckboxItem>
      )
    }

    if (item.children && item.children.length > 0) {
      return (
        <RadixContextMenu.Sub key={stableKey(item, i)}>
          <RadixContextMenu.SubTrigger
            disabled={item.disabled}
            className={cn(itemBase, item.destructive && 'text-error')}
          >
            {item.icon && <span className="w-4 h-4 flex items-center">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            <ChevronRight size={12} className="ml-auto text-text-muted" />
          </RadixContextMenu.SubTrigger>
          <RadixContextMenu.Portal>
            <RadixContextMenu.SubContent
              className="z-dropdown bg-surface border border-border rounded-lg shadow-lg p-1 min-w-[10rem]"
              sideOffset={2}
              alignOffset={-4}
            >
              {renderItems(item.children)}
            </RadixContextMenu.SubContent>
          </RadixContextMenu.Portal>
        </RadixContextMenu.Sub>
      )
    }

    return (
      <RadixContextMenu.Item
        key={stableKey(item, i)}
        disabled={item.disabled}
        onSelect={item.onClick}
        className={cn(itemBase, item.destructive ? 'text-error' : 'text-text')}
      >
        {item.icon && <span className="w-4 h-4 flex items-center">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {item.shortcut && (
          <span className="ml-auto text-xs text-text-muted">{item.shortcut}</span>
        )}
      </RadixContextMenu.Item>
    )
  })
}

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger asChild className={className}>
        {children}
      </RadixContextMenu.Trigger>

      <RadixContextMenu.Portal>
        <RadixContextMenu.Content
          className={cn(
            'z-dropdown bg-surface border border-border rounded-lg shadow-lg p-1 min-w-[10rem]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
          )}
        >
          {renderItems(items)}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  )
}
