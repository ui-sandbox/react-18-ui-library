import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  LayoutDashboard, Users, BarChart3, Settings, FileText,
  Bell, Search, HelpCircle, LogOut, Shield, User, CreditCard, LifeBuoy,
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
  name: 'Navbar — Default',
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
          </Stack>
        }
      />
      <div style={{ padding: 24, background: 'var(--color-background)', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Page content area</p>
      </div>
    </div>
  ),
}

export const NavbarWithProfile: Story = {
  name: 'Navbar — With Profile',
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
          </Stack>
        }
        profile={{
          name: 'Sarah Mitchell',
          email: 'sarah.mitchell@acme.com',
          menuItems: [
            { name: 'My Profile', href: '#' },
            { name: 'Account Settings', href: '#' },
            { name: 'Billing', href: '#' },
            { name: 'Help & Support', href: '#' },
            { name: 'Sign out', href: '#' },
          ],
        }}
      />
      <div style={{ padding: 24, background: 'var(--color-background)', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Click the profile button (top-right) to open the submenu</p>
      </div>
    </div>
  ),
}

export const NavbarWithProfileAvatar: Story = {
  name: 'Navbar — Profile with Avatar Image',
  render: () => (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
      <Navbar
        logo={<Logo />}
        links={[
          { label: 'Dashboard', href: '#', active: true },
          { label: 'Projects', href: '#' },
        ]}
        profile={{
          name: 'James Carter',
          email: 'james@acme.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=12',
          menuItems: [
            { name: 'Profile', href: '#' },
            { name: 'Settings', href: '#' },
            { name: 'Sign out', href: '#' },
          ],
        }}
      />
      <div style={{ padding: 24, background: 'var(--color-background)', minHeight: 80 }} />
    </div>
  ),
}

export const NavbarMinimal: Story = {
  name: 'Navbar — Minimal (no links)',
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
  name: 'Sidebar — Expanded with Footer',
  render: () => (
    <div style={{ display: 'flex', height: 520, border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'visible', position: 'relative' }}>
      <Sidebar
        items={sidebarItems}
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={16} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#fff', letterSpacing: '-0.01em' }}>Acme Corp</span>
          </div>
        }
        collapsedIcon={<Shield size={16} style={{ color: 'var(--color-primary)' }} />}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name="Sarah Mitchell" size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>Sarah Mitchell</p>
              <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)' }}>Admin</p>
            </div>
            <IconButton icon={<LogOut size={14} />} aria-label="Sign out" variant="ghost" style={{ color: 'rgba(255,255,255,0.6)' }} />
          </div>
        }
      />
      <div style={{ flex: 1, padding: 24, background: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Hover the right edge of the sidebar to see the floating collapse tab</p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', opacity: 0.6 }}>Active items show a blue left accent bar · Collapsed items show tooltips on hover</p>
      </div>
    </div>
  ),
}

export const SidebarCollapsible: Story = {
  name: 'Sidebar — Collapsible (floating tab)',
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={{ display: 'flex', height: 520, border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'visible', position: 'relative' }}>
        <Sidebar
          items={sidebarItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={16} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#fff' }}>Acme Corp</span>
            </div>
          }
          collapsedIcon={<Shield size={15} style={{ color: 'var(--color-primary)' }} />}
          footer={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar name="Sarah Mitchell" size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>Sarah Mitchell</p>
                <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)' }}>Admin</p>
              </div>
            </div>
          }
        />
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Sidebar is <strong style={{ color: 'var(--color-text)' }}>{collapsed ? 'collapsed' : 'expanded'}</strong>
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', opacity: 0.7 }}>
            Hover the right edge of the sidebar — click the floating ⊙ tab to toggle
          </p>
          {collapsed && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', opacity: 0.7 }}>
              Hover over icons to see tooltips with item names
            </p>
          )}
        </div>
      </div>
    )
  },
}

export const SidebarNoHeader: Story = {
  name: 'Sidebar — No Header',
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={{ display: 'flex', height: 520, border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'visible', position: 'relative' }}>
        <Sidebar
          items={sidebarItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No header — floating tab still appears on right edge</p>
        </div>
      </div>
    )
  },
}
