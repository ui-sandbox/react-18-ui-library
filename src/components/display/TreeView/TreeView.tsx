import React, { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface TreeViewItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  children?: TreeViewItem[]
  disabled?: boolean
  badge?: React.ReactNode
}

export interface TreeViewProps {
  items: TreeViewItem[]
  selectedId?: string
  onSelect?: (id: string, item: TreeViewItem) => void
  defaultExpandedIds?: string[]
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
  multiSelect?: boolean
  selectedIds?: string[]
  onMultiSelect?: (ids: string[]) => void
  indent?: number
  className?: string
}

interface TreeNodeProps {
  item: TreeViewItem
  depth: number
  indent: number
  selectedId?: string
  selectedIds?: string[]
  expandedIds: string[]
  onSelect?: (id: string, item: TreeViewItem) => void
  onToggle: (id: string) => void
  multiSelect?: boolean
}

function TreeNode({
  item,
  depth,
  indent,
  selectedId,
  selectedIds,
  expandedIds,
  onSelect,
  onToggle,
  multiSelect,
}: TreeNodeProps) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedIds.includes(item.id)
  const isSelected = multiSelect
    ? (selectedIds ?? []).includes(item.id)
    : selectedId === item.id

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <div
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer select-none',
          'transition-colors text-sm',
          isSelected
            ? 'bg-primary text-primary-foreground'
            : 'text-text hover:bg-surface-hover',
          item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
        style={{ paddingLeft: `${depth * indent + 8}px` }}
        onClick={() => {
          if (item.disabled) return
          if (hasChildren) onToggle(item.id)
          onSelect?.(item.id, item)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (item.disabled) return
            if (hasChildren) onToggle(item.id)
            onSelect?.(item.id, item)
          }
        }}
        tabIndex={item.disabled ? -1 : 0}
        role="button"
      >
        {hasChildren ? (
          <span className="flex-shrink-0 text-text-muted">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}
        {item.icon && (
          <span className={cn('flex-shrink-0', isSelected ? 'text-primary-foreground' : 'text-text-muted')}>
            {item.icon}
          </span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge && <span className="flex-shrink-0">{item.badge}</span>}
      </div>

      {hasChildren && isExpanded && (
        <ul role="group" className="mt-0.5">
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              indent={indent}
              selectedId={selectedId}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
              multiSelect={multiSelect}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function TreeView({
  items,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  expandedIds: controlledExpandedIds,
  onExpandedChange,
  multiSelect = false,
  selectedIds,
  onMultiSelect,
  indent = 16,
  className,
}: TreeViewProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpandedIds)
  const expandedIds = controlledExpandedIds ?? internalExpandedIds

  const handleToggle = (id: string) => {
    const next = expandedIds.includes(id)
      ? expandedIds.filter((e) => e !== id)
      : [...expandedIds, id]
    setInternalExpandedIds(next)
    onExpandedChange?.(next)
  }

  const handleSelect = (id: string, item: TreeViewItem) => {
    if (multiSelect && onMultiSelect) {
      const current = selectedIds ?? []
      const next = current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id]
      onMultiSelect(next)
    } else {
      onSelect?.(id, item)
    }
  }

  return (
    <ul role="tree" className={cn('space-y-0.5', className)}>
      {items.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          depth={0}
          indent={indent}
          selectedId={selectedId}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          onSelect={handleSelect}
          onToggle={handleToggle}
          multiSelect={multiSelect}
        />
      ))}
    </ul>
  )
}
