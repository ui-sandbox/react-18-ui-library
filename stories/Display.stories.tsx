import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Star, Bell, Settings, User, ChevronRight, Mail, Phone,
  FileText, Folder, Image as ImageIcon, Music, Video,
  Search, Filter, Plus, Trash2, Edit,
} from 'lucide-react'
import { Icon } from '../src/components/display/Icon/Icon'
import { List, ListItem } from '../src/components/display/List/List'
import { EmptyState } from '../src/components/display/EmptyState/EmptyState'
import { Image } from '../src/components/display/Image/Image'
import { SVG } from '../src/components/display/SVG/SVG'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Button } from '../src/components/inputs/Button/Button'
import { Badge } from '../src/components/display/Badge/Badge'
import { Avatar } from '../src/components/display/Avatar/Avatar'

const meta: Meta = {
  title: 'Display/Icon, List, EmptyState, Image & SVG',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Icons: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sizes</p>
        <Stack direction="row" gap="md" align="center">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Icon icon={Star} size={size} />
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{size}</span>
            </div>
          ))}
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Common UI icons</p>
        <Stack direction="row" gap="md" align="center" style={{ flexWrap: 'wrap' }}>
          {[
            { icon: Bell, label: 'Bell' },
            { icon: Settings, label: 'Settings' },
            { icon: User, label: 'User' },
            { icon: Mail, label: 'Mail' },
            { icon: Phone, label: 'Phone' },
            { icon: Search, label: 'Search' },
            { icon: Filter, label: 'Filter' },
            { icon: Plus, label: 'Plus' },
            { icon: Trash2, label: 'Trash' },
            { icon: Edit, label: 'Edit' },
            { icon: FileText, label: 'File' },
            { icon: Folder, label: 'Folder' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 48 }}>
              <div style={{ padding: 10, borderRadius: 8, background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <Icon icon={icon} size="md" />
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{label}</span>
            </div>
          ))}
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Custom colors</p>
        <Stack direction="row" gap="md" align="center">
          <Icon icon={Star} size="lg" color="var(--color-primary)" />
          <Icon icon={Bell} size="lg" color="var(--color-success)" />
          <Icon icon={Settings} size="lg" color="var(--color-warning)" />
          <Icon icon={Trash2} size="lg" color="var(--color-error)" />
          <Icon icon={Mail} size="lg" color="var(--color-info)" />
        </Stack>
      </div>
    </Stack>
  ),
}

export const Lists: Story = {
  render: () => (
    <Stack gap="xl" style={{ maxWidth: 480 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Simple list</p>
        <List
          divided
          items={[
            { primary: 'Dashboard', leading: <Icon icon={Star} size="sm" />, trailing: <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />, onClick: () => {} },
            { primary: 'Notifications', leading: <Icon icon={Bell} size="sm" />, trailing: <Badge variant="error" size="sm">3</Badge>, onClick: () => {} },
            { primary: 'Settings', leading: <Icon icon={Settings} size="sm" />, trailing: <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />, onClick: () => {} },
          ]}
        />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>With secondary text & avatars</p>
        <List divided>
          {[
            { name: 'Sarah Mitchell', role: 'Engineering Lead', status: 'online' as const },
            { name: 'James Rodriguez', role: 'Product Designer', status: 'away' as const },
            { name: 'Priya Sharma', role: 'Data Analyst', status: 'offline' as const },
            { name: 'Tom Chen', role: 'Backend Engineer', status: 'busy' as const },
          ].map((person) => (
            <ListItem
              key={person.name}
              primary={person.name}
              secondary={person.role}
              leading={<Avatar name={person.name} size="sm" status={person.status} />}
              trailing={<ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />}
              onClick={() => {}}
            />
          ))}
        </List>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>File list (compact)</p>
        <List divided compact>
          {[
            { icon: FileText, name: 'Q4-Report-2024.pdf', meta: '2.4 MB' },
            { icon: ImageIcon, name: 'brand-assets.zip', meta: '18.7 MB' },
            { icon: Music, name: 'product-demo.mp3', meta: '4.1 MB' },
            { icon: Video, name: 'onboarding-video.mp4', meta: '124 MB' },
          ].map(({ icon, name, meta }) => (
            <ListItem
              key={name}
              primary={name}
              secondary={meta}
              leading={<Icon icon={icon} size="sm" color="var(--color-text-muted)" />}
              trailing={
                <Stack direction="row" gap="xs">
                  <Icon icon={Edit} size="xs" color="var(--color-text-muted)" />
                  <Icon icon={Trash2} size="xs" color="var(--color-text-muted)" />
                </Stack>
              }
            />
          ))}
        </List>
      </div>
    </Stack>
  ),
}

export const EmptyStates: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default (inbox icon)</p>
        <EmptyState
          title="No notifications yet"
          description="When you receive notifications, they'll appear here."
        />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>With custom icon & action</p>
        <EmptyState
          icon={<Search size={28} />}
          title="No results found"
          description="Try adjusting your search or filter criteria to find what you're looking for."
          action={
            <Stack direction="row" gap="sm">
              <Button variant="outline" size="sm">Clear filters</Button>
              <Button variant="primary" size="sm">New search</Button>
            </Stack>
          }
        />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>With action CTA</p>
        <EmptyState
          icon={<FileText size={28} />}
          title="No documents yet"
          description="Create your first document to get started with your workspace."
          action={
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
              Create document
            </Button>
          }
        />
      </div>
    </Stack>
  ),
}

export const Images: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aspect ratios</p>
        <Stack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
          {(['1/1', '4/3', '16/9', '3/2'] as const).map((ratio) => (
            <div key={ratio} style={{ width: 160 }}>
              <Image
                src={`https://picsum.photos/seed/${ratio.replace('/', '')}/400/300`}
                alt={`${ratio} ratio`}
                ratio={ratio}
                rounded="md"
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 6 }}>{ratio}</p>
            </div>
          ))}
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rounded variants</p>
        <Stack direction="row" gap="md" align="center">
          {(['none', 'md', 'lg', 'xl', 'full'] as const).map((rounded) => (
            <div key={rounded} style={{ width: 80 }}>
              <Image
                src="https://picsum.photos/seed/avatar/200/200"
                alt="Avatar"
                ratio="1/1"
                rounded={rounded}
              />
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 6 }}>{rounded}</p>
            </div>
          ))}
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fallback on error</p>
        <Stack direction="row" gap="md">
          <div style={{ width: 160 }}>
            <Image
              src="https://invalid-url.example.com/image.jpg"
              alt="Broken image"
              ratio="16/9"
              rounded="md"
              fallbackIcon={<ImageIcon size={24} />}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 6 }}>Broken URL → fallback</p>
          </div>
        </Stack>
      </div>
    </Stack>
  ),
}

export const SVGComponent: StoryObj = {
  name: 'SVG',
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inline SVG paths</p>
        <Stack direction="row" gap="md" align="center">
          <SVG size={32} color="var(--color-primary)" title="Star">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />
          </SVG>
          <SVG size={32} color="var(--color-success)" title="Check">
            <polyline points="20 6 9 17 4 12" />
          </SVG>
          <SVG size={32} color="var(--color-error)" title="X">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </SVG>
          <SVG size={32} color="var(--color-warning)" title="Alert">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </SVG>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sizes</p>
        <Stack direction="row" gap="md" align="center">
          {[16, 24, 32, 48, 64].map((s) => (
            <SVG key={s} size={s} color="var(--color-primary)" title={`${s}px`}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </SVG>
          ))}
        </Stack>
      </div>
    </Stack>
  ),
}
