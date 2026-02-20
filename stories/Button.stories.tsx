import type { Meta, StoryObj } from '@storybook/react'
import { Plus, Trash2, Download } from 'lucide-react'
import { Button } from '../src/components/inputs/Button/Button'

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Primary Button', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Secondary Button', variant: 'secondary' },
}

export const Outline: Story = {
  args: { children: 'Outline Button', variant: 'outline' },
}

export const Ghost: Story = {
  args: { children: 'Ghost Button', variant: 'ghost' },
}

export const Danger: Story = {
  args: { children: 'Delete', variant: 'danger', leftIcon: <Trash2 size={14} /> },
}

export const Loading: Story = {
  args: { children: 'Saving...', variant: 'primary', loading: true },
}

export const WithIcons: Story = {
  args: {
    children: 'Download Report',
    variant: 'primary',
    leftIcon: <Download size={14} />,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}
