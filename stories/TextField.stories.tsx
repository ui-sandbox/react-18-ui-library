import type { Meta, StoryObj } from '@storybook/react'
import { Search, Mail, DollarSign, Eye } from 'lucide-react'
import { TextField } from '../src/components/inputs/TextField/TextField'

const meta: Meta<typeof TextField> = {
  title: 'Inputs/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'Enter your email', type: 'email' },
}

export const WithPrefixIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search anything...',
    prefixIcon: <Search size={14} />,
  },
}

export const WithSuffixText: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    prefixText: '$',
    suffixText: 'USD',
  },
}

export const WithPrefixImage: Story = {
  args: {
    label: 'Phone',
    placeholder: '(555) 000-0000',
    prefixImage: 'https://flagcdn.com/w20/us.png',
    prefixText: '+1',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
}

export const Clearable: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    prefixIcon: <Search size={14} />,
    clearable: true,
    value: 'Some text',
  },
}
