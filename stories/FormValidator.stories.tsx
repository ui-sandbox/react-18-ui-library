import React, { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { JSONForm } from '../src/components/forms/JSONForm/JSONForm'
import { v } from '../src/components/forms/JSONForm/FormValidator'
import type { JSONFormField } from '../src/components/forms/JSONForm/JSONForm'

const meta: Meta = {
  title: 'Forms/FormValidator',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const StringValidation: Story = {
  name: 'v.string() — lengthBetween, noSpaces, alphanumeric, shouldBeIn, startsWith',
  render: () => {
    const schema: JSONFormField[] = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'e.g. john_doe',
        helperText: '3–20 chars, no spaces',
        validator: v.string().required().lengthBetween(3, 20).noSpaces(),
      },
      {
        name: 'code',
        type: 'text',
        label: 'Invite Code',
        placeholder: 'e.g. INVITE-ABC123',
        helperText: 'Must start with INVITE-',
        validator: v.string().required().startsWith('INVITE-'),
      },
      {
        name: 'slug',
        type: 'text',
        label: 'URL Slug',
        placeholder: 'e.g. my-page',
        helperText: 'Letters and numbers only',
        validator: v.string().required().alphanumeric(),
      },
      {
        name: 'role',
        type: 'text',
        label: 'Role',
        placeholder: 'admin / editor / viewer',
        helperText: 'Must be one of: admin, editor, viewer',
        validator: v.string().required().shouldBeIn(['admin', 'editor', 'viewer']),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const NumberValidation: Story = {
  name: 'v.number() — between, integer, multipleOf, nonZero, length',
  render: () => {
    const schema: JSONFormField[] = [
      {
        name: 'age',
        type: 'number',
        label: 'Age',
        placeholder: '18–120',
        validator: v.number().required().between(18, 120).integer(),
      },
      {
        name: 'quantity',
        type: 'number',
        label: 'Quantity (multiple of 5)',
        placeholder: 'e.g. 5, 10, 15…',
        validator: v.number().required().positive().nonZero().multipleOf(5),
      },
      {
        name: 'pincode',
        type: 'text',
        label: 'PIN Code',
        placeholder: '6-digit PIN',
        helperText: 'Must be exactly 6 digits',
        validator: v.number().required().length(6),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const PasswordValidation: Story = {
  name: 'v.password() — strong, confirmMatch, hasUppercase, hasDigit, hasSpecialChar',
  render: () => {
    const passwordRef = useRef<string>('')
    const schema: JSONFormField[] = [
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Min 8 chars, uppercase, digit, special',
        helperText: 'Must have uppercase, lowercase, digit and special character',
        validator: v.password().required().strong(),
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Re-enter password',
        validator: v.password().required().confirmMatch(() => passwordRef.current, 'Passwords do not match'),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm
          schema={schema}
          onSubmit={(data) => {
            passwordRef.current = data.password as string
            alert(JSON.stringify(data, null, 2))
          }}
          submitLabel="Set Password"
        />
      </div>
    )
  },
}

export const EmailValidation: Story = {
  name: 'v.email() — required, domain whitelist, blockedDomains',
  render: () => {
    const schema: JSONFormField[] = [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'you@example.com',
        validator: v.email().required(),
      },
      {
        name: 'workEmail',
        type: 'email',
        label: 'Work Email (whitelist)',
        placeholder: 'you@company.com',
        helperText: 'Only @company.com or @company.org allowed',
        validator: v.email().required().domain(['company.com', 'company.org']),
      },
      {
        name: 'publicEmail',
        type: 'email',
        label: 'Email (no disposable)',
        placeholder: 'you@example.com',
        helperText: 'mailinator.com and yopmail.com are blocked',
        validator: v.email().required().blockedDomains(['mailinator.com', 'yopmail.com']),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const TelAndUrlValidation: Story = {
  name: 'v.tel() & v.url() — length range, httpsOnly, allowedDomains, noTrailingSlash',
  render: () => {
    const schema: JSONFormField[] = [
      {
        name: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: '+1 (555) 000-0000',
        helperText: '7–15 digits',
        validator: v.tel().required().minLength(7).maxLength(15),
      },
      {
        name: 'mobile',
        type: 'tel',
        label: 'Mobile (exact 10 digits)',
        placeholder: '9876543210',
        validator: v.tel().required().length(10),
      },
      {
        name: 'website',
        type: 'url',
        label: 'Website (HTTPS only)',
        placeholder: 'https://example.com',
        validator: v.url().required().httpsOnly().noTrailingSlash(),
      },
      {
        name: 'githubUrl',
        type: 'url',
        label: 'GitHub Profile URL',
        placeholder: 'https://github.com/username',
        helperText: 'Must be a github.com URL',
        validator: v.url().required().allowedDomains(['github.com']),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const DateValidation: Story = {
  name: 'v.date() — notInPast, notInFuture, minDate, maxDate',
  render: () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    const schema: JSONFormField[] = [
      {
        name: 'appointmentDate',
        type: 'text',
        label: 'Appointment Date',
        placeholder: 'YYYY-MM-DD',
        helperText: 'Cannot be in the past',
        validator: v.date().required().notInPast(),
      },
      {
        name: 'birthDate',
        type: 'text',
        label: 'Date of Birth',
        placeholder: 'YYYY-MM-DD',
        helperText: 'Cannot be in the future',
        validator: v.date().required().notInFuture(),
      },
      {
        name: 'eventDate',
        type: 'text',
        label: 'Event Date',
        placeholder: 'YYYY-MM-DD',
        helperText: `Between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`,
        validator: v.date().required().between(minDate, maxDate),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const SelectValidation: Story = {
  name: 'v.select() — required, shouldBeIn',
  render: () => {
    const schema: JSONFormField[] = [
      {
        name: 'country',
        type: 'select',
        label: 'Country',
        placeholder: 'Select a country',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'gb', label: 'United Kingdom' },
          { value: 'in', label: 'India' },
          { value: 'au', label: 'Australia' },
        ],
        validator: v.select().required().shouldBeIn(['us', 'gb', 'in', 'au']),
      },
      {
        name: 'plan',
        type: 'radio',
        label: 'Subscription Plan',
        options: [
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ],
        validator: v.select().required().notEmpty(),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const BooleanAndArrayValidation: Story = {
  name: 'v.boolean() & v.array() — mustBeTrue, minItems, exactItems, noEmpty',
  render: () => {
    const schema: JSONFormField[] = [
      {
        name: 'terms',
        type: 'checkbox',
        label: 'I agree to the Terms and Conditions',
        validator: v.boolean().mustBeTrue('You must accept the terms to continue'),
      },
      {
        name: 'newsletter',
        type: 'switch',
        label: 'Subscribe to newsletter',
        validator: v.boolean().mustBeTrue('Please subscribe to continue'),
      },
      {
        name: 'interests',
        type: 'chipselect',
        label: 'Interests (2–4)',
        helperText: 'Select between 2 and 4 interests',
        options: [
          { value: 'tech', label: 'Technology' },
          { value: 'design', label: 'Design' },
          { value: 'business', label: 'Business' },
          { value: 'science', label: 'Science' },
          { value: 'arts', label: 'Arts' },
        ],
        validator: v.array().required().minItems(2).maxItems(4),
      },
      {
        name: 'skills',
        type: 'taginput',
        label: 'Skills (exactly 3)',
        placeholder: 'Add a skill and press Enter',
        helperText: 'Add exactly 3 skills',
        validator: v.array().required().exactItems(3).noEmpty(),
      },
    ]
    return (
      <div style={{ maxWidth: 480, padding: '1rem' }}>
        <JSONForm schema={schema} onSubmit={(data) => alert(JSON.stringify(data, null, 2))} submitLabel="Validate & Submit" />
      </div>
    )
  },
}

export const FullRegistrationForm: Story = {
  name: 'Full Form — all validators combined',
  render: () => {
    const passwordRef = useRef<string>('')
    const schema: JSONFormField[] = [
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'John',
        colSpan: 1,
        validator: v.string().required().lengthBetween(2, 50),
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Doe',
        colSpan: 1,
        validator: v.string().required().lengthBetween(2, 50),
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'john@example.com',
        colSpan: 2,
        validator: v.email().required().blockedDomains(['mailinator.com', 'yopmail.com']),
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Min 8 chars, uppercase, digit, special',
        colSpan: 1,
        validator: v.password().required().strong(),
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Re-enter password',
        colSpan: 1,
        validator: v.password().required().confirmMatch(() => passwordRef.current),
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        placeholder: '10-digit number',
        colSpan: 1,
        validator: v.tel().required().length(10),
      },
      {
        name: 'age',
        type: 'number',
        label: 'Age',
        placeholder: '18+',
        colSpan: 1,
        validator: v.number().required().between(18, 120).integer(),
      },
      {
        name: 'website',
        type: 'url',
        label: 'Website (optional)',
        placeholder: 'https://',
        colSpan: 2,
        validator: v.url().httpsOnly().noTrailingSlash(),
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        placeholder: 'Select a role',
        colSpan: 1,
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer' },
        ],
        validator: v.select().required(),
      },
      {
        name: 'interests',
        type: 'chipselect',
        label: 'Interests (pick 1–3)',
        colSpan: 1,
        options: [
          { value: 'tech', label: 'Technology' },
          { value: 'design', label: 'Design' },
          { value: 'business', label: 'Business' },
          { value: 'science', label: 'Science' },
        ],
        validator: v.array().required().minItems(1).maxItems(3),
      },
      {
        name: 'bio',
        type: 'textarea',
        label: 'Bio',
        placeholder: 'Tell us about yourself…',
        colSpan: 2,
        validator: v.string().maxLength(300),
        rows: 3,
        showCharCount: true,
      },
      {
        name: 'terms',
        type: 'checkbox',
        label: 'I agree to the Terms and Conditions',
        colSpan: 2,
        validator: v.boolean().mustBeTrue('You must accept the terms'),
      },
    ]
    return (
      <div style={{ maxWidth: 640, padding: '1rem' }}>
        <JSONForm
          schema={schema}
          columns={2}
          onSubmit={(data) => {
            passwordRef.current = data.password as string
            alert(JSON.stringify(data, null, 2))
          }}
          onCancel={() => alert('Cancelled')}
          submitLabel="Create Account"
          cancelLabel="Cancel"
        />
      </div>
    )
  },
}
