import React from 'react'
import { cn } from '../../../utils/cn'

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
  smCols?: GridCols
  mdCols?: GridCols
  lgCols?: GridCols
  gap?: GridGap
  autoFill?: boolean
  minColWidth?: string
}

const colClasses: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

const smColClasses: Record<GridCols, string> = {
  1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6',
  7: 'sm:grid-cols-7', 8: 'sm:grid-cols-8', 9: 'sm:grid-cols-9',
  10: 'sm:grid-cols-10', 11: 'sm:grid-cols-11', 12: 'sm:grid-cols-12',
}

const mdColClasses: Record<GridCols, string> = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
  4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6',
  7: 'md:grid-cols-7', 8: 'md:grid-cols-8', 9: 'md:grid-cols-9',
  10: 'md:grid-cols-10', 11: 'md:grid-cols-11', 12: 'md:grid-cols-12',
}

const lgColClasses: Record<GridCols, string> = {
  1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7', 8: 'lg:grid-cols-8', 9: 'lg:grid-cols-9',
  10: 'lg:grid-cols-10', 11: 'lg:grid-cols-11', 12: 'lg:grid-cols-12',
}

const gapClasses: Record<GridGap, string> = {
  none: 'gap-0', xs: 'gap-1', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8',
}

export function Grid({
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = 'md',
  autoFill = false,
  minColWidth = '200px',
  className,
  style,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        !autoFill && colClasses[cols],
        !autoFill && smCols && smColClasses[smCols],
        !autoFill && mdCols && mdColClasses[mdCols],
        !autoFill && lgCols && lgColClasses[lgCols],
        gapClasses[gap],
        className
      )}
      style={autoFill ? { gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))`, ...style } : style}
      {...props}
    >
      {children}
    </div>
  )
}
