import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from '../src/components/display/Avatar/Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    status: { control: 'select', options: ['online', 'offline', 'away', 'busy', undefined] },
    rounded: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'User avatar',
    size: 'lg',
    status: 'online',
  },
}

export const WithInitials: Story = {
  args: { name: 'Alexandra Chen', size: 'lg', status: 'online' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar key={size} name="John Doe" size={size} status="online" />
      ))}
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['online', 'away', 'busy', 'offline'] as const).map((status) => (
        <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Avatar name="Jane Smith" size="md" status={status} />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>
            {status}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Team members (max 4)</p>
        <AvatarGroup
          size="md"
          max={4}
          avatars={[
            { name: 'Alice Johnson', src: 'https://i.pravatar.cc/150?img=1' },
            { name: 'Bob Williams' },
            { name: 'Carol Davis', src: 'https://i.pravatar.cc/150?img=5' },
            { name: 'David Brown' },
            { name: 'Eve Wilson' },
            { name: 'Frank Miller' },
          ]}
        />
      </div>
    </div>
  ),
}

export const SquareVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} name="Acme Corp" size={size} rounded={false} />
      ))}
    </div>
  ),
}
