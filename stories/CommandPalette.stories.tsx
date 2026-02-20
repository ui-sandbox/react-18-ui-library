import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CommandPalette, useCommandPalette } from '../src/components/overlay/CommandPalette/CommandPalette'
import { Button } from '../src/components/inputs/Button/Button'
import { Kbd } from '../src/components/typography/Kbd/Kbd'
import { Stack } from '../src/components/layout/Stack/Stack'
import {
  Home, Users, Settings, BarChart3, FileText, Search,
  LogOut, Palette, Keyboard, HelpCircle, Plus, Download,
  Bell, Shield, Package, Moon,
} from 'lucide-react'

const meta: Meta<typeof CommandPalette> = {
  title: 'Overlay/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CommandPalette>

const commandGroups = [
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Go to Dashboard', description: 'Main overview page', icon: <Home size={16} />, shortcut: ['G', 'D'], onSelect: () => {} },
      { id: 'users', label: 'Go to Users', description: 'Manage team members', icon: <Users size={16} />, shortcut: ['G', 'U'], onSelect: () => {} },
      { id: 'analytics', label: 'Go to Analytics', description: 'Charts and metrics', icon: <BarChart3 size={16} />, shortcut: ['G', 'A'], onSelect: () => {} },
      { id: 'settings', label: 'Go to Settings', description: 'App configuration', icon: <Settings size={16} />, shortcut: ['G', 'S'], onSelect: () => {} },
      { id: 'reports', label: 'Go to Reports', description: 'Analytics & exports', icon: <FileText size={16} />, onSelect: () => {} },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'new-user', label: 'Invite User', description: 'Send an invitation email', icon: <Plus size={16} />, shortcut: ['⌘', 'I'], onSelect: () => {} },
      { id: 'export', label: 'Export Data', description: 'Download as CSV or JSON', icon: <Download size={16} />, onSelect: () => {} },
      { id: 'notifications', label: 'View Notifications', description: '3 unread notifications', icon: <Bell size={16} />, onSelect: () => {} },
      { id: 'theme', label: 'Toggle Dark Mode', description: 'Switch light / dark mode', icon: <Moon size={16} />, shortcut: ['⌘', 'T'], onSelect: () => {} },
      { id: 'logout', label: 'Sign Out', description: 'End your current session', icon: <LogOut size={16} />, onSelect: () => {} },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    items: [
      { id: 'docs', label: 'Documentation', description: 'Read the full docs', icon: <HelpCircle size={16} />, onSelect: () => {} },
      { id: 'shortcuts', label: 'Keyboard Shortcuts', description: 'View all shortcuts', icon: <Keyboard size={16} />, shortcut: ['?'], onSelect: () => {} },
      { id: 'security', label: 'Security Settings', description: 'Manage 2FA and sessions', icon: <Shield size={16} />, onSelect: () => {} },
    ],
  },
]

export const Default: Story = {
  render: () => {
    const { open, setOpen } = useCommandPalette()
    return (
      <div style={{ padding: '2rem' }}>
        <Stack gap="md" align="start">
          <Stack direction="row" gap="sm" align="center">
            <Button onClick={() => setOpen(true)}>
              <Search size={14} style={{ marginRight: 6 }} />
              Open Command Palette
            </Button>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>or press</span>
            <Kbd>⌘</Kbd>
            <span style={{ color: 'var(--color-text-muted)' }}>+</span>
            <Kbd>K</Kbd>
          </Stack>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Use <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate · <Kbd size="sm">↵</Kbd> to select · <Kbd size="sm">Esc</Kbd> to close
          </p>
        </Stack>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          groups={commandGroups}
          placeholder="Search commands, pages, actions…"
        />
      </div>
    )
  },
}

export const WithFlatItems: Story = {
  render: () => {
    const { open, setOpen } = useCommandPalette()
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>Open (flat items)</Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={[
            { id: 'home', label: 'Dashboard', icon: <Home size={16} />, onSelect: () => {} },
            { id: 'users', label: 'Users', icon: <Users size={16} />, onSelect: () => {} },
            { id: 'settings', label: 'Settings', icon: <Settings size={16} />, onSelect: () => {} },
            { id: 'products', label: 'Products', icon: <Package size={16} />, onSelect: () => {} },
          ]}
        />
      </div>
    )
  },
}
