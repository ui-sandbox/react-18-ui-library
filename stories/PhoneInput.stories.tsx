import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PhoneInput, DEFAULT_COUNTRY_CODES } from '../src/components/inputs/PhoneInput/PhoneInput'
import type { PhoneInputValue } from '../src/components/inputs/PhoneInput/PhoneInput'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'

const meta: Meta<typeof PhoneInput> = {
  title: 'Inputs/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    defaultCountry: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof PhoneInput>

export const Default: Story = {
  args: {
    label: 'Phone Number',
    defaultCountry: 'US',
    helperText: 'Enter your phone number with country code.',
  },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState<PhoneInputValue | undefined>()
    return (
      <div style={{ padding: '1rem', maxWidth: 360 }}>
        <Stack gap="md">
          <PhoneInput
            label="Contact Number"
            defaultCountry="IN"
            maxLength={10}
            value={val}
            onChange={setVal}
            helperText={val?.full ? `Full number: ${val.full}` : 'No number entered'}
          />
        </Stack>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 400 }}>
      <Stack gap="md">
        <PhoneInput label="Small" size="sm" defaultCountry="GB" placeholder="Phone number" />
        <PhoneInput label="Medium" size="md" defaultCountry="US" placeholder="Phone number" />
        <PhoneInput label="Large" size="lg" defaultCountry="AU" placeholder="Phone number" />
      </Stack>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 400 }}>
      <Stack gap="md">
        <PhoneInput label="Default" defaultCountry="US" placeholder="Phone number" />
        <PhoneInput label="Required" defaultCountry="US" required placeholder="Phone number" />
        <PhoneInput label="With Error" defaultCountry="US" error="Invalid phone number" placeholder="Phone number" />
        <PhoneInput label="Disabled" defaultCountry="US" disabled placeholder="Phone number" />
        <PhoneInput
          label="With Helper Text"
          defaultCountry="DE"
          helperText="Include area code"
          placeholder="Phone number"
        />
      </Stack>
    </div>
  ),
}

export const CustomCountries: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 400 }}>
      <Stack gap="md">
        <PhoneInput
          label="Asia Pacific Only"
          defaultCountry="SG"
          countryCodes={DEFAULT_COUNTRY_CODES.filter((c) =>
            ['SG', 'AU', 'JP', 'KR', 'IN', 'CN', 'ID'].includes(c.code)
          )}
          placeholder="Phone number"
          helperText="Filtered to Asia Pacific countries"
        />
        <PhoneInput
          label="Europe Only"
          defaultCountry="DE"
          countryCodes={DEFAULT_COUNTRY_CODES.filter((c) =>
            ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'CH', 'SE', 'NO', 'PL'].includes(c.code)
          )}
          placeholder="Phone number"
          helperText="Filtered to European countries"
        />
      </Stack>
    </div>
  ),
}
