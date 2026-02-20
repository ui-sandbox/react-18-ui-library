import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '../src/components/feedback/Spinner/Spinner'
import { Skeleton, SkeletonCard } from '../src/components/feedback/Skeleton/Skeleton'
import { ProgressBar } from '../src/components/feedback/ProgressBar/ProgressBar'
import { Button } from '../src/components/inputs/Button/Button'

const meta: Meta = {
  title: 'Feedback/Spinner, Skeleton & Progress',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Spinners: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sizes</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Spinner key={size} size={size} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Colors</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Spinner size="md" color="primary" />
          <Spinner size="md" color="secondary" />
          <div style={{ background: 'var(--color-primary)', padding: 8, borderRadius: 8 }}>
            <Spinner size="md" color="white" />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Skeletons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Text lines</p>
        <Skeleton variant="text" lines={4} />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shapes</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Skeleton variant="circle" width={48} height={48} />
          <Skeleton variant="rect" width={120} height={48} />
          <Skeleton variant="rect" width={80} height={32} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card skeleton</p>
        <SkeletonCard lines={3} />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>List skeleton</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Skeleton variant="circle" width={40} height={40} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <div style={{ marginTop: 6 }}>
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const ProgressBars: Story = {
  render: () => {
    const [value, setValue] = useState(45)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.max(0, v - 10))}>−10</Button>
          <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.min(100, v + 10))}>+10</Button>
        </div>
        <ProgressBar label="Primary" value={value} showValue variant="primary" size="md" />
        <ProgressBar label="Success" value={72} showValue variant="success" size="md" />
        <ProgressBar label="Warning" value={87} showValue variant="warning" size="md" />
        <ProgressBar label="Error" value={23} showValue variant="error" size="md" />
        <ProgressBar label="Info" value={55} showValue variant="info" size="md" />
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 8, fontWeight: 500 }}>Sizes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ProgressBar value={60} size="xs" />
            <ProgressBar value={60} size="sm" />
            <ProgressBar value={60} size="md" />
            <ProgressBar value={60} size="lg" />
          </div>
        </div>
        <ProgressBar label="Indeterminate" indeterminate variant="primary" size="md" />
      </div>
    )
  },
}
