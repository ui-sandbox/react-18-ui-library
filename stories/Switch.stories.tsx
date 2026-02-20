import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '../src/components/inputs/Switch/Switch'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'
import { Divider } from '../src/components/layout/Divider/Divider'

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive alerts when something important happens.',
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <div style={{ padding: '1rem' }}>
        <Switch
          label={on ? 'Dark mode is ON' : 'Dark mode is OFF'}
          description="Toggle between light and dark theme."
          checked={on}
          onCheckedChange={setOn}
        />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Stack gap="md">
        <Switch label="Small" size="sm" defaultChecked />
        <Switch label="Medium (default)" size="md" defaultChecked />
        <Switch label="Large" size="lg" defaultChecked />
      </Stack>
    </div>
  ),
}

export const SettingsPanel: Story = {
  render: () => {
    const settings = [
      { key: 'email', label: 'Email notifications', description: 'Receive updates via email', default: true },
      { key: 'push', label: 'Push notifications', description: 'Browser push notifications', default: false },
      { key: 'marketing', label: 'Marketing emails', description: 'Product news and announcements', default: true },
      { key: 'security', label: 'Security alerts', description: 'Login and suspicious activity alerts', default: true },
      { key: 'api', label: 'API access', description: 'Allow third-party API integrations', default: false, disabled: true },
    ]
    return (
      <div style={{ padding: '1rem', maxWidth: 480 }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Notification Preferences
        </p>
        <Stack gap="xs">
          {settings.map((s, i) => (
            <React.Fragment key={s.key}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>{s.label}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{s.description}</div>
                </div>
                <Switch defaultChecked={s.default} disabled={s.disabled} />
              </div>
              {i < settings.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="md">
        <Switch label="Unchecked" />
        <Switch label="Checked" defaultChecked />
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" disabled defaultChecked />
        <Switch label="Label left" labelPosition="left" defaultChecked />
        <Switch label="Label right" labelPosition="right" defaultChecked />
      </Grid>
    </div>
  ),
}
