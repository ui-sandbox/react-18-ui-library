import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
export type ImageRatio = '1/1' | '4/3' | '16/9' | '3/2' | '2/3' | 'auto'

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  fallbackSrc?: string
  fallbackIcon?: React.ReactNode
  fit?: ImageFit
  ratio?: ImageRatio
  lazy?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  blur?: boolean
  containerClassName?: string
}

const ratioClasses: Record<ImageRatio, string> = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
  auto: '',
}

const fitClasses: Record<ImageFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export function Image({
  src,
  fallbackSrc,
  fallbackIcon,
  fit = 'cover',
  ratio = 'auto',
  lazy = true,
  rounded = 'none',
  blur = false,
  containerClassName,
  className,
  alt = '',
  ...props
}: ImageProps) {
  const [error, setError] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const handleError = () => {
    if (!usedFallback && fallbackSrc) {
      setUsedFallback(true)
    } else {
      setError(true)
    }
  }

  const currentSrc = usedFallback && fallbackSrc ? fallbackSrc : src

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-surface-hover text-text-muted',
          ratioClasses[ratio],
          roundedClasses[rounded],
          containerClassName
        )}
      >
        {fallbackIcon ?? <ImageOff size={24} />}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden',
        ratioClasses[ratio],
        roundedClasses[rounded],
        ratio !== 'auto' && 'relative',
        containerClassName
      )}
    >
      <img
        src={currentSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        className={cn(
          ratio !== 'auto' ? 'absolute inset-0 w-full h-full' : 'w-full h-full',
          fitClasses[fit],
          roundedClasses[rounded],
          blur && !loaded && 'blur-sm',
          loaded && blur && 'blur-0',
          'transition-[filter] duration-300',
          className
        )}
        {...props}
      />
    </div>
  )
}
