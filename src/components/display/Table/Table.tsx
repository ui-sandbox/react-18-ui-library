import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { Checkbox } from '../../inputs/Checkbox/Checkbox'

export type SortDirection = 'asc' | 'desc' | null

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: React.ReactNode
  accessor?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string
  selectable?: boolean
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  sortKey?: string
  sortDirection?: SortDirection
  onSortChange?: (key: string, direction: SortDirection) => void
  loading?: boolean
  emptyMessage?: React.ReactNode
  stickyHeader?: boolean
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  compact?: boolean
  className?: string
}

const SKELETON_WIDTHS = [65, 80, 55, 75, 90, 60, 70, 85, 50, 78]

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  sortKey,
  sortDirection,
  onSortChange,
  loading = false,
  emptyMessage = 'No data available',
  stickyHeader = false,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  className,
}: TableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDirection }>({
    key: '',
    dir: null,
  })

  const effectiveSortKey = sortKey ?? internalSort.key
  const effectiveSortDir = sortDirection ?? internalSort.dir

  const handleSort = (key: string) => {
    let next: SortDirection = 'asc'
    if (effectiveSortKey === key) {
      next = effectiveSortDir === 'asc' ? 'desc' : effectiveSortDir === 'desc' ? null : 'asc'
    }
    if (onSortChange) {
      onSortChange(key, next)
    } else {
      setInternalSort({ key, dir: next })
    }
  }

  const sortedData = useMemo(() => {
    if (!effectiveSortKey || !effectiveSortDir) return data
    const col = columns.find((c) => c.key === effectiveSortKey)
    if (!col) return data
    return [...data].sort((a, b) => {
      const aVal = col.accessor ? String(col.accessor(a) ?? '') : String((a as Record<string, unknown>)[effectiveSortKey] ?? '')
      const bVal = col.accessor ? String(col.accessor(b) ?? '') : String((b as Record<string, unknown>)[effectiveSortKey] ?? '')
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true })
      return effectiveSortDir === 'asc' ? cmp : -cmp
    })
  }, [data, effectiveSortKey, effectiveSortDir, columns])

  const allKeys = sortedData.map(keyExtractor)
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k))
  const someSelected = allKeys.some((k) => selectedKeys.includes(k)) && !allSelected

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.(selectedKeys.filter((k) => !allKeys.includes(k)))
    } else {
      onSelectionChange?.([...new Set([...selectedKeys, ...allKeys])])
    }
  }

  const toggleRow = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelectionChange?.(selectedKeys.filter((k) => k !== key))
    } else {
      onSelectionChange?.([...selectedKeys, key])
    }
  }

  const cellPad = compact ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <div className={cn('w-full overflow-auto rounded-lg', bordered && 'border border-border', className)}>
      <table className="w-full text-sm border-collapse">
        <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
          <tr className="bg-surface-hover border-b border-border">
            {selectable && (
              <th className={cn('w-10', cellPad)}>
                <Checkbox
                  checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'text-left font-semibold text-text-muted whitespace-nowrap',
                  cellPad,
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right',
                  col.sortable && 'cursor-pointer select-none hover:text-text',
                  col.className
                )}
                style={{ width: col.width }}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="flex-shrink-0">
                      {effectiveSortKey === col.key ? (
                        effectiveSortDir === 'asc' ? (
                          <ChevronUp size={14} />
                        ) : effectiveSortDir === 'desc' ? (
                          <ChevronDown size={14} />
                        ) : (
                          <ChevronsUpDown size={14} className="opacity-40" />
                        )
                      ) : (
                        <ChevronsUpDown size={14} className="opacity-40" />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={`skeleton-row-${i}`} className="border-b border-border">
                {selectable && <td className={cellPad}><div className="h-4 w-4 rounded bg-surface-hover animate-pulse" /></td>}
                {columns.map((col, ci) => (
                  <td key={col.key} className={cellPad}>
                    <div className="h-4 rounded bg-surface-hover animate-pulse" style={{ width: `${SKELETON_WIDTHS[(i * columns.length + ci) % SKELETON_WIDTHS.length]}%` }} />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-12 text-text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => {
              const key = keyExtractor(row, i)
              const isSelected = selectedKeys.includes(key)
              return (
                <tr
                  key={key}
                  className={cn(
                    'border-b border-border transition-colors',
                    striped && i % 2 === 1 && 'bg-surface-hover/50',
                    hoverable && 'hover:bg-surface-hover',
                    isSelected && 'bg-primary/5'
                  )}
                >
                  {selectable && (
                    <td className={cellPad}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(key)}
                        aria-label={`Select row ${i + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'text-text',
                        cellPad,
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                        col.className
                      )}
                    >
                      {col.accessor
                        ? col.accessor(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
