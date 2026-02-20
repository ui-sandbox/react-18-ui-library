import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type StepStatus = 'completed' | 'current' | 'upcoming'

export interface Step {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function StepIndicator({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}: StepIndicatorProps) {
  const getStatus = (index: number): StepStatus => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'current'
    return 'upcoming'
  }

  return (
    <ol
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const status = getStatus(index)
        const isLast = index === steps.length - 1

        return (
          <li
            key={step.id}
            className={cn(
              'flex',
              orientation === 'horizontal' ? 'flex-col items-center flex-1' : 'flex-row items-start'
            )}
          >
            <div
              className={cn(
                'flex items-center',
                orientation === 'horizontal' ? 'w-full' : 'flex-col'
              )}
            >
              {/* Step circle */}
              <div
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors',
                  status === 'completed' && 'bg-primary border-primary text-primary-foreground',
                  status === 'current' && 'bg-surface border-primary text-primary',
                  status === 'upcoming' && 'bg-surface border-border text-text-muted'
                )}
              >
                {status === 'completed' ? (
                  <Check size={14} />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    'transition-colors',
                    orientation === 'horizontal' ? 'flex-1 h-0.5 mx-2' : 'w-0.5 h-8 my-1 ml-3.5',
                    index < currentStep ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div
              className={cn(
                orientation === 'horizontal' ? 'text-center mt-2' : 'ml-3 pb-6',
                isLast && orientation === 'vertical' && 'pb-0'
              )}
            >
              <p
                className={cn(
                  'text-sm font-medium',
                  status === 'current' && 'text-primary',
                  status === 'completed' && 'text-text',
                  status === 'upcoming' && 'text-text-muted'
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-text-muted mt-0.5">{step.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
