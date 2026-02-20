import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Edit, Trash2, Eye, Search, Plus, Download, Filter } from 'lucide-react'
import { DataTable } from '../src/components/display/DataTable/DataTable'
import { Badge } from '../src/components/display/Badge/Badge'
import { Avatar } from '../src/components/display/Avatar/Avatar'
import { IconButton } from '../src/components/inputs/IconButton/IconButton'
import { Button } from '../src/components/inputs/Button/Button'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Display/DataTable',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joined: string
  revenue: number
}

const generateUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: ['Sarah Mitchell', 'James Rodriguez', 'Priya Sharma', 'Tom Chen', 'Emma Wilson',
           'Liam Johnson', 'Olivia Brown', 'Noah Davis', 'Ava Martinez', 'Ethan Taylor',
           'Isabella Anderson', 'Mason Thomas', 'Sophia Jackson', 'Logan White', 'Mia Harris'][i % 15],
    email: `user${i + 1}@acme.com`,
    role: ['Admin', 'Editor', 'Viewer', 'Manager', 'Developer'][i % 5],
    status: (['active', 'inactive', 'pending'] as const)[i % 3],
    joined: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    revenue: Math.round(1000 + Math.random() * 50000),
  }))

const allUsers = generateUsers(87)

const statusVariant: Record<User['status'], 'success' | 'ghost' | 'warning'> = {
  active: 'success',
  inactive: 'ghost',
  pending: 'warning',
}

const columns = [
  {
    key: 'name',
    header: 'User',
    sortable: true,
    sortValue: (row: User) => row.name,
    accessor: (row: User) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={row.name} size="sm" />
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>{row.name}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    sortValue: (row: User) => row.role,
    accessor: (row: User) => (
      <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>{row.role}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (row: User) => row.status,
    accessor: (row: User) => (
      <Badge variant={statusVariant[row.status]} size="sm">
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </Badge>
    ),
  },
  {
    key: 'joined',
    header: 'Joined',
    sortable: true,
    sortValue: (row: User) => row.joined,
    accessor: (row: User) => (
      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{row.joined}</span>
    ),
  },
  {
    key: 'revenue',
    header: 'Revenue',
    sortable: true,
    sortValue: (row: User) => row.revenue,
    align: 'right' as const,
    accessor: (row: User) => (
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', fontVariantNumeric: 'tabular-nums' }}>
        ${row.revenue.toLocaleString()}
      </span>
    ),
  },
]

export const ClientPagination: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [search, setSearch] = useState('')

    const filtered = allUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
      <div style={{ padding: 24 }}>
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(row) => row.id}
          selectable
          selectedKeys={selected}
          onSelectionChange={setSelected}
          striped
          bordered
          pagination={{ mode: 'client', pageSize: 10, pageSizeOptions: [5, 10, 25, 50] }}
          toolbar={
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
                  <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users…"
                    style={{ height: 32, paddingLeft: 32, paddingRight: 12, borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '0.875rem', outline: 'none', width: '100%' }}
                  />
                </div>
                {selected.length > 0 && (
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    {selected.length} selected
                  </span>
                )}
              </div>
              <Stack direction="row" gap="xs">
                <Button variant="outline" size="sm" leftIcon={<Download size={13} />}>Export</Button>
                <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>Add user</Button>
              </Stack>
            </>
          }
          rowActions={(row) => (
            <Stack direction="row" gap="xs" justify="end">
              <IconButton icon={<Eye size={13} />} aria-label="View" variant="ghost" size="xs" />
              <IconButton icon={<Edit size={13} />} aria-label="Edit" variant="ghost" size="xs" />
              <IconButton icon={<Trash2 size={13} />} aria-label="Delete" variant="ghost" size="xs" />
            </Stack>
          )}
        />
      </div>
    )
  },
}

export const ServerPagination: Story = {
  render: () => {
    const PAGE_SIZE = 10
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(PAGE_SIZE)
    const [loading, setLoading] = useState(false)

    const simulateFetch = (newPage: number, newSize: number) => {
      setLoading(true)
      setTimeout(() => setLoading(false), 600)
      setPage(newPage)
      setPageSize(newSize)
    }

    const start = (page - 1) * pageSize
    const pageData = allUsers.slice(start, start + pageSize)

    return (
      <div style={{ padding: 24 }}>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Server-mode pagination — page changes simulate an API call (600ms delay). Total: {allUsers.length} rows.
        </p>
        <DataTable
          columns={columns}
          data={pageData}
          keyExtractor={(row) => row.id}
          loading={loading}
          bordered
          hoverable
          pagination={{
            mode: 'server',
            page,
            pageSize,
            totalRows: allUsers.length,
            pageSizeOptions: [5, 10, 25],
            onPageChange: (p) => simulateFetch(p, pageSize),
            onPageSizeChange: (s) => simulateFetch(1, s),
          }}
        />
      </div>
    )
  },
}

export const WithRowActions: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <DataTable
        columns={columns.slice(0, 4)}
        data={allUsers.slice(0, 8)}
        keyExtractor={(row) => row.id}
        bordered
        compact
        rowActions={(row) => (
          <Stack direction="row" gap="xs" justify="end">
            <IconButton icon={<Edit size={13} />} aria-label="Edit" variant="outline" size="xs" />
            <IconButton icon={<Trash2 size={13} />} aria-label="Delete" variant="outline" size="xs" />
          </Stack>
        )}
      />
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={(row: User) => row.id}
        loading
        bordered
        pagination={{ mode: 'client', pageSize: 5 }}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={(row: User) => row.id}
        bordered
        emptyMessage={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Search size={24} style={{ color: 'var(--color-text-muted)' }} />
            <p style={{ fontWeight: 600, color: 'var(--color-text)' }}>No users found</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Try adjusting your search or filters</p>
          </div>
        }
      />
    </div>
  ),
}
