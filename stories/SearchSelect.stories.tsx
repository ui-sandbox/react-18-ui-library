import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Building2, Globe, User, Code2, Palette, Database } from 'lucide-react'
import { SearchSelect } from '../src/components/inputs/SearchSelect/SearchSelect'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta = {
  title: 'Inputs/SearchSelect',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const countryOptions = [
  { value: 'us', label: 'United States', icon: <Globe size={14} /> },
  { value: 'uk', label: 'United Kingdom', icon: <Globe size={14} /> },
  { value: 'de', label: 'Germany', icon: <Globe size={14} /> },
  { value: 'fr', label: 'France', icon: <Globe size={14} /> },
  { value: 'jp', label: 'Japan', icon: <Globe size={14} /> },
  { value: 'au', label: 'Australia', icon: <Globe size={14} /> },
  { value: 'ca', label: 'Canada', icon: <Globe size={14} /> },
  { value: 'sg', label: 'Singapore', icon: <Globe size={14} /> },
  { value: 'in', label: 'India', icon: <Globe size={14} /> },
  { value: 'br', label: 'Brazil', icon: <Globe size={14} /> },
]

const skillGroups = [
  {
    label: 'Frontend',
    options: [
      { value: 'react', label: 'React', icon: <Code2 size={14} /> },
      { value: 'vue', label: 'Vue.js', icon: <Code2 size={14} /> },
      { value: 'angular', label: 'Angular', icon: <Code2 size={14} /> },
      { value: 'svelte', label: 'Svelte', icon: <Code2 size={14} /> },
    ],
  },
  {
    label: 'Backend',
    options: [
      { value: 'node', label: 'Node.js', icon: <Database size={14} /> },
      { value: 'python', label: 'Python', icon: <Database size={14} /> },
      { value: 'go', label: 'Go', icon: <Database size={14} /> },
      { value: 'rust', label: 'Rust', icon: <Database size={14} /> },
    ],
  },
  {
    label: 'Design',
    options: [
      { value: 'figma', label: 'Figma', icon: <Palette size={14} /> },
      { value: 'sketch', label: 'Sketch', icon: <Palette size={14} /> },
    ],
  },
]

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Stack gap="lg" style={{ maxWidth: 360, padding: 24 }}>
        <div style={{ position: 'relative' }}>
          <SearchSelect
            label="Country"
            options={countryOptions}
            value={value}
            onChange={setValue}
            placeholder="Select a country…"
            helperText="Start typing to filter countries"
            fullWidth
          />
        </div>
        {value && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Selected: <strong style={{ color: 'var(--color-text)' }}>{value}</strong>
          </p>
        )}
      </Stack>
    )
  },
}

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['react', 'node'])
    return (
      <Stack gap="lg" style={{ maxWidth: 420, padding: 24 }}>
        <div style={{ position: 'relative' }}>
          <SearchSelect
            label="Tech Stack"
            multiple
            groups={skillGroups}
            value={values}
            onChange={setValues}
            placeholder="Select skills…"
            helperText="Choose all that apply"
            fullWidth
          />
        </div>
        {values.length > 0 && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Selected ({values.length}): <strong style={{ color: 'var(--color-text)' }}>{values.join(', ')}</strong>
          </p>
        )}
      </Stack>
    )
  },
}

export const MultiSelectWithLimit: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['react'])
    return (
      <Stack gap="lg" style={{ maxWidth: 420, padding: 24 }}>
        <div style={{ position: 'relative' }}>
          <SearchSelect
            label="Assign reviewers (max 3)"
            multiple
            maxSelected={3}
            options={[
              { value: 'alice', label: 'Alice Chen', icon: <User size={14} /> },
              { value: 'bob', label: 'Bob Martinez', icon: <User size={14} /> },
              { value: 'carol', label: 'Carol Singh', icon: <User size={14} /> },
              { value: 'dave', label: 'Dave Kim', icon: <User size={14} /> },
              { value: 'eve', label: 'Eve Johnson', icon: <User size={14} /> },
            ]}
            value={values}
            onChange={setValues}
            placeholder="Select reviewers…"
            helperText="Maximum 3 reviewers per PR"
            fullWidth
          />
        </div>
      </Stack>
    )
  },
}

export const WithError: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 360, padding: 24 }}>
      <div style={{ position: 'relative' }}>
        <SearchSelect
          label="Department"
          options={[
            { value: 'eng', label: 'Engineering' },
            { value: 'design', label: 'Design' },
            { value: 'product', label: 'Product' },
          ]}
          error="Please select a department to continue"
          required
          fullWidth
        />
      </div>
      <div style={{ position: 'relative' }}>
        <SearchSelect
          label="Team lead"
          options={[
            { value: 'alice', label: 'Alice Chen' },
            { value: 'bob', label: 'Bob Martinez' },
          ]}
          disabled
          value="alice"
          helperText="Contact HR to change team lead"
          fullWidth
        />
      </div>
    </Stack>
  ),
}

export const GroupedOptions: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Stack gap="lg" style={{ maxWidth: 360, padding: 24 }}>
        <div style={{ position: 'relative' }}>
          <SearchSelect
            label="Primary skill"
            groups={skillGroups}
            value={value}
            onChange={setValue}
            placeholder="Choose your primary skill…"
            helperText="Grouped by category"
            fullWidth
          />
        </div>
      </Stack>
    )
  },
}
