import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Home, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import { Breadcrumb } from '../src/components/navigation/Breadcrumb/Breadcrumb'
import { Tabs, TabsContent } from '../src/components/navigation/Tabs/Tabs'
import { Pagination } from '../src/components/navigation/Pagination/Pagination'
import { StepIndicator } from '../src/components/navigation/StepIndicator/StepIndicator'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Navigation/Nav Components',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Breadcrumbs: Story = {
  render: () => (
    <Stack gap="lg">
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Settings', href: '#' },
          { label: 'Team Members' },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '#' },
          { label: 'Projects', href: '#' },
          { label: 'Acme Corp', href: '#' },
          { label: 'Q4 Report', href: '#' },
          { label: 'Analytics' },
        ]}
        maxItems={4}
      />
    </Stack>
  ),
}

export const TabVariants: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Underline (default)</p>
        <Tabs
          variant="underline"
          defaultValue="overview"
          items={[
            { value: 'overview', label: 'Overview' },
            { value: 'analytics', label: 'Analytics', icon: <BarChart3 size={14} /> },
            { value: 'reports', label: 'Reports', icon: <FileText size={14} /> },
            { value: 'settings', label: 'Settings', icon: <Settings size={14} />, disabled: true },
          ]}
        >
          <TabsContent value="overview"><p style={{ padding: '16px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Overview content — key metrics and summaries.</p></TabsContent>
          <TabsContent value="analytics"><p style={{ padding: '16px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Analytics content — charts and trends.</p></TabsContent>
          <TabsContent value="reports"><p style={{ padding: '16px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Reports content — downloadable exports.</p></TabsContent>
        </Tabs>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pill</p>
        <Tabs
          variant="pill"
          defaultValue="all"
          items={[
            { value: 'all', label: 'All', badge: '128' },
            { value: 'active', label: 'Active', badge: '84' },
            { value: 'pending', label: 'Pending', badge: '32' },
            { value: 'archived', label: 'Archived', badge: '12' },
          ]}
        >
          <TabsContent value="all"><p style={{ padding: '12px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>All items</p></TabsContent>
          <TabsContent value="active"><p style={{ padding: '12px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Active items</p></TabsContent>
          <TabsContent value="pending"><p style={{ padding: '12px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Pending items</p></TabsContent>
          <TabsContent value="archived"><p style={{ padding: '12px 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Archived items</p></TabsContent>
        </Tabs>
      </div>
    </Stack>
  ),
}

export const PaginationVariants: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [page2, setPage2] = useState(5)
    return (
      <Stack gap="xl">
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Page {page} of 10
          </p>
          <Pagination page={page} total={100} pageSize={10} onPageChange={setPage} />
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Page {page2} of 20 (with siblings)
          </p>
          <Pagination page={page2} total={200} pageSize={10} onPageChange={setPage2} siblingCount={2} showFirstLast />
        </div>
      </Stack>
    )
  },
}

export const StepIndicators: Story = {
  render: () => {
    const [step, setStep] = useState(1)
    const steps = [
      { id: 'account', label: 'Account', description: 'Basic info' },
      { id: 'profile', label: 'Profile', description: 'Personal details' },
      { id: 'billing', label: 'Billing', description: 'Payment method' },
      { id: 'review', label: 'Review', description: 'Confirm & submit' },
    ]
    return (
      <Stack gap="xl">
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Horizontal</p>
          <StepIndicator
            steps={steps}
            currentStep={step}
            orientation="horizontal"
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid var(--color-border)', cursor: 'pointer', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem' }}>Back</button>
            <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', background: 'var(--color-primary)', color: '#fff', fontSize: '0.875rem' }}>Next</button>
          </div>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vertical</p>
          <StepIndicator
            steps={steps}
            currentStep={2}
            orientation="vertical"
          />
        </div>
      </Stack>
    )
  },
}
