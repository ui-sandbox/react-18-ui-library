import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '../src/components/inputs/TextArea/TextArea'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof TextArea> = {
  title: 'Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
    autoResize: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description…',
    helperText: 'Provide a brief description of the item.',
    rows: 4,
  },
}

export const WithCharacterCount: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div style={{ padding: '1rem', maxWidth: 480 }}>
        <TextArea
          label="Bio"
          placeholder="Tell us about yourself…"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          maxLength={280}
          showCharCount
          rows={4}
          helperText="Twitter-style bio limit."
        />
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Grid cols={2} gap="md">
        <TextArea label="Default" placeholder="Enter text…" rows={3} />
        <TextArea label="With Value" defaultValue="This is some pre-filled content." rows={3} />
        <TextArea label="Disabled" defaultValue="Cannot edit this." disabled rows={3} />
        <TextArea label="Required" placeholder="Required field" required rows={3} />
        <TextArea label="With Error" placeholder="Enter text…" error="This field is required." rows={3} />
        <TextArea label="With Helper" placeholder="Enter text…" helperText="Max 500 characters." rows={3} />
        <TextArea label="Auto Resize" placeholder="Grows as you type…" autoResize rows={2} />
        <TextArea label="With Count" placeholder="Enter text…" maxLength={100} showCharCount rows={3} />
      </Grid>
    </div>
  ),
}
