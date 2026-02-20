import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../src/components/inputs/Select/Select'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Select>

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'guest', label: 'Guest' },
]

const countryGroups = [
  {
    label: 'North America',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'gb', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'nl', label: 'Netherlands' },
    ],
  },
  {
    label: 'Asia Pacific',
    options: [
      { value: 'jp', label: 'Japan' },
      { value: 'au', label: 'Australia' },
      { value: 'in', label: 'India' },
    ],
  },
]

export const Default: Story = {
  args: {
    label: 'Role',
    placeholder: 'Select a role…',
    options: roleOptions,
    helperText: 'Choose the user\'s permission level.',
  },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div style={{ padding: '1rem', maxWidth: 320 }}>
        <Select
          label="Role"
          value={val}
          onValueChange={setVal}
          options={roleOptions}
          helperText={val ? `Selected: ${val}` : 'No role selected'}
        />
      </div>
    )
  },
}

export const WithGroups: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 320 }}>
      <Select
        label="Country"
        placeholder="Select country…"
        groups={countryGroups}
        helperText="Select your country of residence."
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="md">
        <Select label="Default" options={roleOptions} placeholder="Select…" />
        <Select label="With Value" options={roleOptions} defaultValue="editor" />
        <Select label="Full Width" options={roleOptions} fullWidth placeholder="Select…" />
        <Select label="Required" options={roleOptions} required placeholder="Select…" />
        <Select label="Disabled" options={roleOptions} defaultValue="viewer" disabled />
        <Select label="Required" options={roleOptions} required placeholder="Select…" />
        <Select label="With Error" options={roleOptions} error="Please select a role." />
        <Select label="With Helper" options={roleOptions} helperText="This controls access level." />
      </Grid>
    </div>
  ),
}
