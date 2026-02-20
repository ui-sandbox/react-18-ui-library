import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TreeView } from '../src/components/display/TreeView/TreeView'
import type { TreeViewItem } from '../src/components/display/TreeView/TreeView'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'
import { Card } from '../src/components/display/Card/Card'
import { Tag } from '../src/components/display/Tag/Tag'
import {
  Folder, FolderOpen, File, FileText, Home, BarChart3,
  Users, Settings, Package, Shield, Bell, HelpCircle,
} from 'lucide-react'

const meta: Meta<typeof TreeView> = {
  title: 'Display/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof TreeView>

const fileTree: TreeViewItem[] = [
  {
    id: 'src', label: 'src', icon: <FolderOpen size={14} />, children: [
      {
        id: 'components', label: 'components', icon: <FolderOpen size={14} />, children: [
          { id: 'button', label: 'Button.tsx', icon: <File size={14} /> },
          { id: 'input', label: 'TextField.tsx', icon: <File size={14} /> },
          { id: 'modal', label: 'Modal.tsx', icon: <File size={14} /> },
          { id: 'table', label: 'Table.tsx', icon: <File size={14} /> },
        ],
      },
      {
        id: 'hooks', label: 'hooks', icon: <Folder size={14} />, children: [
          { id: 'use-theme', label: 'useTheme.ts', icon: <File size={14} /> },
          { id: 'use-toast', label: 'useToast.ts', icon: <File size={14} /> },
          { id: 'use-local-storage', label: 'useLocalStorage.ts', icon: <File size={14} /> },
        ],
      },
      {
        id: 'utils', label: 'utils', icon: <Folder size={14} />, children: [
          { id: 'cn', label: 'cn.ts', icon: <File size={14} /> },
        ],
      },
      { id: 'index-ts', label: 'index.ts', icon: <FileText size={14} /> },
    ],
  },
  {
    id: 'stories', label: 'stories', icon: <Folder size={14} />, children: [
      { id: 'button-story', label: 'Button.stories.tsx', icon: <File size={14} /> },
      { id: 'form-story', label: 'Form.stories.tsx', icon: <File size={14} /> },
    ],
  },
  { id: 'package-json', label: 'package.json', icon: <FileText size={14} /> },
  { id: 'tsconfig', label: 'tsconfig.json', icon: <FileText size={14} /> },
  { id: 'readme', label: 'README.md', icon: <FileText size={14} /> },
]

export const FileExplorer: Story = {
  render: () => {
    const [selected, setSelected] = useState('index-ts')
    return (
      <Card style={{ width: 280, padding: '1rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Explorer
        </div>
        <TreeView
          items={fileTree}
          selectedId={selected}
          onSelect={(id) => setSelected(id)}
          defaultExpandedIds={['src', 'components']}
        />
      </Card>
    )
  },
}

export const NavigationTree: Story = {
  render: () => {
    const [selected, setSelected] = useState('dashboard')
    const navItems: TreeViewItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={14} /> },
      {
        id: 'analytics', label: 'Analytics', icon: <BarChart3 size={14} />, children: [
          { id: 'overview', label: 'Overview' },
          { id: 'reports', label: 'Reports' },
          { id: 'exports', label: 'Exports', disabled: true },
        ],
      },
      {
        id: 'users', label: 'Users', icon: <Users size={14} />,
        badge: <Tag size="sm" variant="primary">12</Tag>,
        children: [
          { id: 'all-users', label: 'All Users' },
          { id: 'roles', label: 'Roles & Permissions' },
          { id: 'invitations', label: 'Invitations' },
        ],
      },
      { id: 'products', label: 'Products', icon: <Package size={14} /> },
      {
        id: 'settings', label: 'Settings', icon: <Settings size={14} />, children: [
          { id: 'general', label: 'General' },
          { id: 'security', label: 'Security', icon: <Shield size={14} /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell size={14} /> },
        ],
      },
      { id: 'help', label: 'Help & Support', icon: <HelpCircle size={14} /> },
    ]
    return (
      <Card style={{ width: 260, padding: '1rem' }}>
        <TreeView
          items={navItems}
          selectedId={selected}
          onSelect={(id) => setSelected(id)}
          defaultExpandedIds={['analytics', 'users']}
        />
      </Card>
    )
  },
}

export const MultiSelectTree: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['button', 'input'])
    return (
      <div style={{ padding: '1rem' }}>
        <Stack gap="md">
          <Card style={{ width: 280, padding: '1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
              Multi-select Tree
            </div>
            <TreeView
              items={fileTree}
              multiSelect
              selectedIds={selectedIds}
              onMultiSelect={setSelectedIds}
              defaultExpandedIds={['src', 'components']}
            />
          </Card>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Selected: {selectedIds.join(', ') || 'none'}
          </p>
        </Stack>
      </div>
    )
  },
}
