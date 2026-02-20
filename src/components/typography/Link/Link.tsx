import React from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type LinkUnderline = 'always' | 'hover' | 'none'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
  underline?: LinkUnderline
  color?: 'primary' | 'text' | 'muted' | 'inherit'
  showExternalIcon?: boolean
}

const underlineClasses: Record<LinkUnderline, string> = {
  always: 'underline underline-offset-2',
  hover: 'hover:underline underline-offset-2',
  none: 'no-underline',
}

const colorClasses = {
  primary: 'text-primary hover:text-primary-hover',
  text: 'text-text hover:text-text-muted',
  muted: 'text-text-muted hover:text-text',
  inherit: 'text-inherit',
}

export function Link({
  external = false,
  underline = 'hover',
  color = 'primary',
  showExternalIcon = true,
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps) {
  const isExternal = external || target === '_blank'

  return (
    <a
      target={isExternal ? '_blank' : target}
      rel={isExternal ? 'noopener noreferrer' : rel}
      className={cn(
        'inline-flex items-center gap-1 transition-colors cursor-pointer',
        colorClasses[color],
        underlineClasses[underline],
        className
      )}
      {...props}
    >
      {children}
      {isExternal && showExternalIcon && (
        <ExternalLink size={12} className="flex-shrink-0 opacity-70" aria-hidden="true" />
      )}
    </a>
  )
}
