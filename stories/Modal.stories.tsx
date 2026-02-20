import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Trash2, AlertTriangle } from 'lucide-react'
import { Modal } from '../src/components/overlay/Modal/Modal'
import { Drawer } from '../src/components/overlay/Drawer/Drawer'
import { Button } from '../src/components/inputs/Button/Button'
import { TextField } from '../src/components/inputs/TextField/TextField'
import { Select } from '../src/components/inputs/Select/Select'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Overlay/Modal & Drawer',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const BasicModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Edit Profile"
          description="Update your personal information below."
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Save Changes</Button>
            </div>
          }
        >
          <Stack gap="md">
            <TextField label="Full Name" defaultValue="Sarah Mitchell" />
            <TextField label="Email" type="email" defaultValue="sarah@acme.com" />
            <Select
              label="Role"
              defaultValue="admin"
              options={[
                { value: 'admin', label: 'Administrator' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
          </Stack>
        </Modal>
      </>
    )
  },
}

export const ConfirmDelete: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="danger" leftIcon={<Trash2 size={14} />} onClick={() => setOpen(true)}>
          Delete Record
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size="sm"
          title={
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={18} style={{ color: 'var(--color-error)' }} />
              Delete Confirmation
            </span>
          }
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Yes, Delete</Button>
            </div>
          }
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Are you sure you want to delete this record? This action{' '}
            <strong style={{ color: 'var(--color-text)' }}>cannot be undone</strong> and all
            associated data will be permanently removed.
          </p>
        </Modal>
      </>
    )
  },
}

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Right Drawer</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          side="right"
          size="md"
          title="User Details"
          description="View and edit user information"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              <Button variant="primary">Save</Button>
            </div>
          }
        >
          <Stack gap="md">
            <TextField label="Full Name" defaultValue="James Rodriguez" />
            <TextField label="Email" type="email" defaultValue="james@acme.com" />
            <TextField label="Department" defaultValue="Engineering" />
            <Select
              label="Status"
              defaultValue="active"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
              ]}
            />
          </Stack>
        </Drawer>
      </>
    )
  },
}

export const BottomDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          side="bottom"
          size="md"
          title="Quick Actions"
        >
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Export CSV', 'Send Report', 'Archive', 'Share Link', 'Print'].map((label) => (
              <Button key={label} variant="outline" size="sm" onClick={() => setOpen(false)}>
                {label}
              </Button>
            ))}
          </div>
        </Drawer>
      </>
    )
  },
}
