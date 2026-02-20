import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Zap, Shield, Globe, BarChart3, Users, Bell,
  Tag, Star, Heart, Bookmark,
} from 'lucide-react'
import { ChipSelect } from '../src/components/inputs/ChipSelect/ChipSelect'
import { TagInput } from '../src/components/inputs/TagInput/TagInput'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Divider } from '../src/components/layout/Divider/Divider'

const meta: Meta = {
  title: 'Inputs/ChipSelect & TagInput',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const ChipSelectBasic: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['performance'])
    return (
      <Stack gap="xl" style={{ padding: 24 }}>
        <ChipSelect
          label="Feature flags"
          helperText="Toggle features for this environment"
          fullWidth
          options={[
            { value: 'performance', label: 'Performance', icon: <Zap size={12} /> },
            { value: 'security', label: 'Security', icon: <Shield size={12} /> },
            { value: 'analytics', label: 'Analytics', icon: <BarChart3 size={12} /> },
            { value: 'collaboration', label: 'Collaboration', icon: <Users size={12} /> },
            { value: 'notifications', label: 'Notifications', icon: <Bell size={12} /> },
            { value: 'i18n', label: 'Internationalization', icon: <Globe size={12} /> },
          ]}
          value={selected}
          onChange={setSelected}
        />
        {selected.length > 0 && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Active: <strong style={{ color: 'var(--color-text)' }}>{selected.join(', ')}</strong>
          </p>
        )}
      </Stack>
    )
  },
}

export const ChipSelectSingleChoice: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['monthly'])
    return (
      <Stack gap="xl" style={{ padding: 24 }}>
        <ChipSelect
          label="Billing cycle"
          helperText="Select one billing period"
          fullWidth
          multiple={false}
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'annual', label: 'Annual (save 20%)' },
          ]}
          value={selected}
          onChange={setSelected}
          size="lg"
        />
      </Stack>
    )
  },
}

export const ChipSelectWithLimit: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['react', 'typescript'])
    return (
      <Stack gap="xl" style={{ padding: 24 }}>
        <ChipSelect
          label="Interests (pick up to 3)"
          helperText="Choose topics you'd like to follow"
          fullWidth
          maxSelect={3}
          options={[
            { value: 'react', label: 'React', icon: <Star size={12} /> },
            { value: 'typescript', label: 'TypeScript', icon: <Star size={12} /> },
            { value: 'design', label: 'Design Systems', icon: <Heart size={12} /> },
            { value: 'devops', label: 'DevOps', icon: <Bookmark size={12} /> },
            { value: 'ai', label: 'AI / ML', icon: <Zap size={12} /> },
            { value: 'security', label: 'Security', icon: <Shield size={12} /> },
          ]}
          value={selected}
          onChange={setSelected}
        />
      </Stack>
    )
  },
}

export const ChipSelectSizes: Story = {
  render: () => {
    const opts = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ]
    return (
      <Stack gap="xl" style={{ padding: 24 }}>
        <ChipSelect label="Small" size="sm" fullWidth options={opts} value={['a']} onChange={() => {}} />
        <ChipSelect label="Medium (default)" size="md" fullWidth options={opts} value={['b']} onChange={() => {}} />
        <ChipSelect label="Large" size="lg" fullWidth options={opts} value={['c']} onChange={() => {}} />
      </Stack>
    )
  },
}

export const TagInputBasic: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['react', 'typescript', 'tailwind'])
    return (
      <Stack gap="xl" style={{ maxWidth: 480, padding: 24 }}>
        <TagInput
          label="Project tags"
          helperText="Press Enter, Space, or comma to add a tag"
          value={tags}
          onChange={setTags}
          placeholder="Add a tag…"
          fullWidth
        />
        {tags.length > 0 && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Tags ({tags.length}): <strong style={{ color: 'var(--color-text)' }}>{tags.join(', ')}</strong>
          </p>
        )}
      </Stack>
    )
  },
}

export const TagInputWithLimit: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['frontend', 'react'])
    return (
      <Stack gap="xl" style={{ maxWidth: 480, padding: 24 }}>
        <TagInput
          label="Skills (max 5)"
          helperText="Separate with Enter or comma"
          value={tags}
          onChange={setTags}
          maxTags={5}
          separator={['enter', 'comma']}
          placeholder="Type a skill…"
          fullWidth
        />
      </Stack>
    )
  },
}

export const TagInputEmailList: Story = {
  render: () => {
    const [emails, setEmails] = useState<string[]>(['alice@acme.com'])
    return (
      <Stack gap="xl" style={{ maxWidth: 480, padding: 24 }}>
        <TagInput
          label="Invite team members"
          helperText="Enter email addresses separated by Enter or comma"
          value={emails}
          onChange={setEmails}
          separator={['enter', 'comma']}
          placeholder="name@company.com"
          allowDuplicates={false}
          fullWidth
        />
      </Stack>
    )
  },
}

export const TagInputWithError: Story = {
  render: () => (
    <Stack gap="xl" style={{ maxWidth: 480, padding: 24 }}>
      <TagInput
        label="Required tags"
        error="At least one tag is required"
        value={[]}
        onChange={() => {}}
        placeholder="Add a tag…"
        required
        fullWidth
      />
    </Stack>
  ),
}
