import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible } from '../src/components/display/Collapsible/Collapsible'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Settings, Users, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react'

const meta: Meta<typeof Collapsible> = {
  title: 'Display/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'bordered', 'filled'] },
    disabled: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  args: {
    title: 'What is a UI component library?',
    defaultOpen: true,
    children: 'A UI component library is a collection of reusable interface elements — buttons, inputs, modals, etc. — built to a consistent design system, enabling teams to build UIs faster and more consistently.',
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 520 }}>
      <Stack gap="md">
        <Collapsible title="Default variant" defaultOpen>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
            The default variant has no border or background — just a subtle hover state on the trigger.
          </p>
        </Collapsible>
        <Collapsible title="Bordered variant" variant="bordered" icon={<Settings size={16} />}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
            The bordered variant wraps the entire collapsible in a card-like border.
          </p>
        </Collapsible>
        <Collapsible title="Filled variant" variant="filled" icon={<Users size={16} />}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
            The filled variant uses a subtle background color for the container.
          </p>
        </Collapsible>
        <Collapsible title="Disabled" disabled>
          <p>This content is not accessible.</p>
        </Collapsible>
      </Stack>
    </div>
  ),
}

export const FAQAccordion: Story = {
  render: () => {
    const faqs = [
      { q: 'Is this library free to use?', a: 'Yes, it is MIT licensed and completely free for personal and commercial use.' },
      { q: 'Does it support dark mode?', a: 'Yes, the library uses CSS custom properties for theming, making dark mode trivial to implement.' },
      { q: 'Can I customize the components?', a: 'All components accept className props and are built with Tailwind CSS, making customization straightforward.' },
      { q: 'Is TypeScript supported?', a: 'Yes, the library is written entirely in TypeScript with full type definitions exported.' },
    ]
    return (
      <div style={{ padding: '1rem', maxWidth: 560 }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Frequently Asked Questions
        </h2>
        <Stack gap="xs">
          {faqs.map((faq, i) => (
            <Collapsible key={i} title={faq.q} variant="bordered">
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>{faq.a}</p>
            </Collapsible>
          ))}
        </Stack>
      </div>
    )
  },
}

export const SettingsPanel: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 520 }}>
      <Stack gap="sm">
        {[
          { title: 'Account Settings', icon: <Users size={16} />, content: 'Manage your profile, email, and account preferences.' },
          { title: 'Notifications', icon: <Bell size={16} />, content: 'Configure email, push, and in-app notification preferences.' },
          { title: 'Security', icon: <Shield size={16} />, content: 'Two-factor authentication, active sessions, and password settings.' },
          { title: 'Billing', icon: <CreditCard size={16} />, content: 'Manage your subscription, payment methods, and invoices.' },
          { title: 'Help & Support', icon: <HelpCircle size={16} />, content: 'Documentation, FAQs, and contact support.' },
        ].map((s) => (
          <Collapsible key={s.title} title={s.title} variant="bordered" icon={s.icon}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>{s.content}</p>
          </Collapsible>
        ))}
      </Stack>
    </div>
  ),
}
