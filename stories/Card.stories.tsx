import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MoreHorizontal, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { Card } from '../src/components/display/Card/Card'
import { Badge } from '../src/components/display/Badge/Badge'
import { Button } from '../src/components/inputs/Button/Button'
import { Avatar } from '../src/components/display/Avatar/Avatar'

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        This is a basic card with default padding and a subtle shadow.
      </p>
    ),
  },
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card
      header={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9375rem' }}>
              Active Users
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
              Last 30 days
            </p>
          </div>
          <Badge variant="success">+12.5%</Badge>
        </div>
      }
      footer={
        <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
          View full report
        </Button>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '0.75rem',
          background: 'var(--color-primary-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-primary)',
        }}>
          <Users size={22} />
        </div>
        <div>
          <p style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>
            24,521
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
            Total registered users
          </p>
        </div>
      </div>
    </Card>
  ),
}

export const ProfileCard: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
        <Avatar name="Sarah Mitchell" size="xl" status="online" />
        <div>
          <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)' }}>Sarah Mitchell</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
            Senior Product Designer
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge variant="info">UX</Badge>
          <Badge variant="ghost">Figma</Badge>
          <Badge variant="ghost">Research</Badge>
        </div>
        <div style={{ display: 'flex', gap: 8, width: '100%', marginTop: 4 }}>
          <Button variant="primary" size="sm" fullWidth>Message</Button>
          <Button variant="outline" size="sm" fullWidth>Profile</Button>
        </div>
      </div>
    </Card>
  ),
}

export const GridOfCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {[
        { label: 'Revenue', value: '$1.24M', delta: '+8.2%', color: 'var(--color-success)', icon: <TrendingUp size={18} /> },
        { label: 'Active Users', value: '24,521', delta: '+12.5%', color: 'var(--color-info)', icon: <Users size={18} /> },
        { label: 'Churn Rate', value: '2.4%', delta: '-0.3%', color: 'var(--color-warning)', icon: <TrendingUp size={18} /> },
      ].map((item) => (
        <Card key={item.label} hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{item.label}</p>
            <span style={{ color: item.color }}>{item.icon}</span>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>{item.value}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: 4 }}>{item.delta} vs last month</p>
        </Card>
      ))}
    </div>
  ),
}
