import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDashboard, Users, Settings, Bell, BarChart3, FileText } from 'lucide-react'
import { AppShell } from '../src/components/layout/AppShell/AppShell'

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
]

export const Default: Story = {
  args: {
    navbar: {
      logo: <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-primary)' }}>MyApp</span>,
      links: [
        { label: 'Home', href: '#', active: true, icon: <LayoutDashboard size={16} /> },
        { label: 'Docs', href: '#', icon: <FileText size={16} /> },
        { label: 'Blog', href: '#', icon: <BarChart3 size={16} /> },
      ],
    },
    sidebar: { items: sidebarItems },
    children: (
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Welcome to the AppShell demo. The sidebar is collapsible and the navbar has mobile support.
        </p>
      </div>
    ),
  },
}
