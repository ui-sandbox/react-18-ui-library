import React, { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type CodeTheme = 'dark' | 'light'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  block?: boolean
  language?: string
  theme?: CodeTheme
  showLineNumbers?: boolean
  copyable?: boolean
  filename?: string
}

export function Code({
  block = false,
  language = 'tsx',
  theme = 'dark',
  showLineNumbers = false,
  copyable = true,
  filename,
  className,
  children,
  ...props
}: CodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : String(children ?? '')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (block) {
    const code = typeof children === 'string' ? children : String(children ?? '')
    const prismTheme = theme === 'dark' ? themes.oneDark : themes.oneLight

    return (
      <div className={cn('w-full rounded-lg border border-border overflow-hidden', className)}>
        {/* Header bar */}
        {(filename || copyable) && (
          <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
            {filename ? (
              <span className="text-xs font-mono text-text-muted">{filename}</span>
            ) : (
              <span className="text-xs font-mono text-text-muted uppercase tracking-wide">{language}</span>
            )}
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
                aria-label="Copy code"
              >
                {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        )}

        {/* Highlighted code */}
        <Highlight theme={prismTheme} code={code.trimEnd()} language={language}>
          {({ className: hlClass, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn('overflow-x-auto p-4 text-sm leading-relaxed m-0', hlClass)}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="select-none pr-4 text-right inline-block w-8 opacity-40 text-xs">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    )
  }

  return (
    <code
      className={cn(
        'inline rounded px-1.5 py-0.5 bg-surface-hover border border-border',
        'text-sm font-mono text-text',
        className
      )}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </code>
  )
}
