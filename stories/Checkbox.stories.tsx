import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../src/components/inputs/Checkbox/Checkbox'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    description: 'By checking this box you agree to our Terms of Service and Privacy Policy.',
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div style={{ padding: '1rem' }}>
        <Checkbox
          label="Subscribe to newsletter"
          description="Receive weekly updates about new features and releases."
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Stack gap="md">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" checked="indeterminate" />
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
        <Checkbox label="Required" required description="This field is required." />
        <Checkbox label="With error" error="You must accept the terms." />
      </Stack>
    </div>
  ),
}

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email'])
    const options = [
      { value: 'email', label: 'Email notifications', description: 'Receive updates via email' },
      { value: 'push', label: 'Push notifications', description: 'Browser push notifications' },
      { value: 'sms', label: 'SMS notifications', description: 'Text message alerts' },
      { value: 'slack', label: 'Slack notifications', description: 'Messages in your Slack workspace', disabled: true },
    ]
    const toggle = (value: string) =>
      setSelected((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value])

    return (
      <div style={{ padding: '1rem', maxWidth: 400 }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
          Notification Channels
        </p>
        <Stack gap="sm">
          {options.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              description={opt.description}
              checked={selected.includes(opt.value)}
              onCheckedChange={() => toggle(opt.value)}
              disabled={opt.disabled}
            />
          ))}
        </Stack>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
          Active: {selected.join(', ') || 'none'}
        </p>
      </div>
    )
  },
}
