import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Trash2, LogOut, AlertTriangle, RefreshCw } from 'lucide-react'
import { ConfirmDialog, ConfirmDialogProvider, useConfirm } from '../src/components/overlay/ConfirmDialog/ConfirmDialog'
import { Button } from '../src/components/inputs/Button/Button'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Alert } from '../src/components/feedback/Alert/Alert'

const meta: Meta = {
  title: 'Overlay/ConfirmDialog',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const StaticDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    return (
      <Stack gap="md" style={{ padding: 24 }}>
        <Stack direction="row" gap="sm">
          <Button variant="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={() => setOpen(true)}>
            Delete record
          </Button>
        </Stack>
        {result && (
          <Alert variant={result === 'confirmed' ? 'error' : 'info'}>
            User {result === 'confirmed' ? 'confirmed deletion' : 'cancelled the action'}.
          </Alert>
        )}
        <ConfirmDialog
          open={open}
          variant="danger"
          title="Delete this record?"
          description="This action cannot be undone. The record and all associated data will be permanently removed."
          confirmLabel="Yes, delete"
          onConfirm={() => { setOpen(false); setResult('confirmed') }}
          onCancel={() => { setOpen(false); setResult('cancelled') }}
        />
      </Stack>
    )
  },
}

export const AllVariants: Story = {
  render: () => {
    const [open, setOpen] = useState<'default' | 'danger' | 'warning' | null>(null)
    const [result, setResult] = useState<string | null>(null)

    const close = (confirmed: boolean, variant: string) => {
      setOpen(null)
      setResult(confirmed ? `Confirmed (${variant})` : `Cancelled (${variant})`)
    }

    return (
      <Stack gap="md" style={{ padding: 24 }}>
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button variant="outline" size="sm" onClick={() => setOpen('default')}>
            Default confirm
          </Button>
          <Button variant="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={() => setOpen('danger')}>
            Danger confirm
          </Button>
          <Button variant="outline" size="sm" leftIcon={<AlertTriangle size={14} />} onClick={() => setOpen('warning')}>
            Warning confirm
          </Button>
        </Stack>

        {result && <Alert variant="info">{result}</Alert>}

        <ConfirmDialog
          open={open === 'default'}
          variant="default"
          title="Confirm action"
          description="Are you sure you want to proceed with this action?"
          onConfirm={() => close(true, 'default')}
          onCancel={() => close(false, 'default')}
        />
        <ConfirmDialog
          open={open === 'danger'}
          variant="danger"
          title="Delete all records?"
          description="This will permanently delete all 247 records. This action cannot be undone."
          confirmLabel="Delete all"
          onConfirm={() => close(true, 'danger')}
          onCancel={() => close(false, 'danger')}
        />
        <ConfirmDialog
          open={open === 'warning'}
          variant="warning"
          title="Unsaved changes"
          description="You have unsaved changes. Leaving this page will discard them."
          confirmLabel="Leave anyway"
          cancelLabel="Stay"
          onConfirm={() => close(true, 'warning')}
          onCancel={() => close(false, 'warning')}
        />
      </Stack>
    )
  },
}

function HookDemo() {
  const confirm = useConfirm()
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5))

  return (
    <Stack gap="md" style={{ padding: 24 }}>
      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
        Using <code style={{ background: 'var(--color-surface-hover)', padding: '1px 6px', borderRadius: 4 }}>useConfirm()</code> hook — no JSX needed at call sites.
      </p>
      <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 size={14} />}
          onClick={async () => {
            const ok = await confirm({
              title: 'Delete this user?',
              description: 'The user account and all their data will be permanently removed.',
              variant: 'danger',
              confirmLabel: 'Delete user',
            })
            addLog(ok ? '✓ User deleted' : '✗ Deletion cancelled')
          }}
        >
          Delete user
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<LogOut size={14} />}
          onClick={async () => {
            const ok = await confirm({
              title: 'Sign out?',
              description: 'You will be redirected to the login page.',
              confirmLabel: 'Sign out',
            })
            addLog(ok ? '✓ Signed out' : '✗ Sign out cancelled')
          }}
        >
          Sign out
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw size={14} />}
          onClick={async () => {
            const ok = await confirm({
              title: 'Reset to defaults?',
              description: 'All your custom settings will be lost.',
              variant: 'warning',
              confirmLabel: 'Reset',
            })
            addLog(ok ? '✓ Settings reset' : '✗ Reset cancelled')
          }}
        >
          Reset settings
        </Button>
      </Stack>

      {log.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {log.map((entry, i) => (
            <p key={i} style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
              {entry}
            </p>
          ))}
        </div>
      )}
    </Stack>
  )
}

export const WithHook: Story = {
  render: () => (
    <ConfirmDialogProvider>
      <HookDemo />
    </ConfirmDialogProvider>
  ),
}
