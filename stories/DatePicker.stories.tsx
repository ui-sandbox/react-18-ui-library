import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '../src/components/inputs/DatePicker/DatePicker'
import type { DateRange } from 'react-day-picker'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    label: 'Select Date',
    helperText: 'Choose a date from the calendar.',
  },
}

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div style={{ padding: '1rem', maxWidth: 320 }}>
        <DatePicker
          label="Appointment Date"
          value={date}
          onChange={setDate}
          helperText={date ? `Selected: ${date.toDateString()}` : 'No date selected'}
        />
      </div>
    )
  },
}

export const RangeMode: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return (
      <div style={{ padding: '1rem', maxWidth: 380 }}>
        <DatePicker
          mode="range"
          label="Date Range"
          value={range}
          onChange={setRange}
          helperText={
            range?.from && range?.to
              ? `${range.from.toDateString()} → ${range.to.toDateString()}`
              : 'Select start and end dates'
          }
        />
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="md">
        <DatePicker label="Small" size="sm" />
        <DatePicker label="Medium" size="md" />
        <DatePicker label="Large" size="lg" />
        <DatePicker label="Disabled" disabled defaultValue={new Date()} />
        <DatePicker label="With Error" error="Date is required." />
        <DatePicker
          label="Min/Max Date"
          minDate={new Date()}
          helperText="Only future dates allowed"
        />
      </Grid>
    </div>
  ),
}
