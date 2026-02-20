import React, { useState } from 'react'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const alertVariants = cva(
  'flex gap-3 rounded-lg border p-4 text-sm',
  {
    variants: {
      variant: {
        info: 'bg-info-bg border-info/30 text-info',
        success: 'bg-success-bg border-success/30 text-success',
        warning: 'bg-warning-bg border-warning/30 text-warning',
        error: 'bg-error-bg border-error/30 text-error',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string
  children?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode
  className?: string
}

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const IconComponent = icons[variant ?? 'info']

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
    >
      <span className="flex-shrink-0 mt-0.5">
        {icon ?? <IconComponent size={16} />}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {children && <div className="opacity-90">{children}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded hover:opacity-70 transition-opacity mt-0.5"
          aria-label="Dismiss alert"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
