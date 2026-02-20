import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CheckCircle, Clock, AlertCircle, GitCommit, Rocket, Shield, UserPlus } from 'lucide-react'
import { Timeline } from '../src/components/display/Timeline/Timeline'
import type { TimelineItem } from '../src/components/display/Timeline/Timeline'

const meta: Meta<typeof Timeline> = {
  title: 'Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Timeline>

const deploymentItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Deployment triggered',
    description: 'Build #1042 started by Sarah Mitchell',
    timestamp: '2 min ago',
    icon: <Rocket size={14} />,
    variant: 'info',
  },
  {
    id: '2',
    title: 'Tests passed',
    description: '247 unit tests, 18 integration tests — all green',
    timestamp: '4 min ago',
    icon: <CheckCircle size={14} />,
    variant: 'success',
  },
  {
    id: '3',
    title: 'Security scan',
    description: 'No vulnerabilities detected in dependencies',
    timestamp: '6 min ago',
    icon: <Shield size={14} />,
    variant: 'success',
  },
  {
    id: '4',
    title: 'Awaiting approval',
    description: 'Pending review from 2 approvers',
    timestamp: '8 min ago',
    icon: <Clock size={14} />,
    variant: 'warning',
  },
  {
    id: '5',
    title: 'Build failed',
    description: 'TypeScript compilation error in src/api/client.ts',
    timestamp: '1 hr ago',
    icon: <AlertCircle size={14} />,
    variant: 'error',
  },
]

const activityItems: TimelineItem[] = [
  {
    id: '1',
    title: 'New user registered',
    description: 'james.rodriguez@acme.com joined the workspace',
    timestamp: 'Today, 9:41 AM',
    icon: <UserPlus size={14} />,
    variant: 'success',
  },
  {
    id: '2',
    title: 'Commit pushed',
    description: 'feat: add dark mode support — main branch',
    timestamp: 'Today, 8:15 AM',
    icon: <GitCommit size={14} />,
    variant: 'default',
  },
  {
    id: '3',
    title: 'Deployment to staging',
    description: 'v2.4.1-rc.3 deployed successfully',
    timestamp: 'Yesterday, 5:30 PM',
    icon: <Rocket size={14} />,
    variant: 'info',
  },
  {
    id: '4',
    title: 'Security alert resolved',
    description: 'CVE-2024-1234 patched in lodash dependency',
    timestamp: 'Yesterday, 2:00 PM',
    icon: <Shield size={14} />,
    variant: 'warning',
  },
]

export const DeploymentPipeline: Story = {
  args: { items: deploymentItems, orientation: 'vertical' },
}

export const ActivityFeed: Story = {
  args: { items: activityItems, orientation: 'vertical' },
}

export const HorizontalSteps: Story = {
  render: () => (
    <Timeline
      orientation="horizontal"
      items={[
        { id: '1', title: 'Order Placed', description: 'Jan 15', icon: <CheckCircle size={14} />, variant: 'success' },
        { id: '2', title: 'Processing', description: 'Jan 16', icon: <CheckCircle size={14} />, variant: 'success' },
        { id: '3', title: 'Shipped', description: 'Jan 17', icon: <Clock size={14} />, variant: 'warning' },
        { id: '4', title: 'Out for Delivery', description: 'Jan 18', icon: <Clock size={14} />, variant: 'default' },
        { id: '5', title: 'Delivered', description: 'Pending', icon: <Clock size={14} />, variant: 'default' },
      ]}
    />
  ),
}
