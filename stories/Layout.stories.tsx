import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../src/components/display/Box/Box'
import { Stack } from '../src/components/layout/Stack/Stack'
import { Grid } from '../src/components/layout/Grid/Grid'
import { Container } from '../src/components/layout/Container/Container'
import { Spacer } from '../src/components/layout/Spacer/Spacer'
import { Divider } from '../src/components/layout/Divider/Divider'
import { Card } from '../src/components/display/Card/Card'

const meta: Meta = {
  title: 'Layout/Layout Primitives',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const Swatch = ({ label, style }: { label: string; style?: React.CSSProperties }) => (
  <div style={{
    padding: '12px 16px',
    borderRadius: 8,
    background: 'var(--color-primary-light)',
    border: '1px solid var(--color-border)',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--color-primary)',
    textAlign: 'center',
    ...style,
  }}>
    {label}
  </div>
)

export const BoxComponent: Story = {
  render: () => (
    <Stack gap="lg">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Backgrounds</p>
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Box bg="surface" bordered rounded="md" padding="md">Surface</Box>
          <Box bg="primary" rounded="md" padding="md">Primary</Box>
          <Box bg="success" rounded="md" padding="md">Success</Box>
          <Box bg="error" rounded="md" padding="md">Error</Box>
          <Box bg="warning" rounded="md" padding="md">Warning</Box>
          <Box bg="info" rounded="md" padding="md">Info</Box>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shadows & Rounding</p>
        <Stack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
          <Box bg="surface" bordered rounded="sm" shadow="sm" padding="md">sm shadow</Box>
          <Box bg="surface" bordered rounded="md" shadow="md" padding="md">md shadow</Box>
          <Box bg="surface" bordered rounded="lg" shadow="lg" padding="md">lg shadow</Box>
          <Box bg="surface" bordered rounded="xl" shadow="lg" padding="md">xl rounded</Box>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semantic elements</p>
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          {(['div', 'section', 'article', 'aside', 'nav'] as const).map((tag) => (
            <Box key={tag} as={tag} bordered rounded="md" padding="sm" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              &lt;{tag}&gt;
            </Box>
          ))}
        </Stack>
      </div>
    </Stack>
  ),
}

export const StackComponent: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vertical (default)</p>
        <Stack gap="sm" style={{ maxWidth: 300 }}>
          <Swatch label="Item 1" />
          <Swatch label="Item 2" />
          <Swatch label="Item 3" />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Horizontal with alignment</p>
        <Stack direction="row" gap="sm" align="center">
          <Swatch label="Short" />
          <Swatch label="Taller item" style={{ paddingTop: 24, paddingBottom: 24 }} />
          <Swatch label="Short" />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Space between</p>
        <Stack direction="row" justify="between" align="center">
          <Swatch label="Left" />
          <Swatch label="Center" />
          <Swatch label="Right" />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wrapping</p>
        <Stack direction="row" gap="sm" wrap>
          {Array.from({ length: 8 }, (_, i) => <Swatch key={i} label={`Item ${i + 1}`} style={{ minWidth: 80 }} />)}
        </Stack>
      </div>
    </Stack>
  ),
}

export const GridComponent: Story = {
  render: () => (
    <Stack gap="xl">
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>3-column grid</p>
        <Grid cols={3} gap="md">
          {Array.from({ length: 6 }, (_, i) => <Swatch key={i} label={`Col ${i + 1}`} />)}
        </Grid>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>4-column responsive (1 → 2 → 4)</p>
        <Grid cols={1} smCols={2} lgCols={4} gap="md">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>Card {i + 1}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 4 }}>Responsive grid cell</p>
            </Card>
          ))}
        </Grid>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Auto-fill (min 160px)</p>
        <Grid autoFill minColWidth="160px" gap="sm">
          {Array.from({ length: 7 }, (_, i) => <Swatch key={i} label={`Auto ${i + 1}`} />)}
        </Grid>
      </div>
    </Stack>
  ),
}

export const ContainerSizes: Story = {
  render: () => (
    <Stack gap="sm">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Container key={size} size={size} style={{ background: 'var(--color-primary-light)', borderRadius: 6, padding: '8px 16px' }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)' }}>Container size="{size}"</p>
        </Container>
      ))}
    </Stack>
  ),
}

export const DividerVariants: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 480 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plain</p>
        <Divider />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>With label</p>
        <Divider label="OR" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Label positions</p>
        <Stack gap="sm">
          <Divider label="Left aligned" labelPosition="left" />
          <Divider label="Centered" labelPosition="center" />
          <Divider label="Right aligned" labelPosition="right" />
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vertical (inline)</p>
        <Stack direction="row" align="center" gap="md">
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Home</span>
          <Divider orientation="vertical" />
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>About</span>
          <Divider orientation="vertical" />
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Contact</span>
        </Stack>
      </div>
    </Stack>
  ),
}

export const SpacerComponent: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vertical spacers between blocks</p>
      <Box bg="surface" bordered rounded="md" padding="sm">Block A</Box>
      <Spacer size={4} />
      <Box bg="surface" bordered rounded="md" padding="sm">Block B (4 units below A)</Box>
      <Spacer size={8} />
      <Box bg="surface" bordered rounded="md" padding="sm">Block C (8 units below B)</Box>
      <Spacer size={16} />
      <Box bg="surface" bordered rounded="md" padding="sm">Block D (16 units below C)</Box>
    </div>
  ),
}
