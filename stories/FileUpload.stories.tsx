import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from '../src/components/forms/FileUpload/FileUpload'
import type { UploadedFile } from '../src/components/forms/FileUpload/FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileUpload>

function FileUploadDemo() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <FileUpload
      label="Upload Files"
      helperText="Drag and drop files here, or click to browse"
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'], 'application/pdf': ['.pdf'] }}
      maxSize={5 * 1024 * 1024}
      maxFiles={5}
      files={files}
      onFilesChange={setFiles}
      onFileRemove={handleRemove}
    />
  )
}

export const Default: Story = {
  render: () => <FileUploadDemo />,
}

export const ImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([])
    return (
      <FileUpload
        label="Upload Images"
        accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
        maxSize={2 * 1024 * 1024}
        files={files}
        onFilesChange={setFiles}
        onFileRemove={(id) => setFiles((p) => p.filter((f) => f.id !== id))}
      />
    )
  },
}
