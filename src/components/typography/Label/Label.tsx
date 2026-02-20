import React from 'react'
import * as RadixLabel from '@radix-ui/react-label'
import { cn } from '../../../utils/cn'

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof RadixLabel.Root> {
  required?: boolean
  optional?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export function Label({ required, optional, size = 'md', className, children, ...props }: LabelProps) {
  return (
    <RadixLabel.Root
      className={cn(
        'font-medium text-text leading-none cursor-default',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
      {optional && <span className="text-text-muted ml-1 font-normal">(optional)</span>}
    </RadixLabel.Root>
  )
}
