import React from 'react'
import { Loader2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'select-none cursor-pointer flex-shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        outline: 'border border-border bg-transparent text-text hover:bg-surface-hover',
        ghost: 'bg-transparent text-text-muted hover:bg-surface-hover hover:text-text',
        danger: 'bg-error text-white hover:opacity-90',
      },
      size: {
        xs: 'w-6 h-6',
        sm: 'w-7 h-7',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
        xl: 'w-12 h-12',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
      rounded: false,
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
  loading?: boolean
  'aria-label': string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant, size, rounded, loading = false, icon, disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(iconButtonVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
