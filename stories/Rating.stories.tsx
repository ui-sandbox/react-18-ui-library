import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from '../src/components/inputs/Rating/Rating'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof Rating> = {
  title: 'Inputs/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    max: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    allowHalf: { control: 'boolean' },
    allowClear: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  args: {
    label: 'Rate your experience',
    defaultValue: 3,
  },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState(0)
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    return (
      <div style={{ padding: '1rem' }}>
        <Stack gap="sm">
          <Rating label="How was your experience?" value={val} onChange={setVal} />
          {val > 0 && (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 500 }}>
              {labels[val]} ({val}/5)
            </p>
          )}
        </Stack>
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="lg">
        <Rating label="Default (5 stars)" defaultValue={3} />
        <Rating label="Read Only" value={4} readOnly />
        <Rating label="Half Stars" defaultValue={3.5} allowHalf readOnly />
        <Rating label="10 Stars" defaultValue={7} max={10} />
        <Rating label="Small" defaultValue={4} size="sm" />
        <Rating label="Large" defaultValue={4} size="lg" />
        <Rating label="Disabled" defaultValue={3} disabled />
        <Rating label="No Clear" defaultValue={3} allowClear={false} />
      </Grid>
    </div>
  ),
}
