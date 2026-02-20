import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../src/components/inputs/Select/Select'
import { Checkbox } from '../src/components/inputs/Checkbox/Checkbox'
import { RadioGroup } from '../src/components/inputs/Radio/Radio'
import { Switch } from '../src/components/inputs/Switch/Switch'
import { TextArea } from '../src/components/inputs/TextArea/TextArea'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Card } from '../src/components/display/Card/Card'

const meta: Meta = {
  title: 'Inputs/Form Controls',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const SelectVariants: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 400 }}>
      <Select
        label="Country"
        placeholder="Select a country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'gb', label: 'United Kingdom' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'jp', label: 'Japan' },
          { value: 'au', label: 'Australia' },
        ]}
      />
      <Select
        label="Department"
        defaultValue="engineering"
        helperText="Select the team this user belongs to"
        groups={[
          {
            label: 'Technical',
            options: [
              { value: 'engineering', label: 'Engineering' },
              { value: 'design', label: 'Design' },
              { value: 'data', label: 'Data & Analytics' },
            ],
          },
          {
            label: 'Business',
            options: [
              { value: 'sales', label: 'Sales' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'finance', label: 'Finance' },
            ],
          },
        ]}
      />
      <Select
        label="Priority"
        defaultValue="medium"
        error="This field is required"
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical', disabled: true },
        ]}
      />
    </Stack>
  ),
}

export const CheckboxGroup: Story = {
  render: () => {
    const [permissions, setPermissions] = useState({
      read: true,
      write: false,
      delete: false,
      admin: false,
    })
    return (
      <Card style={{ maxWidth: 360 }}>
        <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 16, fontSize: '0.9375rem' }}>
          User Permissions
        </p>
        <Stack gap="sm">
          <Checkbox
            label="Read access"
            description="Can view all resources"
            checked={permissions.read}
            onCheckedChange={(v) => setPermissions((p) => ({ ...p, read: !!v }))}
          />
          <Checkbox
            label="Write access"
            description="Can create and edit resources"
            checked={permissions.write}
            onCheckedChange={(v) => setPermissions((p) => ({ ...p, write: !!v }))}
          />
          <Checkbox
            label="Delete access"
            description="Can permanently remove resources"
            checked={permissions.delete}
            onCheckedChange={(v) => setPermissions((p) => ({ ...p, delete: !!v }))}
          />
          <Checkbox
            label="Admin access"
            description="Full control including billing and team management"
            checked={permissions.admin}
            onCheckedChange={(v) => setPermissions((p) => ({ ...p, admin: !!v }))}
            disabled
          />
        </Stack>
      </Card>
    )
  },
}

export const RadioGroups: Story = {
  render: () => (
    <Stack gap="xl" style={{ maxWidth: 400 }}>
      <RadioGroup
        label="Billing Cycle"
        defaultValue="monthly"
        options={[
          { value: 'monthly', label: 'Monthly', description: 'Billed every month, cancel anytime' },
          { value: 'annual', label: 'Annual', description: 'Save 20% — billed once per year' },
          { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing for large teams', disabled: true },
        ]}
      />
      <RadioGroup
        label="Notification Frequency"
        defaultValue="daily"
        orientation="horizontal"
        options={[
          { value: 'realtime', label: 'Real-time' },
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'never', label: 'Never' },
        ]}
      />
    </Stack>
  ),
}

export const SwitchControls: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      twoFactor: false,
      darkMode: false,
      analytics: true,
      marketing: false,
    })
    return (
      <Card style={{ maxWidth: 420 }}>
        <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 16, fontSize: '0.9375rem' }}>
          Account Settings
        </p>
        <Stack gap="sm">
          {[
            { key: 'notifications', label: 'Email Notifications', description: 'Receive updates about your account activity' },
            { key: 'twoFactor', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
            { key: 'darkMode', label: 'Dark Mode', description: 'Switch to a darker color scheme' },
            { key: 'analytics', label: 'Usage Analytics', description: 'Help us improve by sharing anonymous usage data' },
            { key: 'marketing', label: 'Marketing Emails', description: 'Receive product updates and promotional offers' },
          ].map(({ key, label, description }) => (
            <Switch
              key={key}
              label={label}
              description={description}
              checked={settings[key as keyof typeof settings]}
              onCheckedChange={(v) => setSettings((p) => ({ ...p, [key]: v }))}
            />
          ))}
        </Stack>
      </Card>
    )
  },
}

export const TextAreaVariants: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 480 }}>
      <TextArea
        label="Description"
        placeholder="Write a brief description..."
        helperText="Markdown is supported"
        rows={4}
      />
      <TextArea
        label="Notes"
        placeholder="Add internal notes..."
        showCharCount
        maxLength={500}
        autoResize
        rows={3}
      />
      <TextArea
        label="Rejection Reason"
        placeholder="Explain why this was rejected..."
        error="Please provide a reason before submitting"
        rows={3}
      />
    </Stack>
  ),
}
