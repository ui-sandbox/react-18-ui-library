# react-18-ui-library

> A fully customizable, theme-aware React 18 enterprise UI component library — 70+ components, schema-driven forms, fluent validation, drag-and-drop file upload, and zero runtime CSS-in-JS overhead.

[![npm version](https://img.shields.io/npm/v/react-18-ui-library.svg)](https://www.npmjs.com/package/react-18-ui-library)
[![Storybook](https://img.shields.io/badge/Storybook-View_Components-ff4785.svg)](https://6998a00a26549f1450ed8008-alszlltjoh.chromatic.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Snyk](https://img.shields.io/badge/security-snyk-blueviolet.svg)](https://snyk.io/)

---

<p align="center">
  <strong>📚 <a href="https://6998a00a26549f1450ed8008-alszlltjoh.chromatic.com/">View the live component library in Storybook</a></strong><br>
  <em>Browse, test, and explore 70+ components</em>
</p>

![Story Book](./assets/story-book.gif)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theme System](#theme-system)
- [Component Reference](#component-reference)
  - [Layout](#layout)
  - [Navigation](#navigation)
  - [Inputs](#inputs)
  - [Forms](#forms)
  - [Display](#display)
  - [Feedback](#feedback)
  - [Overlay](#overlay)
  - [Typography](#typography)
  - [Actions](#actions)
- [FormValidator — Fluent Validation API](#formvalidator--fluent-validation-api)
- [Hooks](#hooks)
- [CSS Token Reference](#css-token-reference)
- [Security — Snyk](#security--snyk)
- [Development](#development)
- [CI/CD — Publishing](#cicd--publishing)
- [Peer Dependencies](#peer-dependencies)
- [License](#license)

---

## Installation

```bash
npm install react-18-ui-library
# or
yarn add react-18-ui-library
# or
pnpm add react-18-ui-library
```

---

## Quick Start

```tsx
// 1. Import the library stylesheet once at your app root
//    This single file includes:
//    - All Tailwind utility classes used by components
//    - All CSS custom property tokens (:root variables)
import 'react-18-ui-library/styles'

// 2. Import and use components
import { Button, TextField, JSONForm } from 'react-18-ui-library'

export function App() {
  return (
    <div>
      <TextField label="Name" placeholder="John Doe" />
      <Button variant="primary">Submit</Button>
    </div>
  )
}
```

> **Important:** `react-18-ui-library/styles` must be imported **before** any of your own stylesheets so your CSS token overrides take precedence. You do **not** need Tailwind installed in your consuming app — all utility classes are pre-compiled into the library's stylesheet.

> **📚 [View all components in Storybook →](https://6998a00a26549f1450ed8008-alszlltjoh.chromatic.com/)** — Browse and interact with the full component library.

---

## Theme System

All components read CSS custom properties from the parent app's `:root`. There are **no hardcoded colors** and no runtime CSS-in-JS overhead.

### Override tokens in CSS

```css
/* globals.css */
:root {
  --color-primary:            #7c3aed;
  --color-primary-hover:      #6d28d9;
  --color-primary-foreground: #ffffff;
  --color-background:         #fafafa;
  --color-surface:            #ffffff;
  --color-text:               #111827;
  --color-text-muted:         #6b7280;
  --color-border:             #e5e7eb;
  --color-error:              #ef4444;
  --color-success:            #22c55e;
  --color-warning:            #f59e0b;
  --radius-sm:                0.25rem;
  --radius-md:                0.5rem;
  --radius-lg:                0.75rem;
  --font-family-base:         'Inter', sans-serif;
  --navbar-height:            64px;
  --sidebar-width:            260px;
  --sidebar-collapsed-width:  64px;
}
```

### Or use `ThemeProvider` programmatically

```tsx
import { ThemeProvider } from 'react-18-ui-library'

<ThemeProvider tokens={{ colorPrimary: '#7c3aed', radiusMd: '0.5rem' }}>
  <App />
</ThemeProvider>
```

---

## Component Reference

### Layout

| Component | Description |
|---|---|
| `AppShell` | Full-page layout combining Navbar + Sidebar + main content area |
| `Navbar` | Top navigation bar with logo, links, and action slots |
| `Sidebar` | Collapsible sidebar with icons, badges, and nested items |
| `Container` | Max-width content wrapper with `xs`/`sm`/`md`/`lg`/`xl`/`full` sizes |
| `Stack` | Flexbox stack — `direction`, `gap`, `align`, `justify` props |
| `Grid` | CSS grid with responsive column count and gap control |
| `Divider` | Horizontal or vertical separator with optional label |
| `Spacer` | Flexible whitespace filler |

```tsx
import { AppShell } from 'react-18-ui-library'
import { LayoutDashboard, Users, Settings } from 'lucide-react'

<AppShell
  navbar={{
    logo: <img src="/logo.svg" alt="Logo" height={32} />,
    links: [{ label: 'Home', href: '/', active: true }],
    actions: <Button size="sm">Sign Out</Button>,
  }}
  sidebar={{
    items: [
      { id: 'dash',     label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
      { id: 'users',    label: 'Users',     icon: <Users size={16} />, badge: 5 },
      { id: 'settings', label: 'Settings',  icon: <Settings size={16} /> },
    ],
  }}
>
  <main>Page content</main>
</AppShell>
```

---

### Navigation

| Component | Description |
|---|---|
| `Tabs` | Horizontal/vertical tab panels with `line`, `pill`, `boxed` variants |
| `Breadcrumb` | Accessible breadcrumb trail with custom separator |
| `Pagination` | Page navigation with configurable page size and sibling count |
| `StepIndicator` | Multi-step wizard progress with `completed`/`current`/`upcoming` states |

```tsx
import { Tabs, StepIndicator, Pagination } from 'react-18-ui-library'

<Tabs
  items={[
    { id: 'profile', label: 'Profile', content: <ProfilePanel /> },
    { id: 'billing', label: 'Billing', content: <BillingPanel /> },
    { id: 'security', label: 'Security', content: <SecurityPanel /> },
  ]}
  variant="pill"
/>

<StepIndicator
  steps={[
    { id: '1', label: 'Account', status: 'completed' },
    { id: '2', label: 'Profile', status: 'current' },
    { id: '3', label: 'Review',  status: 'upcoming' },
  ]}
/>

<Pagination
  page={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>
```

---

### Inputs

| Component | Description |
|---|---|
| `Button` | `primary`, `secondary`, `ghost`, `outline`, `destructive` variants + `xs`/`sm`/`md`/`lg` sizes |
| `IconButton` | Square icon-only button with same variants |
| `TextField` | Text input — prefix/suffix icon/text/image, clearable, password toggle, `showMaxLength` |
| `TextArea` | Auto-resize textarea with character count (`showCharCount` / `showMaxLength`) |
| `Select` | Radix-powered dropdown with option groups |
| `MultiSelect` | Multi-value select with chip display |
| `SearchSelect` | Combobox with single/multi mode and async search |
| `ChipSelect` | Inline chip-toggle multi-select |
| `Checkbox` | Accessible checkbox with indeterminate state |
| `RadioGroup` | Accessible radio group |
| `Switch` | Toggle switch |
| `Slider` | Range slider with `min`/`max`/`step` |
| `NumberInput` | Numeric input — increment/decrement controls, `hideControls`, blocks non-numeric keys, `showMaxLength` |
| `PhoneInput` | Phone input with country code dropdown (30+ countries), digit-only enforcement, `showMaxLength` |
| `OTPInput` | One-time password input with configurable digit count and auto-advance |
| `Rating` | Star rating with half-star support |
| `TagInput` | Free-form tag entry — Enter/comma separators, duplicate prevention |
| `DatePicker` | Calendar picker — single/range mode, month+year dropdowns, configurable year range, portal rendering |

```tsx
import { TextField, PhoneInput, NumberInput, DatePicker, OTPInput } from 'react-18-ui-library'
import { Search } from 'lucide-react'

// Text field with icon prefix and max-length counter
<TextField
  label="Username"
  prefixIcon={<Search size={14} />}
  maxLength={30}
  showMaxLength
  clearable
/>

// Phone input with country code
<PhoneInput
  label="Mobile Number"
  defaultCountry="IN"
  maxLength={10}
  showMaxLength
  onChange={(val) => console.log(val.full)} // "+91 9876543210"
/>

// Number input — hide stepper buttons
<NumberInput
  label="Quantity"
  hideControls
  min={0}
  max={999}
/>

// Date picker — restrict year range
<DatePicker
  label="Date of Birth"
  yearRangeBefore={80}
  yearRangeAfter={0}
  onChange={(date) => console.log(date)}
/>

// OTP input — 6 digits
<OTPInput length={6} onComplete={(code) => verifyOTP(code)} />
```

---

### Forms

#### `JSONForm` — Schema-Driven Forms

Build complete, validated forms from a JSON schema array. Powered by `react-hook-form`.

**Supported `type` values:** `text` · `email` · `password` · `url` · `tel` · `number` · `textarea` · `select` · `multiselect` · `radio` · `checkbox` · `switch` · `slider` · `chipselect` · `taginput` · `datepicker` · `file`

```tsx
import { JSONForm, v } from 'react-18-ui-library'
import type { JSONFormField } from 'react-18-ui-library'

const schema: JSONFormField[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    colSpan: 1,
    validator: v.string().required().lengthBetween(2, 50),
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    colSpan: 1,
    validator: v.email().required().blockedDomains(['mailinator.com']),
  },
  {
    name: 'role',
    type: 'select',
    label: 'Role',
    options: [
      { value: 'admin',  label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
    validator: v.select().required(),
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Bio',
    colSpan: 2,
    showCharCount: true,
    validator: v.string().maxLength(300),
  },
  {
    name: 'terms',
    type: 'checkbox',
    label: 'I agree to the Terms and Conditions',
    colSpan: 2,
    validator: v.boolean().mustBeTrue('You must accept the terms'),
  },
]

<JSONForm
  schema={schema}
  columns={2}
  onSubmit={(data) => console.log(data)}
  onCancel={() => router.back()}
  submitLabel="Create Account"
  cancelLabel="Cancel"
/>
```

#### `FileUpload` — Drag & Drop

```tsx
import { FileUpload } from 'react-18-ui-library'

<FileUpload
  label="Upload Documents"
  accept={{ 'image/*': ['.png', '.jpg'], 'application/pdf': ['.pdf'] }}
  maxSize={5 * 1024 * 1024}
  maxFiles={10}
  files={files}
  onFilesChange={setFiles}
  onFileRemove={(id) => setFiles(prev => prev.filter(f => f.id !== id))}
/>
```

---

## FormValidator — Fluent Validation API

A chainable, type-safe validation builder that compiles to `react-hook-form` rules. Import `v` and attach a `.validator` to any `JSONFormField`.

### Validator reference

| Builder | Field types | Methods |
|---|---|---|
| `v.string()` | `text` `textarea` | `.required()` `.minLength(n)` `.maxLength(n)` `.lengthBetween(min,max)` `.length(n)` `.shouldMatch(regex)` `.shouldBeIn([...])` `.notEmpty()` `.noSpaces()` `.alphanumeric()` `.startsWith(s)` `.endsWith(s)` `.custom(name, fn)` |
| `v.number()` | `number` | `.required()` `.min(n)` `.max(n)` `.between(min,max)` `.integer()` `.positive()` `.negative()` `.nonZero()` `.multipleOf(n)` `.length(digits)` `.custom(name, fn)` |
| `v.password()` | `password` | `.required()` `.minLength(n)` `.maxLength(n)` `.hasUppercase()` `.hasLowercase()` `.hasDigit()` `.hasSpecialChar()` `.noSpaces()` `.confirmMatch(getter)` `.strong()` `.custom(name, fn)` |
| `v.email()` | `email` | `.required()` `.domain([...])` `.blockedDomains([...])` `.shouldMatch(regex)` `.custom(name, fn)` |
| `v.url()` | `url` | `.required()` `.httpsOnly()` `.allowedDomains([...])` `.noTrailingSlash()` `.custom(name, fn)` |
| `v.tel()` | `tel` | `.required()` `.length(n)` `.minLength(n)` `.maxLength(n)` `.shouldMatch(regex)` `.custom(name, fn)` |
| `v.date()` | `datepicker` `text` | `.required()` `.validDate()` `.minDate(d)` `.maxDate(d)` `.notInPast()` `.notInFuture()` `.between(min,max)` `.custom(name, fn)` |
| `v.select()` | `select` `radio` | `.required()` `.shouldBeIn([...])` `.notEmpty()` `.custom(name, fn)` |
| `v.boolean()` | `checkbox` `switch` | `.required()` `.mustBeTrue(msg)` `.custom(name, fn)` |
| `v.array()` | `chipselect` `taginput` `multiselect` | `.required()` `.minItems(n)` `.maxItems(n)` `.exactItems(n)` `.shouldBeIn([...])` `.noEmpty()` `.custom(name, fn)` |
| `v.file()` | `file` | `.required()` `.maxSize(bytes)` `.allowedTypes([...])` `.allowedExtensions([...])` `.maxFiles(n)` `.minFiles(n)` `.custom(name, fn)` |

### Usage examples

```tsx
import { v } from 'react-18-ui-library'

// String
v.string().required().lengthBetween(3, 20).noSpaces()
v.string().required().shouldBeIn(['admin', 'editor', 'viewer'])
v.string().required().shouldMatch(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code')
v.string().required().startsWith('INVITE-').alphanumeric()

// Number
v.number().required().between(18, 120).integer()
v.number().required().positive().nonZero().multipleOf(5)
v.number().required().length(6)  // exactly 6 digits (PIN)

// Password with confirm-match
const passwordRef = useRef('')
// field 1
v.password().required().strong()
// field 2 — reads field 1's value via getter
v.password().required().confirmMatch(() => passwordRef.current)

// Email
v.email().required()
v.email().required().domain(['company.com', 'company.org'])       // whitelist
v.email().required().blockedDomains(['mailinator.com', 'yopmail.com']) // blacklist

// URL
v.url().required().httpsOnly().noTrailingSlash()
v.url().required().allowedDomains(['github.com'])

// Phone
v.tel().required().length(10)
v.tel().required().minLength(7).maxLength(15)

// Date
v.date().required().notInPast()
v.date().required().notInFuture()
v.date().required().between(new Date('2020-01-01'), new Date('2030-12-31'))

// Select / Radio
v.select().required().shouldBeIn(['us', 'gb', 'in', 'au'])

// Boolean
v.boolean().mustBeTrue('You must accept the terms')

// Array (chipselect / taginput)
v.array().required().minItems(2).maxItems(5)
v.array().required().exactItems(3).noEmpty()

// File upload
v.file().required()
  .maxSize(5 * 1024 * 1024)
  .allowedTypes(['image/*', 'application/pdf'])
  .maxFiles(3)

// Custom rule
v.string().required().custom(
  'noBadWords',
  (val) => !String(val).includes('spam'),
  'Inappropriate content detected'
)
```

---

### Display

| Component | Description |
|---|---|
| `Card` | Surface container with optional header, footer, and padding variants |
| `Box` | Generic styled `div` with spacing and color props |
| `Image` | Responsive image with aspect ratio (`square`/`video`/`portrait`) and `fit` control |
| `Avatar` / `AvatarGroup` | User avatar with fallback initials, status dot, and group stacking |
| `Badge` / `BadgeAnchor` | Status badge chip and notification dot anchor |
| `Tag` | Dismissible label chip with color variants |
| `Icon` | Lucide icon wrapper with `xs`/`sm`/`md`/`lg`/`xl` sizes |
| `SVG` | Raw SVG wrapper with size props |
| `Table` | Sortable, selectable data table with sticky header |
| `DataTable` | Full-featured table with server-side pagination and column visibility |
| `List` / `ListItem` | Semantic list with icon, description, and action slots |
| `Timeline` | Vertical event timeline with icon and color variants |
| `Stat` | Metric card with label, value, delta, and trend indicator |
| `EmptyState` | Zero-state placeholder with icon, title, description, and CTA |
| `MarkdownReader` | Renders Markdown with GFM tables and syntax-highlighted code blocks |
| `Collapsible` | Animated expand/collapse panel |
| `TreeView` | Recursive tree with expand/collapse nodes and selection |

---

### Feedback

| Component | Description |
|---|---|
| `Alert` | Inline status message — `info` / `success` / `warning` / `error` |
| `ToastProvider` + `useToast` | Global toast notification system with position control |
| `Spinner` | Loading spinner — `xs` through `xl` sizes |
| `Skeleton` / `SkeletonCard` | Content placeholder shimmer animations |
| `ProgressBar` | Linear progress with `default` / `success` / `warning` / `error` variants |
| `ErrorBoundary` | React error boundary with customizable fallback UI |
| `FullScreenLoader` + `useFullScreenLoader` | Full-viewport loading overlay with programmatic control |

```tsx
import { ToastProvider, useToast } from 'react-18-ui-library'

// Wrap your app root
<ToastProvider toasts={toasts} onDismiss={dismiss} position="bottom-right" />

// In any component
const { toast, dismiss } = useToast()
toast({ title: 'Saved!',  description: 'Changes saved.',       variant: 'success' })
toast({ title: 'Error',   description: 'Something went wrong.', variant: 'error' })
toast({ title: 'Warning', description: 'Low disk space.',       variant: 'warning' })
```

---

### Overlay

| Component | Description |
|---|---|
| `Modal` | Radix Dialog modal — `sm`/`md`/`lg`/`xl`/`full` sizes |
| `Drawer` | Slide-in panel from `top`/`right`/`bottom`/`left` |
| `Tooltip` | Hover tooltip with `top`/`right`/`bottom`/`left` placement |
| `Popover` | Click-triggered floating panel |
| `ContextMenu` | Right-click context menu with icons and dividers |
| `ConfirmDialog` + `useConfirm` | Programmatic async confirmation dialog |
| `CommandPalette` + `useCommandPalette` | ⌘K-style command palette with groups and keyboard navigation, portal-rendered |

```tsx
import { useConfirm, ConfirmDialogProvider } from 'react-18-ui-library'

// Wrap app root
<ConfirmDialogProvider>
  <App />
</ConfirmDialogProvider>

// In any component
const confirm = useConfirm()
const ok = await confirm({
  title: 'Delete record?',
  description: 'This action cannot be undone.',
  confirmLabel: 'Delete',
  variant: 'destructive',
})
if (ok) deleteRecord()
```

```tsx
import { CommandPalette, useCommandPalette } from 'react-18-ui-library'

const { open, close, isOpen } = useCommandPalette()

// Bind ⌘K
useKeyboard([{ key: 'k', meta: true, handler: open }])

<CommandPalette
  open={isOpen}
  onClose={close}
  groups={[
    {
      id: 'nav',
      label: 'Navigation',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} />, onSelect: () => router.push('/') },
        { id: 'settings',  label: 'Settings',  icon: <Settings size={14} />,        onSelect: () => router.push('/settings') },
      ],
    },
  ]}
/>
```

---

### Typography

| Component | Description |
|---|---|
| `Heading` | `h1`–`h6` with independent `size` (`xs`–`4xl`) and `weight` props |
| `Text` | Paragraph / span with `size`, `weight`, `color`, and polymorphic `as` prop |
| `Label` | Accessible form label |
| `Code` | Inline code or syntax-highlighted fenced code block (Prism) |
| `Link` | Anchor with `none`/`hover`/`always` underline variants |
| `Kbd` | Keyboard shortcut key display |

```tsx
import { Heading, Text, Code, Kbd, Link } from 'react-18-ui-library'

<Heading level="h1" size="3xl" weight="bold">Welcome back</Heading>
<Text color="muted" size="sm">Last updated 2 minutes ago</Text>
<Text>
  Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
</Text>
<Code block language="tsx">{`const x: number = 42`}</Code>
<Link href="/docs" underline="hover">Read the docs</Link>
```

---

### Actions

| Component | Description |
|---|---|
| `CopyButton` | One-click copy to clipboard with animated feedback state |

---

## Hooks

| Hook | Signature | Description |
|---|---|---|
| `useToast` | `() => { toast, dismiss, toasts }` | Trigger and dismiss toast notifications |
| `useTheme` | `() => { tokens, setToken }` | Read and update CSS token values at runtime |
| `useMediaQuery` | `(query: string) => boolean` | Reactive media query boolean |
| `useClickOutside` | `(ref, handler)` | Fire handler when clicking outside a ref |
| `useDebounce` | `(value, delay) => value` | Debounce any value |
| `useLocalStorage` | `(key, initial) => [value, setter]` | Persistent state backed by `localStorage` |
| `useClipboard` | `() => { copy, copied }` | Copy text with `copied` feedback state |
| `useWindowSize` | `() => { width, height }` | Reactive window dimensions |
| `useIntersectionObserver` | `(ref, options) => entry` | Intersection Observer hook |
| `useKeyboard` | `(shortcuts[]) => void` | Bind keyboard shortcuts declaratively |
| `useConfirm` | `() => confirmFn` | Programmatic confirm dialog (needs `ConfirmDialogProvider`) |
| `useCommandPalette` | `() => { open, close, isOpen }` | Control the command palette |
| `useFullScreenLoader` | `() => { show, hide, isVisible }` | Show/hide the full-screen loading overlay |

```tsx
import { useDebounce, useLocalStorage, useKeyboard, useClipboard } from 'react-18-ui-library'

const debouncedQuery = useDebounce(searchQuery, 300)
const [theme, setTheme] = useLocalStorage('theme', 'light')
const { copy, copied } = useClipboard()

useKeyboard([
  { key: 'k', meta: true, handler: () => openPalette() },
  { key: 'Escape',        handler: () => closeModal() },
])
```

---

## CSS Token Reference

| Token | Default | Purpose |
|---|---|---|
| `--color-primary` | `#6366f1` | Primary brand color |
| `--color-primary-hover` | `#4f46e5` | Primary hover state |
| `--color-primary-foreground` | `#ffffff` | Text on primary background |
| `--color-background` | `#f8fafc` | Page background |
| `--color-surface` | `#ffffff` | Card / panel background |
| `--color-text` | `#0f172a` | Primary text |
| `--color-text-muted` | `#64748b` | Secondary / helper text |
| `--color-border` | `#e2e8f0` | Default border color |
| `--color-error` | `#ef4444` | Error / destructive state |
| `--color-success` | `#22c55e` | Success / positive state |
| `--color-warning` | `#f59e0b` | Warning / caution state |
| `--radius-sm` | `0.25rem` | Small border radius |
| `--radius-md` | `0.375rem` | Default border radius |
| `--radius-lg` | `0.5rem` | Large border radius |
| `--font-family-base` | `system-ui` | Base font family |
| `--navbar-height` | `64px` | Navbar height |
| `--sidebar-width` | `260px` | Sidebar expanded width |
| `--sidebar-collapsed-width` | `64px` | Sidebar collapsed width |

---

## Security — Snyk

This library uses [Snyk](https://snyk.io) for dependency vulnerability scanning. Snyk runs automatically as a `prebuild` hook — the build is blocked if any **high** or **critical** severity vulnerabilities are found.

### Setup (one-time)

```bash
# Authenticate with Snyk (opens browser)
npx snyk auth
```

### Available security scripts

| Script | Description |
|---|---|
| `npm run snyk:test` | Scan for high + critical vulnerabilities (used in `prebuild`) |
| `npm run snyk:test:all` | Scan for all severities including low and medium |
| `npm run snyk:monitor` | Upload snapshot to Snyk dashboard for continuous monitoring |
| `npm run snyk:report` | Run scan and generate `reports/snyk-report.html` |
| `npm run snyk:report:html` | Save raw JSON results then generate HTML report |

### How the build gate works

```
npm run build
  └─ prebuild → snyk test --severity-threshold=high
       ├─ PASS → build proceeds normally
       └─ FAIL → build aborted (exit code 1)
```

The `.snyk` policy file at the project root can be used to suppress known/accepted vulnerabilities:

```yaml
# .snyk
ignore:
  SNYK-JS-EXAMPLE-12345:
    - '*':
        reason: Not exploitable in this context
        expires: 2026-12-31T00:00:00.000Z
```

---

## Development

```bash
# Install dependencies
npm install

# Authenticate Snyk (first time only)
npx snyk auth

# Start Storybook dev server (port 6006)
npm run dev

# Type check
npm run type-check

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Build library (runs snyk:test first via prebuild hook)
npm run build

# Build Storybook static site
npm run build-storybook

# Run Snyk vulnerability scan
npm run snyk:test

# Generate HTML vulnerability report
npm run snyk:report:html
# → opens reports/snyk-report.html
```

---

## Peer Dependencies

| Package | Version |
|---|---|
| `react` | `>= 18.0.0` |
| `react-dom` | `>= 18.0.0` |

> TailwindCSS is **not** a peer dependency — the library ships pre-compiled CSS. You do not need Tailwind in your consuming app.

---

## License

MIT © react-18-ui-library contributors
