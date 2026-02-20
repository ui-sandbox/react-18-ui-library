import React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '../../../utils/cn'

export type TabsVariant = 'underline' | 'pill' | 'card'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  badge?: string | number
}

export interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  children?: React.ReactNode
  className?: string
  listClassName?: string
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = 'underline',
  children,
  className,
  listClassName,
}: TabsProps) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={cn('w-full', className)}
    >
      <RadixTabs.List
        className={cn(
          'flex',
          variant === 'underline' && 'border-b border-border gap-0',
          variant === 'pill' && 'bg-surface rounded-lg p-1 gap-1 w-fit',
          variant === 'card' && 'border-b border-border gap-0',
          listClassName
        )}
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors outline-none cursor-pointer',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variant === 'underline' && [
                'px-4 py-2.5 border-b-2 border-transparent -mb-px',
                'text-text-muted hover:text-text hover:border-border',
                'data-[state=active]:text-primary data-[state=active]:border-primary',
              ],
              variant === 'pill' && [
                'px-3 py-1.5 rounded-md',
                'text-text-muted hover:text-text hover:bg-surface-hover',
                'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
              ],
              variant === 'card' && [
                'px-4 py-2.5 border border-transparent border-b-0 rounded-t-md -mb-px',
                'text-text-muted hover:text-text hover:bg-surface-hover',
                'data-[state=active]:bg-surface data-[state=active]:text-text data-[state=active]:border-border',
              ]
            )}
          >
            {item.icon && <span className="w-4 h-4 flex items-center">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && (
              <span className="ml-1 text-xs bg-primary/10 text-primary rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                {item.badge}
              </span>
            )}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  )
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <RadixTabs.Content
      value={value}
      className={cn('outline-none mt-4', className)}
    >
      {children}
    </RadixTabs.Content>
  )
}
