import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../src/components/typography/Heading/Heading'
import { Text } from '../src/components/typography/Text/Text'
import { Code } from '../src/components/typography/Code/Code'
import { Link } from '../src/components/typography/Link/Link'
import { Divider } from '../src/components/layout/Divider/Divider'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Typography/Type Scale',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const HeadingScale: Story = {
  render: () => (
    <Stack gap="sm">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          H{level} — Enterprise Dashboard Heading
        </Heading>
      ))}
    </Stack>
  ),
}

export const TextScale: Story = {
  render: () => (
    <Stack gap="md">
      {(['xl', 'lg', 'base', 'sm', 'xs'] as const).map((size) => (
        <div key={size}>
          <Text size={size} color="muted" style={{ marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.6875rem', fontWeight: 600 }}>
            {size}
          </Text>
          <Text size={size}>
            The quick brown fox jumps over the lazy dog. Enterprise-grade UI components for modern applications.
          </Text>
        </div>
      ))}
    </Stack>
  ),
}

export const TextColors: Story = {
  render: () => (
    <Stack gap="sm">
      <Text color="default">Default — primary content text</Text>
      <Text color="muted">Muted — secondary labels and captions</Text>
      <Text color="disabled">Disabled — inactive or unavailable</Text>
      <Text color="primary">Primary — branded emphasis</Text>
      <Text color="success">Success — positive status messages</Text>
      <Text color="error">Error — validation and alert messages</Text>
      <Text color="warning">Warning — cautionary notices</Text>
    </Stack>
  ),
}

export const CodeBlocks: Story = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" color="muted" style={{ marginBottom: 8 }}>Inline code</Text>
        <Text>
          Use the <Code>useToast()</Code> hook to trigger notifications, or wrap your app with{' '}
          <Code>{'<ThemeProvider />'}</Code> to apply custom tokens.
        </Text>
      </div>
      <div>
        <Text size="sm" color="muted" style={{ marginBottom: 8 }}>Code block</Text>
        <Code block language="tsx">{`import { Button, TextField, JSONForm } from 'react-18-ui-library'

const schema = [
  { name: 'email', type: 'email', label: 'Email', required: true },
  { name: 'password', type: 'password', label: 'Password', required: true },
]

export function LoginForm() {
  return (
    <JSONForm
      schema={schema}
      onSubmit={(data) => console.log(data)}
      submitLabel="Sign In"
    />
  )
}`}</Code>
      </div>
    </Stack>
  ),
}

export const Links: Story = {
  render: () => (
    <Stack gap="md">
      <Text>
        Read the <Link href="#">documentation</Link> to get started, or check out the{' '}
        <Link href="#" external>GitHub repository</Link> for source code.
      </Text>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link href="#" underline="always">Always underlined</Link>
        <Link href="#" underline="hover">Underline on hover</Link>
        <Link href="#" underline="none">No underline</Link>
        <Link href="#" color="muted">Muted link</Link>
        <Link href="#" color="text">Text color link</Link>
        <Link href="https://example.com" external showExternalIcon>External link</Link>
      </div>
    </Stack>
  ),
}

export const FullTypographySystem: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <Heading level={1} style={{ marginBottom: 8 }}>Enterprise Analytics Platform</Heading>
      <Text size="lg" color="muted" style={{ marginBottom: 24 }}>
        A comprehensive suite of tools for data-driven decision making across your organization.
      </Text>
      <Divider style={{ marginBottom: 24 }} />
      <Heading level={2} style={{ marginBottom: 12 }}>Getting Started</Heading>
      <Text style={{ marginBottom: 16 }}>
        Install the library using your preferred package manager, then import the{' '}
        <Code>ThemeProvider</Code> at the root of your application to enable full theme support.
      </Text>
      <Code block language="bash">npm install react-18-ui-library</Code>
      <Heading level={3} style={{ marginTop: 24, marginBottom: 12 }}>Configuration</Heading>
      <Text color="muted" style={{ marginBottom: 16 }}>
        Override any CSS custom property in your app's <Code>:root</Code> to apply your brand.
        See the <Link href="#">theme token reference</Link> for a full list of available variables.
      </Text>
    </div>
  ),
}
