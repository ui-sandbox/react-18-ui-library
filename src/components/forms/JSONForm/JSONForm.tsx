import React from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import type { AnyValidator } from './FormValidator'
import { cn } from '../../../utils/cn'
import { TextField } from '../../inputs/TextField/TextField'
import { TextArea } from '../../inputs/TextArea/TextArea'
import { Select } from '../../inputs/Select/Select'
import { Checkbox } from '../../inputs/Checkbox/Checkbox'
import { Switch } from '../../inputs/Switch/Switch'
import { RadioGroup } from '../../inputs/Radio/Radio'
import { Button } from '../../inputs/Button/Button'
import { SearchSelect } from '../../inputs/SearchSelect/SearchSelect'
import { ChipSelect } from '../../inputs/ChipSelect/ChipSelect'
import { TagInput } from '../../inputs/TagInput/TagInput'

export type JSONFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'url'
  | 'tel'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'searchselect'
  | 'multisearchselect'
  | 'chipselect'
  | 'taginput'
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'hidden'

export interface JSONFormOption {
  value: string
  label: string
  disabled?: boolean
}

export interface JSONFormField {
  name: string
  type: JSONFieldType
  label?: string
  placeholder?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: unknown
  options?: JSONFormOption[]
  prefixIcon?: React.ReactNode
  prefixImage?: string
  prefixText?: string
  suffixIcon?: React.ReactNode
  suffixImage?: string
  suffixText?: string
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    validate?: (value: unknown) => boolean | string
  }
  /** Fluent validator built with v.string(), v.number(), v.email() etc. Takes precedence over validation object */
  validator?: AnyValidator
  colSpan?: 1 | 2 | 3
  rows?: number
  autoResize?: boolean
  showCharCount?: boolean
}

export interface JSONFormProps {
  schema: JSONFormField[]
  defaultValues?: Record<string, unknown>
  onSubmit: SubmitHandler<Record<string, unknown>>
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  loading?: boolean
  columns?: 1 | 2 | 3
  className?: string
  actionsClassName?: string
}

