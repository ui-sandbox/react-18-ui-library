import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Highlight, themes } from 'prism-react-renderer'
import { cn } from '../../../utils/cn'

export interface MarkdownReaderProps {
  children: string
  className?: string
  codeTheme?: 'dark' | 'light'
  showLineNumbers?: boolean
}

export function MarkdownReader({
  children,
  className,
  codeTheme = 'dark',
  showLineNumbers = false,
}: MarkdownReaderProps) {
  const prismTheme = codeTheme === 'dark' ? themes.oneDark : themes.oneLight

  return (
    <div className={cn('markdown-reader w-full', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children: c }) => (
            <h1 className="text-3xl font-bold text-text mt-8 mb-4 pb-2 border-b border-border first:mt-0">{c}</h1>
          ),
          h2: ({ children: c }) => (
            <h2 className="text-2xl font-semibold text-text mt-7 mb-3 pb-2 border-b border-border">{c}</h2>
          ),
          h3: ({ children: c }) => (
            <h3 className="text-xl font-semibold text-text mt-6 mb-2">{c}</h3>
          ),
          h4: ({ children: c }) => (
            <h4 className="text-lg font-semibold text-text mt-5 mb-2">{c}</h4>
          ),
          h5: ({ children: c }) => (
            <h5 className="text-base font-semibold text-text mt-4 mb-1">{c}</h5>
          ),
          h6: ({ children: c }) => (
            <h6 className="text-sm font-semibold text-text-muted mt-4 mb-1">{c}</h6>
          ),

          // Paragraph
          p: ({ children: c }) => (
            <p className="text-text leading-7 mb-4 last:mb-0">{c}</p>
          ),

          // Links
          a: ({ href, children: c }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              {c}
            </a>
          ),

          // Lists
          ul: ({ children: c }) => (
            <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-text">{c}</ul>
          ),
          ol: ({ children: c }) => (
            <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-text">{c}</ol>
          ),
          li: ({ children: c }) => (
            <li className="leading-7">{c}</li>
          ),

          // Blockquote
          blockquote: ({ children: c }) => (
            <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-4 bg-primary/5 rounded-r-md text-text-muted italic">
              {c}
            </blockquote>
          ),

          // Inline code
          code: ({ children: c, className: cls }) => {
            const match = /language-(\w+)/.exec(cls ?? '')
            const language = match ? match[1] : null
            const code = String(c).trimEnd()

            if (language) {
              return (
                <div className="my-4 rounded-lg border border-border overflow-hidden">
                  <div className="flex items-center px-4 py-2 bg-surface border-b border-border">
                    <span className="text-xs font-mono text-text-muted uppercase tracking-wide">{language}</span>
                  </div>
                  <Highlight theme={prismTheme} code={code} language={language}>
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
              <code className="inline rounded px-1.5 py-0.5 bg-surface-hover border border-border text-sm font-mono text-text">
                {c}
              </code>
            )
          },

          // Pre — handled by code above, suppress default pre wrapper
          pre: ({ children: c }) => <>{c}</>,

          // Horizontal rule
          hr: () => <hr className="my-6 border-border" />,

          // Strong / em
          strong: ({ children: c }) => <strong className="font-semibold text-text">{c}</strong>,
          em: ({ children: c }) => <em className="italic text-text">{c}</em>,
          del: ({ children: c }) => <del className="line-through text-text-muted">{c}</del>,

          // Table (GFM)
          table: ({ children: c }) => (
            <div className="my-4 w-full overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm border-collapse">{c}</table>
            </div>
          ),
          thead: ({ children: c }) => (
            <thead className="bg-surface-hover border-b border-border">{c}</thead>
          ),
          tbody: ({ children: c }) => <tbody>{c}</tbody>,
          tr: ({ children: c }) => (
            <tr className="border-b border-border last:border-0 hover:bg-surface-hover/50 transition-colors">{c}</tr>
          ),
          th: ({ children: c }) => (
            <th className="px-4 py-2.5 text-left font-semibold text-text-muted whitespace-nowrap">{c}</th>
          ),
          td: ({ children: c }) => (
            <td className="px-4 py-2.5 text-text">{c}</td>
          ),

          // Task list items (GFM checkboxes)
          input: ({ type, checked }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-2 accent-primary"
                />
              )
            }
            return null
          },

          // Image
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ''}
              className="my-4 max-w-full rounded-lg border border-border"
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
