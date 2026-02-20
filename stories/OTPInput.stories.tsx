import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { OTPInput } from '../src/components/inputs/OTPInput/OTPInput'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Alert } from '../src/components/feedback/Alert/Alert'

const meta: Meta<typeof OTPInput> = {
  title: 'Inputs/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    length: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
    separator: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof OTPInput>

export const Default: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your email.',
    length: 6,
  },
}

export const Variants: Story = {
  render: () => {
    const [completed, setCompleted] = useState('')
    return (
      <div style={{ padding: '1rem', maxWidth: 500 }}>
        <Stack gap="xl">
          <OTPInput
            label="Email Verification"
            helperText="Enter the 6-digit code sent to your email."
            length={6}
            onComplete={(v) => setCompleted(v)}
          />
          {completed && (
            <Alert variant="success" title="Code entered">You entered: {completed}</Alert>
          )}
          <OTPInput label="4-Digit PIN" length={4} mask separator helperText="Masked input with separator" />
          <OTPInput label="8-Digit Code" length={8} separatorAt={[3]} helperText="Custom separator position" />
          <OTPInput label="Small Size" length={6} size="sm" />
          <OTPInput label="Large Size" length={6} size="lg" />
          <OTPInput label="With Error" length={6} error="Invalid code. Please try again." />
          <OTPInput label="Disabled" length={6} value="123456" disabled />
        </Stack>
      </div>
    )
  },
}
