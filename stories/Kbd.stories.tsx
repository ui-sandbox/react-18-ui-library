import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Kbd } from '../src/components/typography/Kbd/Kbd'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof Kbd> = {
  title: 'Typography/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  args: { children: '⌘K', size: 'md' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Stack direction="row" gap="md" align="center">
        <Kbd size="sm">Esc</Kbd>
        <Kbd size="md">Enter</Kbd>
        <Kbd size="lg">Space</Kbd>
      </Stack>
    </div>
  ),
}

export const ShortcutExamples: Story = {
  render: () => {
    const shortcuts = [
      { label: 'Command palette', keys: ['⌘', 'K'] },
      { label: 'Save', keys: ['⌘', 'S'] },
      { label: 'Undo', keys: ['⌘', 'Z'] },
      { label: 'Redo', keys: ['⌘', '⇧', 'Z'] },
      { label: 'Find', keys: ['⌘', 'F'] },
      { label: 'Select all', keys: ['⌘', 'A'] },
      { label: 'Copy', keys: ['⌘', 'C'] },
      { label: 'Paste', keys: ['⌘', 'V'] },
      { label: 'Close', keys: ['Esc'] },
      { label: 'Navigate', keys: ['↑', '↓'] },
      { label: 'Select', keys: ['↵'] },
      { label: 'Help', keys: ['?'] },
    ]
    return (
      <div style={{ padding: '1rem', maxWidth: 480 }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Keyboard Shortcuts
        </h3>
        <Stack gap="xs">
          {shortcuts.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{s.label}</span>
              <Stack direction="row" gap="xs" align="center">
                {s.keys.map((k, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>+</span>}
                    <Kbd size="sm">{k}</Kbd>
                  </React.Fragment>
                ))}
              </Stack>
            </div>
          ))}
        </Stack>
      </div>
    )
  },
}
