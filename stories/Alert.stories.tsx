import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ShieldCheck, Zap } from 'lucide-react'
import { Alert } from '../src/components/feedback/Alert/Alert'
import { ToastProvider } from '../src/components/feedback/Toast/Toast'
import { Button } from '../src/components/inputs/Button/Button'
import { useToast } from '../src/hooks/useToast'

const meta: Meta = {
  title: 'Feedback/Alert & Toast',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert variant="info" title="System Update Scheduled">
        Maintenance window is planned for Sunday 2:00–4:00 AM UTC. No action required.
      </Alert>
      <Alert variant="success" title="Deployment Successful">
        Version 2.4.1 has been deployed to production. All health checks passed.
      </Alert>
      <Alert variant="warning" title="API Rate Limit Approaching">
        You have used 87% of your monthly API quota. Consider upgrading your plan.
      </Alert>
      <Alert variant="error" title="Payment Failed">
        Your card ending in 4242 was declined. Please update your billing information.
      </Alert>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert variant="info" title="New features available" dismissible>
        Check out the new dashboard widgets and reporting tools in your settings.
      </Alert>
      <Alert variant="success" title="Profile updated" dismissible>
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Session expiring soon" dismissible>
        Your session will expire in 5 minutes. Save your work to avoid losing changes.
      </Alert>
    </div>
  ),
}

export const WithCustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert
        variant="success"
        title="Security Verified"
        icon={<ShieldCheck size={16} />}
      >
        Two-factor authentication is active on your account.
      </Alert>
      <Alert
        variant="info"
        title="Pro Feature"
        icon={<Zap size={16} />}
      >
        Upgrade to Pro to unlock advanced analytics and unlimited exports.
      </Alert>
    </div>
  ),
}

function ToastDemo() {
  const { toasts, toast, dismiss } = useToast()
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => toast({ title: 'Changes saved', description: 'Your profile has been updated.', variant: 'success' })}
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast({ title: 'Processing...', description: 'Your request is being handled.', variant: 'info' })}
        >
          Info Toast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast({ title: 'Rate limit warning', description: '87% of quota used.', variant: 'warning' })}
        >
          Warning Toast
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => toast({ title: 'Action failed', description: 'Unable to connect to server.', variant: 'error' })}
        >
          Error Toast
        </Button>
      </div>
      <ToastProvider toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </>
  )
}

export const ToastNotifications: Story = {
  render: () => <ToastDemo />,
}
