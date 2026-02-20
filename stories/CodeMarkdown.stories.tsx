import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Code } from '../src/components/typography/Code/Code'
import { MarkdownReader } from '../src/components/display/MarkdownReader/MarkdownReader'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Divider } from '../src/components/layout/Divider/Divider'

const meta: Meta = {
  title: 'Typography/Code & Markdown',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

// ─── Code ────────────────────────────────────────────────────────────────────

export const CodeInline: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', lineHeight: 2 }}>
        Use the <Code>useState</Code> hook to manage local state, or reach for{' '}
        <Code>useReducer</Code> when the logic gets complex. Don't forget to call{' '}
        <Code>npm install</Code> before running the project.
      </p>
    </div>
  ),
}

export const CodeBlockDark: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Code block language="tsx" theme="dark" showLineNumbers filename="Button.tsx">
{`import React from 'react'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover',
        outline: 'border border-border bg-transparent hover:bg-surface-hover',
        danger:  'bg-error text-white hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export function Button({ variant, size, children, ...props }) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  )
}`}
      </Code>
    </div>
  ),
}

export const CodeBlockLight: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Code block language="typescript" theme="light" showLineNumbers filename="api.ts">
{`interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: Date
}

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json()
}

export { fetchUser }
export type { User }`}
      </Code>
    </div>
  ),
}

export const CodeBlockLanguages: Story = {
  render: () => (
    <Stack gap="lg" style={{ padding: 24 }}>
      <Code block language="bash" theme="dark">
{`# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build`}
      </Code>

      <Code block language="json" theme="dark" filename="package.json">
{`{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`}
      </Code>

      <Code block language="css" theme="dark" filename="tokens.css">
{`:root {
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
}`}
      </Code>
    </Stack>
  ),
}

// ─── MarkdownReader ───────────────────────────────────────────────────────────

const SAMPLE_MARKDOWN = `# Getting Started

Welcome to the **React 18 UI Library** — a fully customizable, theme-aware component library built with TypeScript, TailwindCSS, and Radix UI.

## Installation

\`\`\`bash
npm install react-18-ui-library
\`\`\`

## Basic Usage

Import components directly from the package:

\`\`\`tsx
import { Button, TextField, Card } from 'react-18-ui-library'

export function App() {
  return (
    <Card>
      <TextField label="Name" placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
\`\`\`

## Features

- **Accessible** — built on Radix UI primitives with full keyboard navigation
- **Themeable** — CSS custom properties with optional \`ThemeProvider\`
- **Type-safe** — 100% TypeScript with exported types
- **Tree-shakeable** — import only what you use

## Components

| Category | Components |
|----------|-----------|
| Inputs | Button, TextField, Select, SearchSelect, ChipSelect, TagInput |
| Display | Card, Badge, Avatar, DataTable, MarkdownReader |
| Feedback | Alert, Toast, Spinner, FullScreenLoader |
| Overlay | Modal, Drawer, ConfirmDialog |
| Forms | JSONForm, FileUpload |

## Theming

Override any token in your CSS:

\`\`\`css
:root {
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
  --radius-md: 0.75rem;
}
\`\`\`

> **Tip:** Wrap your app in \`ThemeProvider\` to apply tokens programmatically at runtime.

## Task List

- [x] Core components
- [x] JSONForm integration
- [x] Storybook stories
- [ ] Dark mode toggle
- [ ] Animation presets

---

Made with ❤️ using React 18 + TypeScript + TailwindCSS.
`

export const MarkdownBasic: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <MarkdownReader>{SAMPLE_MARKDOWN}</MarkdownReader>
    </div>
  ),
}

export const MarkdownLightCode: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <MarkdownReader codeTheme="light">{SAMPLE_MARKDOWN}</MarkdownReader>
    </div>
  ),
}

export const MarkdownWithLineNumbers: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <MarkdownReader showLineNumbers>
{`## Code with line numbers

\`\`\`typescript
interface Config {
  apiUrl: string
  timeout: number
  retries: number
}

function createClient(config: Config) {
  return {
    get: (path: string) =>
      fetch(config.apiUrl + path, {
        signal: AbortSignal.timeout(config.timeout),
      }),
  }
}
\`\`\`
`}
      </MarkdownReader>
    </div>
  ),
}

export const MarkdownGFMFeatures: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <MarkdownReader>
{`# GFM Features

## Tables

| Name | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`string\` | \`primary\` | Visual style |
| \`size\` | \`sm \\| md \\| lg\` | \`md\` | Component size |
| \`disabled\` | \`boolean\` | \`false\` | Disable interaction |

## Strikethrough

~~This feature was deprecated~~ — use the new API instead.

## Task Lists

- [x] Design system tokens
- [x] Component library
- [x] Storybook integration
- [ ] NPM publish
- [ ] Documentation site

## Blockquotes

> Components should be composable, accessible, and easy to customize.
> — Design System Principles

## Inline formatting

Use \`inline code\` for short snippets, **bold** for emphasis, and *italics* for nuance.
`}
      </MarkdownReader>
    </div>
  ),
}