export function JSONForm({
  schema,
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  loading = false,
  columns = 1,
  className,
  actionsClassName,
}: JSONFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    defaultValues: defaultValues ?? Object.fromEntries(
      schema.map((f) => [f.name, f.defaultValue ?? ''])
    ),
  })

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  const colSpanClasses: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('w-full', className)}>
      <div className={cn('grid gap-4', gridCols[columns])}>
        {schema.map((field) => {
          if (field.type === 'hidden') {
            return (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                render={({ field: f }) => <input type="hidden" {...f} value={String(f.value ?? '')} />}
              />
            )
          }

          const errorMsg = errors[field.name]?.message as string | undefined
          const colSpan = field.colSpan ?? 1

          return (
            <div
              key={field.name}
              className={cn(colSpanClasses[colSpan])}
            >
              <Controller
                name={field.name}
                control={control}
                rules={(() => {
                  if (field.validator) {
                    const compiled = field.validator.compile()
                    return {
                      required: field.required
                        ? `${field.label ?? field.name} is required`
                        : compiled.required,
                      minLength: compiled.minLength,
                      maxLength: compiled.maxLength,
                      min: compiled.min,
                      max: compiled.max,
                      pattern: compiled.pattern,
                      validate: compiled.validate,
                    }
                  }
                  return {
                    required: field.required ? `${field.label ?? field.name} is required` : false,
                    minLength: field.validation?.minLength
                      ? { value: field.validation.minLength, message: `Minimum ${field.validation.minLength} characters` }
                      : undefined,
                    maxLength: field.validation?.maxLength
                      ? { value: field.validation.maxLength, message: `Maximum ${field.validation.maxLength} characters` }
                      : undefined,
                    min: field.validation?.min
                      ? { value: field.validation.min, message: `Minimum value is ${field.validation.min}` }
                      : undefined,
                    max: field.validation?.max
                      ? { value: field.validation.max, message: `Maximum value is ${field.validation.max}` }
                      : undefined,
                    pattern: field.validation?.pattern
                      ? { value: field.validation.pattern, message: 'Invalid format' }
                      : undefined,
                    validate: field.validation?.validate,
                  }
                })()}
                render={({ field: f }) => {
                  const commonProps = {
                    label: field.label,
                    helperText: field.helperText,
                    error: errorMsg,
                    disabled: field.disabled,
                    required: field.required,
                    fullWidth: true,
                  }

                  if (field.type === 'textarea') {
                    return (
                      <TextArea
                        {...commonProps}
                        value={String(f.value ?? '')}
                        onChange={f.onChange}
                        onBlur={f.onBlur}
                        placeholder={field.placeholder}
                        rows={field.rows}
                        autoResize={field.autoResize}
                        showCharCount={field.showCharCount}
                        maxLength={field.validation?.maxLength}
                        prefixIcon={field.prefixIcon}
                        prefixImage={field.prefixImage}
                        suffixIcon={field.suffixIcon}
                        suffixImage={field.suffixImage}
                      />
                    )
                  }

                  if (field.type === 'select') {
                    return (
                      <Select
                        {...commonProps}
                        options={field.options ?? []}
                        value={String(f.value ?? '')}
                        onValueChange={f.onChange}
                        placeholder={field.placeholder}
                      />
                    )
                  }

                  if (field.type === 'searchselect') {
                    return (
                      <SearchSelect
                        {...commonProps}
                        options={field.options ?? []}
                        value={String(f.value ?? '')}
                        onChange={(v) => f.onChange(v)}
                        placeholder={field.placeholder}
                        fullWidth
                      />
                    )
                  }

                  if (field.type === 'multiselect' || field.type === 'multisearchselect') {
                    return (
                      <SearchSelect
                        {...commonProps}
                        multiple
                        options={field.options ?? []}
                        value={Array.isArray(f.value) ? f.value as string[] : []}
                        onChange={(v) => f.onChange(v)}
                        placeholder={field.placeholder}
                        fullWidth
                      />
                    )
                  }

                  if (field.type === 'chipselect') {
                    return (
                      <ChipSelect
                        label={field.label}
                        helperText={field.helperText}
                        error={errorMsg}
                        disabled={field.disabled}
                        required={field.required}
                        options={field.options ?? []}
                        value={Array.isArray(f.value) ? f.value as string[] : []}
                        onChange={(v) => f.onChange(v)}
                        fullWidth
                      />
                    )
                  }

                  if (field.type === 'taginput') {
                    return (
                      <TagInput
                        label={field.label}
                        helperText={field.helperText}
                        error={errorMsg}
                        disabled={field.disabled}
                        required={field.required}
                        value={Array.isArray(f.value) ? f.value as string[] : []}
                        onChange={(v) => f.onChange(v)}
                        placeholder={field.placeholder}
                        fullWidth
                      />
                    )
                  }

                  if (field.type === 'checkbox') {
                    return (
                      <Checkbox
                        label={field.label}
                        checked={Boolean(f.value)}
                        onCheckedChange={f.onChange}
                        disabled={field.disabled}
                        required={field.required}
                        error={errorMsg}
                      />
                    )
                  }

                  if (field.type === 'switch') {
                    return (
                      <Switch
                        label={field.label}
                        checked={Boolean(f.value)}
                        onCheckedChange={f.onChange}
                        disabled={field.disabled}
                        required={field.required}
                      />
                    )
                  }

                  if (field.type === 'radio') {
                    return (
                      <RadioGroup
                        label={field.label}
                        options={field.options ?? []}
                        value={String(f.value ?? '')}
                        onValueChange={f.onChange}
                        disabled={field.disabled}
                        required={field.required}
                        error={errorMsg}
                      />
                    )
                  }

                  return (
                    <TextField
                      {...commonProps}
                      type={field.type}
                      value={String(f.value ?? '')}
                      onChange={f.onChange}
                      onBlur={f.onBlur}
                      placeholder={field.placeholder}
                      prefixIcon={field.prefixIcon}
                      prefixImage={field.prefixImage}
                      prefixText={field.prefixText}
                      suffixIcon={field.suffixIcon}
                      suffixImage={field.suffixImage}
                      suffixText={field.suffixText}
                    />
                  )
                }}
              />
            </div>
          )
        })}
      </div>

      <div className={cn('flex items-center justify-end gap-3 mt-6', actionsClassName)}>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
