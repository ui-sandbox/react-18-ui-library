import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cn } from '../../../utils/cn'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  placement?: TooltipPlacement
  delay?: number
  arrow?: boolean
  className?: string
  contentClassName?: string
  disabled?: boolean
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 200,
  arrow = true,
  className,
  contentClassName,
  disabled = false,
}: TooltipProps) {
  if (disabled) return <>{children}</>

  return (
    <RadixTooltip.Provider delayDuration={delay}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild className={className}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={placement}
            sideOffset={6}
            className={cn(
              'z-tooltip px-2.5 py-1.5 rounded-md text-xs font-medium',
              'bg-text text-surface shadow-md max-w-xs',
              'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              contentClassName
            )}
          >
            {content}
            {arrow && (
              <RadixTooltip.Arrow className="fill-text" />
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
