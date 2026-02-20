import type { Meta, StoryObj } from '@storybook/react'
import { Mail, Lock, User, Phone } from 'lucide-react'
import { JSONForm } from '../src/components/forms/JSONForm/JSONForm'
import type { JSONFormField } from '../src/components/forms/JSONForm/JSONForm'

const meta: Meta<typeof JSONForm> = {
  title: 'Forms/JSONForm',
  component: JSONForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof JSONForm>

const registrationSchema: JSONFormField[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'John',
    required: true,
    prefixIcon: <User size={14} />,
    colSpan: 1,
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
    required: true,
    colSpan: 1,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'john@example.com',
    required: true,
    prefixIcon: <Mail size={14} />,
    colSpan: 2,
    validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 000-0000',
    prefixImage: 'https://flagcdn.com/w20/us.png',
    prefixText: '+1',
    colSpan: 1,
  },
  {
    name: 'role',
    type: 'select',
    label: 'Role',
    placeholder: 'Select a role',
    required: true,
    colSpan: 1,
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    colSpan: 2,
    rows: 3,
    showCharCount: true,
    validation: { maxLength: 200 },
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Min 8 characters',
    required: true,
    prefixIcon: <Lock size={14} />,
    colSpan: 1,
    validation: { minLength: 8 },
  },
  {
    name: 'newsletter',
    type: 'checkbox',
    label: 'Subscribe to newsletter',
    colSpan: 2,
  },
]

export const RegistrationForm: Story = {
  args: {
    schema: registrationSchema,
    columns: 2,
    submitLabel: 'Create Account',
    cancelLabel: 'Cancel',
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
    onCancel: () => alert('Cancelled'),
  },
}

export const SimpleLogin: Story = {
  args: {
    schema: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'you@example.com',
        required: true,
        prefixIcon: <Mail size={14} />,
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Your password',
        required: true,
        prefixIcon: <Lock size={14} />,
      },
    ],
    columns: 1,
    submitLabel: 'Sign In',
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
  },
}
