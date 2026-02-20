import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '../src/components/inputs/Radio/Radio'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    label: 'Subscription Plan',
    options: [
      { value: 'free', label: 'Free', description: 'Up to 3 projects, 1GB storage' },
      { value: 'pro', label: 'Pro — $12/mo', description: 'Unlimited projects, 50GB storage' },
      { value: 'enterprise', label: 'Enterprise', description: 'Custom limits, SSO, dedicated support' },
    ],
    defaultValue: 'pro',
  },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('monthly')
    return (
      <div style={{ padding: '1rem', maxWidth: 400 }}>
        <RadioGroup
          label="Billing Cycle"
          value={val}
          onValueChange={setVal}
          options={[
            { value: 'monthly', label: 'Monthly', description: 'Billed every month' },
            { value: 'annual', label: 'Annual (save 20%)', description: 'Billed once per year' },
          ]}
        />
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Selected: {val}</p>
      </div>
    )
  },
}

export const Horizontal: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <RadioGroup
        label="Priority"
        orientation="horizontal"
        defaultValue="medium"
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical' },
        ]}
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="xl">
        <RadioGroup
          label="Default"
          defaultValue="a"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
        />
        <RadioGroup
          label="Disabled"
          defaultValue="a"
          disabled
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C', disabled: true },
          ]}
        />
        <RadioGroup
          label="With Error"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
          error="Please select an option."
        />
        <RadioGroup
          label="With Helper"
          defaultValue="b"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
        />
      </Grid>
    </div>
  ),
}
