import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDashboard, Users, Settings, Bell, BarChart3, FileText, HelpCircle, LogOut, Shield } from 'lucide-react'
import { AppShell } from '../src/components/layout/AppShell/AppShell'
import { Avatar } from '../src/components/display/Avatar/Avatar'
import { IconButton } from '../src/components/inputs/IconButton/IconButton'
import { BadgeAnchor } from '../src/components/display/Badge/Badge'
import { Badge } from '../src/components/display/Badge/Badge'

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppShell>

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Shield size={14} style={{ color: '#fff' }} />
    </div>
    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>Acme</span>
  </div>
)

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> },
  { id: 'users', label: 'Users', icon: <Users size={16} />, badge: 12 },
  { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
  {
    id: 'settings', label: 'Settings', icon: <Settings size={16} />,
    children: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security' },
      { id: 'notifications', label: 'Notifications' },
    ],
  },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle size={16} /> },
]

const profileMenuItems = [
  { name: 'My Profile', href: '#' },
  { name: 'Account Settings', href: '#' },
  { name: 'Billing', href: '#' },
  { name: 'Sign out', href: '#' },
]

const PageContent = ({ title = 'Dashboard', subtitle = 'Welcome back. Here’s what’s happening today.' }: { title?: string; subtitle?: string }) => (
  <div style={{ padding: '2rem' }}>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{title}</h1>
    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>{subtitle}</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
      {['Total Users', 'Revenue', 'Active Sessions', 'Conversion'].map((label, i) => (
        <div key={label} style={{ padding: 20, borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)' }}>{['12,430', '$48.2k', '1,893', '3.6%'][i]}</p>
        </div>
      ))}
    </div>
  </div>
)

export const Default: Story = {
  name: 'AppShell — Default',
  args: {
    navbar: {
      logo: <Logo />,
      links: [
        { label: 'Dashboard', href: '#', active: true },
        { label: 'Projects', href: '#' },
        { label: 'Team', href: '#' },
      ],
    },
    sidebar: { items: sidebarItems },
    children: <PageContent />,
  },
}

export const WithProfile: Story = {
  name: 'AppShell — Navbar with Profile',
  args: {
    navbar: {
      logo: <Logo />,
      links: [
        { label: 'Dashboard', href: '#', active: true },
        { label: 'Projects', href: '#' },
        { label: 'Team', href: '#' },
      ],
      actions: (
        <BadgeAnchor badge={<Badge variant="error" dot />} position="top-right">
          <IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="ghost" />
        </BadgeAnchor>
      ),
      profile: {
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@acme.com',
        menuItems: profileMenuItems,
      },
    },
    sidebar: { items: sidebarItems },
    children: <PageContent title="Dashboard" subtitle="Click the profile avatar in the top-right navbar to open the submenu." />,
  },
}

export const WithProfileAndFooter: Story = {
  name: 'AppShell — Profile + Sidebar Footer',
  args: {
    navbar: {
      logo: <Logo />,
      links: [
        { label: 'Dashboard', href: '#', active: true },
        { label: 'Projects', href: '#' },
      ],
      profile: {
        name: 'James Carter',
        email: 'james@acme.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        menuItems: profileMenuItems,
      },
    },
    sidebar: {
      items: sidebarItems,
      header: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={14} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#fff' }}>Acme Corp</span>
        </div>
      ),
      collapsedIcon: <Shield size={14} style={{ color: 'var(--color-primary)' }} />,
      footer: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar name="James Carter" size="sm" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>James Carter</p>
            <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)' }}>Admin</p>
          </div>
          <IconButton icon={<LogOut size={14} />} aria-label="Sign out" variant="ghost" style={{ color: 'rgba(255,255,255,0.6)' }} />
        </div>
      ),
    },
    children: <PageContent title="Dashboard" subtitle="Sidebar has a logo header (with collapse toggle) and a user footer." />,
  },
}

export const DefaultCollapsed: Story = {
  name: 'AppShell — Sidebar starts collapsed',
  args: {
    navbar: {
      logo: <Logo />,
      links: [
        { label: 'Dashboard', href: '#', active: true },
        { label: 'Projects', href: '#' },
      ],
      profile: {
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@acme.com',
        menuItems: profileMenuItems,
      },
    },
    sidebar: { items: sidebarItems },
    defaultSidebarCollapsed: true,
    children: <PageContent title="Collapsed Sidebar" subtitle="The sidebar starts collapsed. Click the chevron at the top to expand." />,
  },
}
