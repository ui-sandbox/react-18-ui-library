import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DollarSign, Users, ShoppingBag, TrendingUp, Activity, AlertTriangle } from 'lucide-react'
import { Stat } from '../src/components/display/Stat/Stat'

const meta: Meta<typeof Stat> = {
  title: 'Display/Stat',
  component: Stat,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stat>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$1,240,000',
    delta: 8.2,
    deltaLabel: 'vs last month',
    icon: <DollarSign size={20} />,
    iconBg: 'success',
  },
}

export const DashboardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <Stat
        label="Total Revenue"
        value="$1.24M"
        delta={8.2}
        deltaLabel="vs last month"
        icon={<DollarSign size={20} />}
        iconBg="success"
      />
      <Stat
        label="Active Users"
        value="24,521"
        delta={12.5}
        deltaLabel="vs last month"
        icon={<Users size={20} />}
        iconBg="primary"
      />
      <Stat
        label="New Orders"
        value="1,893"
        delta={-3.1}
        deltaLabel="vs last month"
        icon={<ShoppingBag size={20} />}
        iconBg="warning"
      />
      <Stat
        label="Churn Rate"
        value="2.4%"
        delta={-0.3}
        deltaLabel="improvement"
        icon={<Activity size={20} />}
        iconBg="error"
      />
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <Stat label="Revenue" value="" loading icon={<DollarSign size={20} />} />
      <Stat label="Users" value="" loading icon={<Users size={20} />} />
      <Stat label="Growth" value="" loading icon={<TrendingUp size={20} />} />
    </div>
  ),
}
