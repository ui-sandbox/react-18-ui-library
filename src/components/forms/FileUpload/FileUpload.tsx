import React, { useCallback } from 'react'
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone'
import { Upload, X, File, Image, FileText, AlertCircle } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface UploadedFile {
  file: File
  id: string
  preview?: string
  progress?: number
  error?: string
}

export interface FileUploadProps {
  accept?: Accept
  maxFiles?: number
  maxSize?: number
  multiple?: boolean
  disabled?: boolean
  label?: string
  helperText?: string
  error?: string
  files?: UploadedFile[]
  onFilesChange?: (files: UploadedFile[]) => void
  onFileRemove?: (id: string) => void
  showPreview?: boolean
  className?: string
}

function getFileIcon(file: File) {
  if (file.type.startsWith('image/')) return <Image size={20} />
  if (file.type.includes('pdf') || file.type.includes('text')) return <FileText size={20} />
  return <File size={20} />
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function generateFileId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function FileUpload({
  accept,
  maxFiles,
  maxSize,
  multiple = true,
  disabled = false,
  label,
  helperText,
  error,
  files = [],
  onFilesChange,
  onFileRemove,
  showPreview = true,
  className,
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        file,
        id: generateFileId(),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        progress: 0,
      }))

      const rejectedMapped: UploadedFile[] = rejectedFiles.map(({ file, errors }) => ({
        file,
        id: generateFileId(),
        error: errors[0]?.message ?? 'File rejected',
      }))

      onFilesChange?.([...files, ...newFiles, ...rejectedMapped])
    },
    [files, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    multiple,
    disabled,
  })

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && <p className="text-sm font-medium text-text">{label}</p>}

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed',
          'transition-colors cursor-pointer outline-none',
          isDragActive && !isDragReject && 'border-primary bg-primary/5',
          isDragReject && 'border-error bg-error-bg',
          !isDragActive && !isDragReject && 'border-border hover:border-primary hover:bg-surface-hover',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          error && 'border-error'
        )}
      >
        <input {...getInputProps()} />

        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full',
            isDragReject ? 'bg-error-bg text-error' : 'bg-surface-hover text-text-muted'
          )}
        >
          {isDragReject ? <AlertCircle size={24} /> : <Upload size={24} />}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-text">
            {isDragActive
              ? isDragReject
                ? 'File not accepted'
                : 'Drop files here'
              : 'Drag & drop files here'}
          </p>
          <p className="text-xs text-text-muted mt-1">
            or{' '}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              browse files
            </span>
          </p>
          {(maxSize || accept) && (
            <p className="text-xs text-text-muted mt-2">
              {accept && `Accepted: ${Object.values(accept).flat().join(', ')} · `}
              {maxSize && `Max size: ${formatBytes(maxSize)}`}
              {maxFiles && ` · Max files: ${maxFiles}`}
            </p>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-error" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}

      {/* File list */}
      {showPreview && files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((uploadedFile) => (
            <li
              key={uploadedFile.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border bg-surface',
                uploadedFile.error ? 'border-error bg-error-bg' : 'border-border'
              )}
            >
              {/* Thumbnail or icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-surface-hover flex items-center justify-center text-text-muted">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getFileIcon(uploadedFile.file)
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">
                  {uploadedFile.file.name}
                </p>
                {uploadedFile.error ? (
                  <p className="text-xs text-error">{uploadedFile.error}</p>
                ) : (
                  <p className="text-xs text-text-muted">
                    {formatBytes(uploadedFile.file.size)}
                  </p>
                )}

                {/* Progress bar */}
                {uploadedFile.progress !== undefined && uploadedFile.progress < 100 && !uploadedFile.error && (
                  <div className="mt-1.5 h-1 w-full bg-surface-hover rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${uploadedFile.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => onFileRemove?.(uploadedFile.id)}
                className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-text-muted hover:text-error hover:bg-error-bg transition-colors"
                aria-label={`Remove ${uploadedFile.file.name}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
