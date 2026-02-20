import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { Checkbox } from '../../inputs/Checkbox/Checkbox'
import { Select } from '../../inputs/Select/Select'

export type SortDirection = 'asc' | 'desc' | null

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string
  header: React.ReactNode
  accessor?: (row: T) => React.ReactNode
  sortValue?: (row: T) => string | number
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  className?: string
  pin?: 'left' | 'right'
}

export interface DataTablePagination {
  mode: 'client' | 'server'
  pageSize?: number
  pageSizeOptions?: number[]
  totalRows?: number
  page?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[]
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
  pagination?: DataTablePagination
  toolbar?: React.ReactNode
  rowActions?: (row: T) => React.ReactNode
  caption?: string
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export function DataTable<T = Record<string, unknown>>({
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
  pagination,
  toolbar,
  rowActions,
  caption,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDirection }>({ key: '', dir: null })
  const [internalPage, setInternalPage] = useState(1)
  const [internalPageSize, setInternalPageSize] = useState(pagination?.pageSize ?? 10)

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
      // Priority: explicit sortValue fn > raw row field (never stringify React elements from accessor)
      const getRaw = (row: T): string | number => {
        if (col.sortValue) return col.sortValue(row)
        const raw = (row as Record<string, unknown>)[effectiveSortKey]
        return typeof raw === 'number' ? raw : String(raw ?? '')
      }
      const aVal = getRaw(a)
      const bVal = getRaw(b)
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return effectiveSortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      return effectiveSortDir === 'asc' ? cmp : -cmp
    })
  }, [data, effectiveSortKey, effectiveSortDir, columns])

  // Pagination
  const isClientPagination = pagination?.mode === 'client'
  const isServerPagination = pagination?.mode === 'server'
  const hasPagination = !!pagination

  const currentPage = isServerPagination && pagination.page !== undefined ? pagination.page : internalPage
  const pageSize = internalPageSize
  const pageSizeOptions = pagination?.pageSizeOptions ?? PAGE_SIZE_OPTIONS
  const totalRows = isServerPagination ? (pagination.totalRows ?? data.length) : sortedData.length
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))

  const pagedData = useMemo(() => {
    if (!hasPagination || isServerPagination) return sortedData
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, hasPagination, isServerPagination, currentPage, pageSize])

  const displayData = hasPagination ? pagedData : sortedData

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages))
    if (isServerPagination) {
      pagination.onPageChange?.(clamped)
    } else {
      setInternalPage(clamped)
    }
  }

  const changePageSize = (size: number) => {
    setInternalPageSize(size)
    setInternalPage(1)
    if (isServerPagination) {
      pagination.onPageSizeChange?.(size)
      pagination.onPageChange?.(1)
    }
  }

  // Selection
  const allKeys = displayData.map(keyExtractor)
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

  const startRow = hasPagination ? (currentPage - 1) * pageSize + 1 : 1
  const endRow = hasPagination ? Math.min(currentPage * pageSize, totalRows) : totalRows

  return (
    <div className={cn('flex flex-col gap-0 w-full', className)}>
      {/* Toolbar */}
      {toolbar && (
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          {toolbar}
        </div>
      )}

      {/* Table wrapper */}
      <div className={cn('w-full overflow-auto rounded-lg', bordered && 'border border-border')}>
        <table className="w-full text-sm border-collapse">
          {caption && <caption className="text-xs text-text-muted pb-2 text-left">{caption}</caption>}
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
              {rowActions && (
                <th className={cn('text-right font-semibold text-text-muted whitespace-nowrap', cellPad)}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize > 5 ? 5 : pageSize }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  {selectable && <td className={cellPad}><div className="h-4 w-4 rounded bg-surface-hover animate-pulse" /></td>}
                  {columns.map((col) => (
                    <td key={col.key} className={cellPad}>
                      <div className="h-4 rounded bg-surface-hover animate-pulse" style={{ width: `${60 + (col.key.length * 7) % 40}%` }} />
                    </td>
                  ))}
                  {rowActions && <td className={cellPad}><div className="h-4 w-16 rounded bg-surface-hover animate-pulse ml-auto" /></td>}
                </tr>
              ))
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="text-center py-12 text-text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((row, i) => {
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
                    {rowActions && (
                      <td className={cn(cellPad, 'text-right')}>
                        {rowActions(row)}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {hasPagination && (
        <div className="flex items-center justify-between gap-4 px-1 pt-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="h-7 px-2 rounded-md border border-border bg-surface text-text text-xs outline-none focus:border-border-focus"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 text-sm text-text-muted">
            <span className="mr-2">
              {loading ? '…' : `${startRow}–${endRow} of ${totalRows}`}
            </span>
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1 || loading}
              className="p-1 rounded hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="p-1 rounded hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page: number
                if (totalPages <= 5) {
                  page = i + 1
                } else if (currentPage <= 3) {
                  page = i + 1
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i
                } else {
                  page = currentPage - 2 + i
                }
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={loading}
                    className={cn(
                      'w-7 h-7 rounded text-xs font-medium transition-colors',
                      page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-surface-hover text-text-muted'
                    )}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="p-1 rounded hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="p-1 rounded hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
