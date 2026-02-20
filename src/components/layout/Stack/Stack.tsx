import React from 'react'
import { cn } from '../../../utils/cn'

export type StackDirection = 'row' | 'col'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection
  align?: StackAlign
  justify?: StackJustify
  gap?: StackGap
  wrap?: boolean
  inline?: boolean
}

const gapClasses: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyClasses: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

export function Stack({
  direction = 'col',
  align = 'stretch',
  justify = 'start',
  gap = 'md',
  wrap = false,
  inline = false,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        inline ? 'inline-flex' : 'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
