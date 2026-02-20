import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Edit, Trash2, Copy, Share2, Download, Settings,
  Bell, Plus, X, Check, RefreshCw,
} from 'lucide-react'
import { Label } from '../src/components/typography/Label/Label'
import { FormField } from '../src/components/forms/FormField/FormField'
import { ErrorBoundary } from '../src/components/feedback/ErrorBoundary/ErrorBoundary'
import { IconButton } from '../src/components/inputs/IconButton/IconButton'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Button } from '../src/components/inputs/Button/Button'

const meta: Meta = {
  title: 'Misc/Label, FormField, IconButton & ErrorBoundary',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Labels: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 400 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sizes</p>
        <Stack gap="sm">
          <Label size="sm">Small label</Label>
          <Label size="md">Medium label (default)</Label>
          <Label size="lg">Large label</Label>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required & optional</p>
        <Stack gap="sm">
          <Label required>Email address</Label>
          <Label required>Password</Label>
          <Label optional>Phone number</Label>
          <Label optional>Company name</Label>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Associated with input</p>
        <Stack gap="xs">
          <Label htmlFor="demo-input" required>Full name</Label>
          <input
            id="demo-input"
            type="text"
            placeholder="John Doe"
            style={{
              height: 36, padding: '0 12px', borderRadius: 6,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)', fontSize: '0.875rem',
              outline: 'none', width: '100%',
            }}
          />
        </Stack>
      </div>
    </Stack>
  ),
}

export const FormFields: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 420 }}>
      <FormField label="Username" helperText="3–20 characters, letters and numbers only" required>
        <input
          type="text"
          placeholder="john_doe"
          style={{ height: 36, padding: '0 12px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', outline: 'none', width: '100%' }}
        />
      </FormField>
      <FormField label="Email" error="This email is already registered">
        <input
          type="email"
          defaultValue="john@example.com"
          style={{ height: 36, padding: '0 12px', borderRadius: 6, border: '1px solid var(--color-error)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', outline: 'none', width: '100%' }}
        />
      </FormField>
      <FormField label="Bio" helperText="Tell us a bit about yourself">
        <textarea
          rows={3}
          placeholder="I'm a software engineer..."
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', outline: 'none', width: '100%', resize: 'vertical', fontFamily: 'inherit' }}
        />
      </FormField>
      <FormField label="API Key" disabled helperText="Contact your admin to regenerate">
        <input
          type="text"
          defaultValue="sk-••••••••••••••••••••••••"
          disabled
          style={{ height: 36, padding: '0 12px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', outline: 'none', width: '100%' }}
        />
      </FormField>
    </Stack>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Variants</p>
        <Stack direction="row" gap="sm" align="center">
          <IconButton icon={<Edit size={14} />} aria-label="Edit" variant="primary" />
          <IconButton icon={<Settings size={14} />} aria-label="Settings" variant="secondary" />
          <IconButton icon={<Copy size={14} />} aria-label="Copy" variant="outline" />
          <IconButton icon={<Bell size={14} />} aria-label="Notifications" variant="ghost" />
          <IconButton icon={<Trash2 size={14} />} aria-label="Delete" variant="danger" />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sizes</p>
        <Stack direction="row" gap="sm" align="center">
          <IconButton icon={<Settings size={10} />} aria-label="xs" variant="outline" size="xs" />
          <IconButton icon={<Settings size={12} />} aria-label="sm" variant="outline" size="sm" />
          <IconButton icon={<Settings size={14} />} aria-label="md" variant="outline" size="md" />
          <IconButton icon={<Settings size={16} />} aria-label="lg" variant="outline" size="lg" />
          <IconButton icon={<Settings size={20} />} aria-label="xl" variant="outline" size="xl" />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rounded (circular)</p>
        <Stack direction="row" gap="sm" align="center">
          <IconButton icon={<Plus size={14} />} aria-label="Add" variant="primary" rounded />
          <IconButton icon={<X size={14} />} aria-label="Close" variant="outline" rounded />
          <IconButton icon={<Check size={14} />} aria-label="Confirm" variant="ghost" rounded />
          <IconButton icon={<Share2 size={14} />} aria-label="Share" variant="outline" rounded />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loading & disabled</p>
        <Stack direction="row" gap="sm" align="center">
          <IconButton icon={<Download size={14} />} aria-label="Download" variant="primary" loading />
          <IconButton icon={<Download size={14} />} aria-label="Download" variant="outline" loading />
          <IconButton icon={<Edit size={14} />} aria-label="Edit" variant="outline" disabled />
        </Stack>
      </div>
    </Stack>
  ),
}

function BrokenComponent(): React.ReactElement {
  throw new Error('Simulated render error: data.map is not a function')
}

export const ErrorBoundaryDefault: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 480 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default fallback UI</p>
        <ErrorBoundary>
          <BrokenComponent />
        </ErrorBoundary>
      </div>
    </Stack>
  ),
}

export const ErrorBoundaryCustomFallback: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 480 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Custom fallback with reset</p>
        <ErrorBoundary
          fallback={(error, reset) => (
            <div style={{
              padding: 24, borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <p style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9375rem' }}>Widget failed to load</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{error.message}</p>
              <Stack direction="row" gap="sm">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<RefreshCw size={12} />}
                  onClick={reset}
                >
                  Retry
                </Button>
                <Button variant="ghost" size="sm">Report issue</Button>
              </Stack>
            </div>
          )}
        >
          <BrokenComponent />
        </ErrorBoundary>
      </div>
    </Stack>
  ),
}
