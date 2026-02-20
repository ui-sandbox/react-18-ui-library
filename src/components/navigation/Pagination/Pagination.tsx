import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface PaginationProps {
  page: number
  pageSize?: number
  total: number
  siblingCount?: number
  showFirstLast?: boolean
  onPageChange: (page: number) => void
  className?: string
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function Pagination({
  page,
  pageSize = 10,
  total,
  siblingCount = 1,
  showFirstLast = true,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const pages = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5
    if (totalPages <= totalPageNumbers) return range(1, totalPages)

    const leftSibling = Math.max(page - siblingCount, 1)
    const rightSibling = Math.min(page + siblingCount, totalPages)
    const showLeftDots = leftSibling > 2
    const showRightDots = rightSibling < totalPages - 1

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + siblingCount * 2)
      return [...leftRange, '...', totalPages]
    }
    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (2 + siblingCount * 2), totalPages)
      return [1, '...', ...rightRange]
    }
    return [1, '...', ...range(leftSibling, rightSibling), '...', totalPages]
  }, [page, siblingCount, totalPages])

  const btnBase = 'flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium transition-colors'
  const btnActive = 'bg-primary text-primary-foreground'
  const btnInactive = 'text-text-muted hover:bg-surface-hover hover:text-text'
  const btnDisabled = 'opacity-40 cursor-not-allowed pointer-events-none'

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={cn(btnBase, page === 1 ? btnDisabled : btnInactive)}
          aria-label="First page"
        >
          <ChevronsLeft size={14} />
        </button>
      )}
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={cn(btnBase, page === 1 ? btnDisabled : btnInactive)}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="flex items-center justify-center w-8 h-8 text-text-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p as number)}
            className={cn(btnBase, page === p ? btnActive : btnInactive)}
            aria-label={`Page ${p}`}
            aria-current={page === p ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(btnBase, page === totalPages ? btnDisabled : btnInactive)}
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </button>
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className={cn(btnBase, page === totalPages ? btnDisabled : btnInactive)}
          aria-label="Last page"
        >
          <ChevronsRight size={14} />
        </button>
      )}
    </nav>
  )
}
