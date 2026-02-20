import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  LayoutDashboard, Users, BarChart3, Settings, FileText,
  Bell, Search, HelpCircle, LogOut, Shield,
} from 'lucide-react'
import { Navbar } from '../src/components/layout/Navbar/Navbar'
import { Sidebar } from '../src/components/layout/Sidebar/Sidebar'
import { Button } from '../src/components/inputs/Button/Button'
import { IconButton } from '../src/components/inputs/IconButton/IconButton'
import { Avatar } from '../src/components/display/Avatar/Avatar'
import { Badge } from '../src/components/display/Badge/Badge'
import { BadgeAnchor } from '../src/components/display/Badge/Badge'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Layout/Navbar & Sidebar',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Shield size={16} style={{ color: '#fff' }} />
    </div>
    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Acme</span>
  </div>
)

export const NavbarDefault: Story = {
  render: () => (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
      <Navbar
        logo={<Logo />}
        links={[
          { label: 'Dashboard', href: '#', active: true },
          { label: 'Projects', href: '#' },
          { label: 'Team', href: '#' },
          { label: 'Reports', href: '#' },
        ]}
        actions={
          <Stack direction="row" gap="xs" align="center">
            <BadgeAnchor badge={<Badge variant="error" dot />} position="top-right">
              <IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="ghost" />
            </BadgeAnchor>
            <IconButton icon={<Search size={16} />} aria-label="Search" variant="ghost" />
            <Avatar name="Sarah Mitchell" size="sm" className="cursor-pointer" />
          </Stack>
        }
      />
      <div style={{ padding: 24, background: 'var(--color-background)', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Page content area</p>
      </div>
    </div>
  ),
}

export const NavbarMinimal: Story = {
  render: () => (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
      <Navbar
        logo={<Logo />}
        bordered={false}
        actions={
          <Stack direction="row" gap="sm" align="center">
            <Button variant="outline" size="sm">Sign in</Button>
            <Button variant="primary" size="sm">Get started</Button>
          </Stack>
        }
      />
      <div style={{ padding: 24, background: 'var(--color-background)', minHeight: 80 }} />
    </div>
  ),
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
  {
    id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} />,
    children: [
      { id: 'overview', label: 'Overview' },
      { id: 'reports', label: 'Reports' },
      { id: 'exports', label: 'Exports' },
    ],
  },
  { id: 'users', label: 'Users', icon: <Users size={16} />, badge: 12 },
  { id: 'documents', label: 'Documents', icon: <FileText size={16} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle size={16} /> },
]

export const SidebarExpanded: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 480, border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
      <Sidebar
        items={sidebarItems}
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={16} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#fff', letterSpacing: '-0.01em' }}>Acme Corp</span>
          </div>
        }
        footer={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name="Sarah Mitchell" size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', truncate: true }}>Sarah Mitchell</p>
              <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)' }}>Admin</p>
            </div>
            <IconButton icon={<LogOut size={14} />} aria-label="Sign out" variant="ghost" style={{ color: 'rgba(255,255,255,0.6)' }} />
          </div>
        }
      />
      <div style={{ flex: 1, padding: 24, background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Main content area</p>
      </div>
    </div>
  ),
}

export const SidebarCollapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={{ display: 'flex', height: 480, border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
        <Sidebar
          items={sidebarItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={
            !collapsed ? (
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#fff' }}>Acme Corp</span>
            ) : (
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={16} style={{ color: '#fff' }} />
              </div>
            )
          }
        />
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Sidebar is {collapsed ? 'collapsed' : 'expanded'} — click the arrow to toggle
          </p>
        </div>
      </div>
    )
  },
}
