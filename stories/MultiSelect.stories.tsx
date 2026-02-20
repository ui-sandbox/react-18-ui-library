import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MultiSelect } from '../src/components/inputs/MultiSelect/MultiSelect'
import { Stack } from '../src/components/layout/Stack/Stack'

const meta: Meta<typeof MultiSelect> = {
  title: 'Inputs/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof MultiSelect>

const techOptions = [
  { value: 'react', label: 'React', description: 'UI library by Meta' },
  { value: 'vue', label: 'Vue', description: 'Progressive framework' },
  { value: 'angular', label: 'Angular', description: 'Full framework by Google' },
  { value: 'svelte', label: 'Svelte', description: 'Compiler-based framework' },
  { value: 'solid', label: 'SolidJS', description: 'Fine-grained reactivity' },
  { value: 'nextjs', label: 'Next.js', description: 'React meta-framework' },
  { value: 'remix', label: 'Remix', description: 'Full-stack React framework' },
]

export const Default: Story = {
  args: {
    label: 'Technologies',
    options: techOptions,
    placeholder: 'Select technologies…',
    helperText: 'Select all that apply',
  },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>(['react', 'nextjs'])
    return (
      <div style={{ padding: '1rem', maxWidth: 420 }}>
        <Stack gap="md">
          <MultiSelect
            label="Technologies"
            options={techOptions}
            value={val}
            onChange={setVal}
            helperText={`${val.length} selected: ${val.join(', ') || 'none'}`}
          />
        </Stack>
      </div>
    )
  },
}

export const WithGroups: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 420 }}>
      <MultiSelect
        label="Departments"
        maxSelected={3}
        groups={[
          {
            label: 'Engineering',
            options: [
              { value: 'frontend', label: 'Frontend' },
              { value: 'backend', label: 'Backend' },
              { value: 'devops', label: 'DevOps' },
              { value: 'mobile', label: 'Mobile' },
            ],
          },
          {
            label: 'Business',
            options: [
              { value: 'sales', label: 'Sales' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'hr', label: 'Human Resources' },
              { value: 'finance', label: 'Finance' },
            ],
          },
        ]}
        helperText="Select up to 3 departments"
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ padding: '1rem', maxWidth: 420 }}>
      <Stack gap="md">
        <MultiSelect label="Default" options={techOptions} defaultValue={['react']} />
        <MultiSelect label="Disabled" options={techOptions} defaultValue={['react', 'vue']} disabled />
        <MultiSelect label="With Error" options={techOptions} error="Please select at least 2 options." />
        <MultiSelect label="Not Searchable" options={techOptions} searchable={false} />
        <MultiSelect label="Not Clearable" options={techOptions} defaultValue={['react']} clearable={false} />
      </Stack>
    </div>
  ),
}
