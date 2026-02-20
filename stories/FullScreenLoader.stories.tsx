import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Loader2, Upload, RefreshCw, Database } from 'lucide-react'
import { FullScreenLoader, FullScreenLoaderProvider, useFullScreenLoader } from '../src/components/feedback/FullScreenLoader/FullScreenLoader'
import { Button } from '../src/components/inputs/Button/Button'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Feedback/FullScreenLoader',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const StaticPreview: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 320, border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: 24 }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Page content behind the loader</p>
      </div>
      {/* Inline preview — not a portal so it renders inside this container */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)', background: 'rgba(var(--color-background-rgb, 255,255,255), 0.7)',
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          padding: 32, borderRadius: 16, background: 'var(--color-surface)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid var(--color-border)',
        }}>
          <Loader2 size={36} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>Loading…</p>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
}

function HookDemo() {
  const loader = useFullScreenLoader()

  const simulate = async (text: string, icon?: React.ReactNode) => {
    loader.show({ text, icon })
    await new Promise((r) => setTimeout(r, 2500))
    loader.hide()
  }

  return (
    <Stack gap="sm" direction="row" style={{ flexWrap: 'wrap', padding: 24 }}>
      <Button
        variant="primary"
        size="sm"
        onClick={() => simulate('Loading data…')}
      >
        Default loader
      </Button>
      <Button
        variant="outline"
        size="sm"
        leftIcon={<Upload size={14} />}
        onClick={() => simulate('Uploading files…', <Upload size={36} style={{ color: 'var(--color-primary)', animation: 'pulse 1s ease-in-out infinite' }} />)}
      >
        Upload loader
      </Button>
      <Button
        variant="outline"
        size="sm"
        leftIcon={<Database size={14} />}
        onClick={() => simulate('Syncing database…', <Database size={36} style={{ color: 'var(--color-primary)' }} />)}
      >
        Sync loader
      </Button>
      <Button
        variant="outline"
        size="sm"
        leftIcon={<RefreshCw size={14} />}
        onClick={async () => {
          loader.show({ text: 'Connecting…' })
          await new Promise((r) => setTimeout(r, 1000))
          loader.update({ text: 'Authenticating…' })
          await new Promise((r) => setTimeout(r, 1000))
          loader.update({ text: 'Loading workspace…' })
          await new Promise((r) => setTimeout(r, 1000))
          loader.hide()
        }}
      >
        Multi-step loader
      </Button>
    </Stack>
  )
}

export const WithHook: Story = {
  render: () => (
    <FullScreenLoaderProvider>
      <HookDemo />
    </FullScreenLoaderProvider>
  ),
}
