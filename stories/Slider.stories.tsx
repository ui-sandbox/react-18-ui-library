import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '../src/components/inputs/Slider/Slider'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta<typeof Slider> = {
  title: 'Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    showMarks: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState([40])
    return (
      <div style={{ width: 400, padding: '1rem' }}>
        <Slider label="Volume" value={val} onValueChange={setVal} showTooltip />
      </div>
    )
  },
}

export const Range: Story = {
  render: () => {
    const [val, setVal] = useState([20, 80])
    return (
      <div style={{ width: 400, padding: '1rem' }}>
        <Slider
          label="Price Range"
          value={val}
          onValueChange={setVal}
          min={0}
          max={1000}
          step={10}
          showTooltip
          showMarks
          formatValue={(v) => `$${v}`}
        />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ width: 400, padding: '1rem' }}>
      <Stack gap="lg">
        <Slider label="Small" defaultValue={[30]} size="sm" />
        <Slider label="Medium" defaultValue={[50]} size="md" />
        <Slider label="Large" defaultValue={[70]} size="lg" />
        <Slider label="Disabled" defaultValue={[40]} disabled />
      </Stack>
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div style={{ width: 400, padding: '1rem' }}>
      <Slider
        label="Opacity"
        defaultValue={[75]}
        min={0}
        max={100}
        step={5}
        showTooltip
        formatValue={(v) => `${v}%`}
        helperText="Adjust the transparency of the overlay."
      />
    </div>
  ),
}
