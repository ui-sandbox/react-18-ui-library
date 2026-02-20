import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from '../src/components/inputs/NumberInput/NumberInput'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof NumberInput> = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    hideControls: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 1,
    min: 0,
    max: 999,
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="md">
        <NumberInput label="Quantity" defaultValue={1} min={0} max={999} />
        <NumberInput label="Price" prefix="$" defaultValue={9.99} step={0.01} precision={2} />
        <NumberInput label="Percentage" suffix="%" defaultValue={75} min={0} max={100} />
        <NumberInput label="Temperature" suffix="°C" defaultValue={22} min={-50} max={100} />
        <NumberInput label="No Controls" defaultValue={10} hideControls />
        <NumberInput label="Disabled" defaultValue={5} disabled />
        <NumberInput label="With Error" defaultValue={-1} min={0} error="Value must be positive" />
        <NumberInput label="Large Size" defaultValue={42} size="lg" />
      </Grid>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState<number | undefined>(10)
    return (
      <div style={{ padding: '1rem', maxWidth: 300 }}>
        <Stack gap="md">
          <NumberInput
            label="Controlled Value"
            value={val}
            onChange={setVal}
            min={0}
            max={100}
            step={5}
            helperText={`Current value: ${val ?? 'empty'}`}
          />
        </Stack>
      </div>
    )
  },
}
