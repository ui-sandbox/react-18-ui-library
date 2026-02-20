import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '../src/components/display/Table/Table'
import { Badge } from '../src/components/display/Badge/Badge'
import { Avatar } from '../src/components/display/Avatar/Avatar'
import { Button } from '../src/components/inputs/Button/Button'
import { Pagination } from '../src/components/navigation/Pagination/Pagination'

const meta: Meta<typeof Table> = {
  title: 'Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Table>

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joined: string
  revenue: number
}

const users: User[] = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@acme.com', role: 'Admin', status: 'active', joined: 'Jan 12, 2024', revenue: 48200 },
  { id: '2', name: 'James Rodriguez', email: 'james@acme.com', role: 'Editor', status: 'active', joined: 'Feb 3, 2024', revenue: 31500 },
  { id: '3', name: 'Emily Chen', email: 'emily@acme.com', role: 'Viewer', status: 'pending', joined: 'Mar 18, 2024', revenue: 0 },
  { id: '4', name: 'Marcus Johnson', email: 'marcus@acme.com', role: 'Editor', status: 'inactive', joined: 'Nov 5, 2023', revenue: 22100 },
  { id: '5', name: 'Priya Patel', email: 'priya@acme.com', role: 'Admin', status: 'active', joined: 'Dec 1, 2023', revenue: 67800 },
]

const statusBadge = (status: User['status']) => {
  const map = {
    active: 'success',
    inactive: 'ghost',
    pending: 'warning',
  } as const
  return <Badge variant={map[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}

export const Default: Story = {
  render: () => (
    <Table<User>
      columns={[
        {
          key: 'name',
          header: 'User',
          sortable: true,
          accessor: (row) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={row.name} size="sm" />
              <div>
                <p style={{ fontWeight: 500, color: 'var(--color-text)', fontSize: '0.875rem' }}>{row.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{row.email}</p>
              </div>
            </div>
          ),
        },
        { key: 'role', header: 'Role', sortable: true },
        {
          key: 'status',
          header: 'Status',
          accessor: (row) => statusBadge(row.status),
        },
        {
          key: 'revenue',
          header: 'Revenue',
          sortable: true,
          align: 'right',
          accessor: (row) => (
            <span style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
              ${row.revenue.toLocaleString()}
            </span>
          ),
        },
        { key: 'joined', header: 'Joined', sortable: true },
        {
          key: 'actions',
          header: '',
          align: 'right',
          accessor: () => (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <Button size="xs" variant="ghost">Edit</Button>
              <Button size="xs" variant="ghost" style={{ color: 'var(--color-error)' }}>Remove</Button>
            </div>
          ),
        },
      ]}
      data={users}
      keyExtractor={(row) => row.id}
      striped
      hoverable
    />
  ),
}

export const WithSelectionAndPagination: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(1)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {selected.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 12px', borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary-subtle)', border: '1px solid var(--color-border-focus)',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 500 }}>
              {selected.length} selected
            </span>
            <Button size="xs" variant="danger">Delete selected</Button>
            <Button size="xs" variant="outline" onClick={() => setSelected([])}>Clear</Button>
          </div>
        )}
        <Table<User>
          columns={[
            { key: 'name', header: 'Name', sortable: true,
              accessor: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={row.name} size="sm" />
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{row.name}</span>
                </div>
              ),
            },
            { key: 'role', header: 'Role' },
            { key: 'status', header: 'Status', accessor: (row) => statusBadge(row.status) },
            { key: 'joined', header: 'Joined' },
          ]}
          data={users}
          keyExtractor={(row) => row.id}
          selectable
          selectedKeys={selected}
          onSelectionChange={setSelected}
          hoverable
          bordered
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination page={page} total={50} pageSize={5} onPageChange={setPage} />
        </div>
      </div>
    )
  },
}

export const LoadingState: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'User' },
        { key: 'role', header: 'Role' },
        { key: 'status', header: 'Status' },
        { key: 'joined', header: 'Joined' },
      ]}
      data={[]}
      keyExtractor={(_, i) => String(i)}
      loading
    />
  ),
}

export const EmptyState: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'User' },
        { key: 'role', header: 'Role' },
        { key: 'status', header: 'Status' },
      ]}
      data={[]}
      keyExtractor={(_, i) => String(i)}
      emptyMessage={
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{ fontWeight: 500, color: 'var(--color-text)' }}>No users found</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Try adjusting your search or filters
          </p>
        </div>
      }
    />
  ),
}
