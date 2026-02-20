import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Bell, ShoppingCart } from 'lucide-react'
import { Badge, BadgeAnchor } from '../src/components/display/Badge/Badge'
import { Tag } from '../src/components/display/Tag/Tag'
import { IconButton } from '../src/components/inputs/IconButton/IconButton'

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge & Tag',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}

export const WithNumbers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="primary" size="sm">1</Badge>
      <Badge variant="error" size="md">12</Badge>
      <Badge variant="warning" size="lg">99+</Badge>
    </div>
  ),
}

export const AnchoredOnIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <BadgeAnchor badge={<Badge variant="error" size="sm">3</Badge>} position="top-right">
        <IconButton icon={<Bell size={18} />} aria-label="Notifications" variant="outline" size="lg" />
      </BadgeAnchor>
      <BadgeAnchor badge={<Badge variant="primary" size="sm">12</Badge>} position="top-right">
        <IconButton icon={<ShoppingCart size={18} />} aria-label="Cart" variant="outline" size="lg" />
      </BadgeAnchor>
      <BadgeAnchor badge={<Badge dot variant="success" />} position="bottom-right">
        <IconButton icon={<Bell size={18} />} aria-label="Active" variant="ghost" size="lg" />
      </BadgeAnchor>
    </div>
  ),
}

export const Tags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Tag variant="default">TypeScript</Tag>
        <Tag variant="primary">React</Tag>
        <Tag variant="success">Deployed</Tag>
        <Tag variant="error">Critical</Tag>
        <Tag variant="warning">Beta</Tag>
        <Tag variant="info">API</Tag>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Tag variant="primary" rounded removable onRemove={() => alert('removed')}>React</Tag>
        <Tag variant="info" rounded removable onRemove={() => alert('removed')}>TypeScript</Tag>
        <Tag variant="success" rounded removable onRemove={() => alert('removed')}>Node.js</Tag>
        <Tag variant="default" rounded removable onRemove={() => alert('removed')}>PostgreSQL</Tag>
      </div>
    </div>
  ),
}
