import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from '../src/components/actions/CopyButton/CopyButton'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'
import { Code } from '../src/components/typography/Code/Code'

const meta: Meta<typeof CopyButton> = {
  title: 'Actions/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'outline', 'solid'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  args: {
    value: 'Hello, World!',
    variant: 'outline',
    label: 'Copy',
  },
}

export const InlineWithCode: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Stack gap="md">
        {[
          'npm install react-18-ui-library',
          'npx create-react-app my-app --template typescript',
          'git clone https://github.com/org/repo.git',
        ].map((cmd) => (
          <div
            key={cmd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              background: 'var(--color-surface-hover)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            <code style={{ flex: 1, fontSize: '0.8125rem', fontFamily: 'monospace', color: 'var(--color-text)' }}>
              {cmd}
            </code>
            <CopyButton value={cmd} size="sm" variant="ghost" />
          </div>
        ))}
      </Stack>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Stack gap="lg">
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Variants</p>
          <Stack direction="row" gap="sm">
            <CopyButton value="ghost" variant="ghost" label="Ghost" />
            <CopyButton value="outline" variant="outline" label="Outline" />
            <CopyButton value="solid" variant="solid" label="Solid" />
          </Stack>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Sizes (icon only)</p>
          <Stack direction="row" gap="sm" align="center">
            <CopyButton value="small" size="sm" variant="outline" />
            <CopyButton value="medium" size="md" variant="outline" />
            <CopyButton value="large" size="lg" variant="outline" />
          </Stack>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Sizes (with label)</p>
          <Stack direction="row" gap="sm" align="center">
            <CopyButton value="small" size="sm" variant="outline" label="Copy" />
            <CopyButton value="medium" size="md" variant="outline" label="Copy" />
            <CopyButton value="large" size="lg" variant="outline" label="Copy" />
          </Stack>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Disabled</p>
          <CopyButton value="disabled" variant="outline" label="Copy" disabled />
        </div>
      </Stack>
    </div>
  ),
}
