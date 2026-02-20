import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Copy, Edit, Trash2, Share2, Download, ExternalLink,
  Settings, User, Bell, Info, ChevronDown, Filter,
} from 'lucide-react'
import { Tooltip } from '../src/components/overlay/Tooltip/Tooltip'
import { Popover } from '../src/components/overlay/Popover/Popover'
import { ContextMenu } from '../src/components/overlay/ContextMenu/ContextMenu'
import { Button } from '../src/components/inputs/Button/Button'
import { IconButton } from '../src/components/inputs/IconButton/IconButton'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Avatar } from '../src/components/display/Avatar/Avatar'
import { Badge } from '../src/components/display/Badge/Badge'
import { Divider } from '../src/components/layout/Divider/Divider'
import type { ContextMenuItem } from '../src/components/overlay/ContextMenu/ContextMenu'

const meta: Meta = {
  title: 'Overlay/Tooltip, Popover & ContextMenu',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Tooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Placements</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
            <Tooltip key={placement} content={`Tooltip on ${placement}`} placement={placement}>
              <Button variant="outline" size="sm">{placement}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>On icon buttons</p>
        <Stack direction="row" gap="sm">
          <Tooltip content="Copy to clipboard">
            <IconButton icon={<Copy size={14} />} aria-label="Copy" variant="outline" />
          </Tooltip>
          <Tooltip content="Edit record">
            <IconButton icon={<Edit size={14} />} aria-label="Edit" variant="outline" />
          </Tooltip>
          <Tooltip content="Delete permanently" placement="bottom">
            <IconButton icon={<Trash2 size={14} />} aria-label="Delete" variant="outline" />
          </Tooltip>
          <Tooltip content="Share with team" placement="bottom">
            <IconButton icon={<Share2 size={14} />} aria-label="Share" variant="outline" />
          </Tooltip>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rich content</p>
        <Tooltip
          content={
            <span>
              <strong>Keyboard shortcut:</strong> ⌘ + K
            </span>
          }
          placement="right"
        >
          <Button variant="outline" size="sm" leftIcon={<Info size={14} />}>Command palette</Button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const Popovers: Story = {
  render: () => (
    <Stack direction="row" gap="lg" style={{ padding: 32, flexWrap: 'wrap' }}>
      <Popover
        placement="bottom-start"
        showClose
        content={
          <div style={{ minWidth: 220 }}>
            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 4 }}>Notification Settings</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
              Choose how you want to be notified about activity.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Email digest', 'Push notifications', 'Slack alerts'].map((item) => (
                <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', cursor: 'pointer', color: 'var(--color-text)' }}>
                  <input type="checkbox" defaultChecked={item !== 'Slack alerts'} style={{ accentColor: 'var(--color-primary)' }} />
                  {item}
                </label>
              ))}
            </div>
          </div>
        }
      >
        <Button variant="outline" size="sm" leftIcon={<Bell size={14} />} rightIcon={<ChevronDown size={12} />}>
          Notifications
        </Button>
      </Popover>

      <Popover
        placement="bottom"
        content={
          <div style={{ minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Avatar name="Sarah Mitchell" size="md" />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>Sarah Mitchell</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>sarah@acme.com</p>
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
              {[
                { icon: <User size={14} />, label: 'View profile' },
                { icon: <Settings size={14} />, label: 'Account settings' },
              ].map(({ icon, label }) => (
                <button key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text)', textAlign: 'left', width: '100%' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <Avatar name="Sarah Mitchell" size="sm" className="cursor-pointer" />
      </Popover>

      <Popover
        placement="bottom-end"
        content={
          <div style={{ minWidth: 180 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Filter by status</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['All', 'Active', 'Pending', 'Archived'].map((f) => (
                <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', cursor: 'pointer', color: 'var(--color-text)' }}>
                  <input type="radio" name="filter" defaultChecked={f === 'All'} style={{ accentColor: 'var(--color-primary)' }} />
                  {f}
                </label>
              ))}
            </div>
          </div>
        }
      >
        <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>Filter</Button>
      </Popover>
    </Stack>
  ),
}

const fileMenuItems: ContextMenuItem[] = [
  { type: 'label', label: 'Actions' },
  { label: 'Open', icon: <ExternalLink size={14} />, shortcut: '⌘O' },
  { label: 'Edit', icon: <Edit size={14} />, shortcut: '⌘E' },
  { label: 'Duplicate', icon: <Copy size={14} />, shortcut: '⌘D' },
  { label: 'Download', icon: <Download size={14} />, shortcut: '⌘⇧D' },
  { type: 'separator' },
  { label: 'Share', icon: <Share2 size={14} />, children: [
    { label: 'Copy link', icon: <Copy size={14} /> },
    { label: 'Share via email', icon: <ExternalLink size={14} /> },
  ]},
  { type: 'separator' },
  { label: 'Delete', icon: <Trash2 size={14} />, destructive: true, shortcut: '⌫' },
]

export const ContextMenus: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
        Right-click (or long-press) on the card below to open the context menu.
      </p>
      <ContextMenu items={fileMenuItems}>
        <div style={{
          padding: 24,
          borderRadius: 10,
          border: '2px dashed var(--color-border)',
          background: 'var(--color-surface)',
          cursor: 'context-menu',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 320,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Download size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>Q4-Report-2024.pdf</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>2.4 MB · Modified 2 days ago</p>
          </div>
          <span style={{ marginLeft: 'auto' }}><Badge variant="info" size="sm">New</Badge></span>
        </div>
      </ContextMenu>
    </div>
  ),
}
