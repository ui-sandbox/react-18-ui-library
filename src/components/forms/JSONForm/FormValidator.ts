import type { RegisterOptions } from 'react-hook-form'

type ValidateFn = (value: unknown) => boolean | string

export interface CompiledRules {
  required?: RegisterOptions['required']
  minLength?: RegisterOptions['minLength']
  maxLength?: RegisterOptions['maxLength']
  min?: RegisterOptions['min']
  max?: RegisterOptions['max']
  pattern?: RegisterOptions['pattern']
  validate?: Record<string, ValidateFn>
}

// ─── Base builder ────────────────────────────────────────────────────────────

abstract class BaseValidator<T extends BaseValidator<T>> {
  protected _required: string | false = false
  protected _validates: Record<string, ValidateFn> = {}

  required(message?: string): T {
    this._required = message ?? 'This field is required'
    return this as unknown as T
  }

  custom(name: string, fn: ValidateFn, message?: string): T {
    this._validates[name] = (v) => {
      const result = fn(v)
      if (result === false) return message ?? 'Invalid value'
      return result
    }
    return this as unknown as T
  }

  abstract compile(): CompiledRules
}

// ─── String validator ─────────────────────────────────────────────────────────

export class StringValidator extends BaseValidator<StringValidator> {
  private _minLength?: { value: number; message: string }
  private _maxLength?: { value: number; message: string }
  private _pattern?: { value: RegExp; message: string }
  private _mustBeString = false

  mustBe(_type: 'string'): StringValidator {
    this._mustBeString = true
    return this
  }

  minLength(len: number, message?: string): StringValidator {
    this._minLength = { value: len, message: message ?? `Minimum ${len} characters required` }
    return this
  }

  maxLength(len: number, message?: string): StringValidator {
    this._maxLength = { value: len, message: message ?? `Maximum ${len} characters allowed` }
    return this
  }

  lengthBetween(min: number, max: number, message?: string): StringValidator {
    this._minLength = { value: min, message: message ?? `Must be between ${min} and ${max} characters` }
    this._maxLength = { value: max, message: message ?? `Must be between ${min} and ${max} characters` }
    return this
  }

  length(exact: number, message?: string): StringValidator {
    this._minLength = { value: exact, message: message ?? `Must be exactly ${exact} characters` }
    this._maxLength = { value: exact, message: message ?? `Must be exactly ${exact} characters` }
    return this
  }

  shouldMatch(pattern: RegExp, message?: string): StringValidator {
    this._pattern = { value: pattern, message: message ?? 'Invalid format' }
    return this
  }

  shouldBeIn(list: string[], message?: string): StringValidator {
    this._validates['shouldBeIn'] = (v) =>
      list.includes(String(v ?? '')) || (message ?? `Must be one of: ${list.join(', ')}`)
    return this
  }

  notEmpty(message?: string): StringValidator {
    this._validates['notEmpty'] = (v) =>
      (String(v ?? '').trim().length > 0) || (message ?? 'Cannot be empty or whitespace')
    return this
  }

  noSpaces(message?: string): StringValidator {
    this._validates['noSpaces'] = (v) =>
      !/\s/.test(String(v ?? '')) || (message ?? 'No spaces allowed')
    return this
  }

  alphanumeric(message?: string): StringValidator {
    this._validates['alphanumeric'] = (v) =>
      /^[a-zA-Z0-9]*$/.test(String(v ?? '')) || (message ?? 'Only letters and numbers allowed')
    return this
  }

  startsWith(prefix: string, message?: string): StringValidator {
    this._validates['startsWith'] = (v) =>
      String(v ?? '').startsWith(prefix) || (message ?? `Must start with "${prefix}"`)
    return this
  }

  endsWith(suffix: string, message?: string): StringValidator {
    this._validates['endsWith'] = (v) =>
      String(v ?? '').endsWith(suffix) || (message ?? `Must end with "${suffix}"`)
    return this
  }

  compile(): CompiledRules {
    const validates = { ...this._validates }
    if (this._mustBeString) {
      validates['mustBeString'] = (v) => typeof v === 'string' || 'Must be a string'
    }
    return {
      required: this._required || undefined,
      minLength: this._minLength,
      maxLength: this._maxLength,
      pattern: this._pattern,
      validate: Object.keys(validates).length ? validates : undefined,
    }
  }
}

// ─── Number validator ─────────────────────────────────────────────────────────

export class NumberValidator extends BaseValidator<NumberValidator> {
  private _min?: { value: number; message: string }
  private _max?: { value: number; message: string }
  private _maxLength?: { value: number; message: string }
  private _mustBeNumber = false

  mustBe(_type: 'number'): NumberValidator {
    this._mustBeNumber = true
    return this
  }

  min(value: number, message?: string): NumberValidator {
    this._min = { value, message: message ?? `Minimum value is ${value}` }
    return this
  }

  max(value: number, message?: string): NumberValidator {
    this._max = { value, message: message ?? `Maximum value is ${value}` }
    return this
  }

  between(min: number, max: number, message?: string): NumberValidator {
    this._min = { value: min, message: message ?? `Must be between ${min} and ${max}` }
    this._max = { value: max, message: message ?? `Must be between ${min} and ${max}` }
    return this
  }

  length(digits: number, message?: string): NumberValidator {
    this._maxLength = { value: digits, message: message ?? `Must be ${digits} digits` }
    this._validates['exactLength'] = (v) => {
      const s = String(v ?? '').replace(/\D/g, '')
      return s.length === digits || (message ?? `Must be exactly ${digits} digits`)
    }
    return this
  }

  positive(message?: string): NumberValidator {
    this._min = { value: 0, message: message ?? 'Must be a positive number' }
    return this
  }

  integer(message?: string): NumberValidator {
    this._validates['integer'] = (v) =>
      Number.isInteger(Number(v)) || (message ?? 'Must be a whole number')
    return this
  }

  nonZero(message?: string): NumberValidator {
    this._validates['nonZero'] = (v) =>
      Number(v) !== 0 || (message ?? 'Cannot be zero')
    return this
  }

  negative(message?: string): NumberValidator {
    this._max = { value: 0, message: message ?? 'Must be a negative number' }
    return this
  }

  multipleOf(factor: number, message?: string): NumberValidator {
    this._validates['multipleOf'] = (v) =>
      Number(v) % factor === 0 || (message ?? `Must be a multiple of ${factor}`)
    return this
  }

  compile(): CompiledRules {
    const validates = { ...this._validates }
    if (this._mustBeNumber) {
      validates['mustBeNumber'] = (v) => !isNaN(Number(v)) || 'Must be a number'
    }
    return {
      required: this._required || undefined,
      min: this._min,
      max: this._max,
      maxLength: this._maxLength,
      validate: Object.keys(validates).length ? validates : undefined,
    }
  }
}

// ─── Email validator ──────────────────────────────────────────────────────────

export class EmailValidator extends BaseValidator<EmailValidator> {
  private static EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  mustBe(_type: 'string'): EmailValidator { return this }

  shouldMatch(pattern: RegExp, message?: string): EmailValidator {
    this._validates['pattern'] = (v) =>
      pattern.test(String(v ?? '')) || (message ?? 'Invalid email format')
    return this
  }

  domain(allowedDomains: string[], message?: string): EmailValidator {
    this._validates['domain'] = (v) => {
      const domain = String(v ?? '').split('@')[1] ?? ''
      return allowedDomains.includes(domain) || (message ?? `Email must be from: ${allowedDomains.join(', ')}`)
    }
    return this
  }

  blockedDomains(blocked: string[], message?: string): EmailValidator {
    this._validates['blockedDomains'] = (v) => {
      const domain = String(v ?? '').split('@')[1] ?? ''
      return !blocked.includes(domain) || (message ?? `Email from ${domain} is not allowed`)
    }
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      pattern: { value: EmailValidator.EMAIL_RE, message: 'Enter a valid email address' },
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── URL validator ────────────────────────────────────────────────────────────

export class UrlValidator extends BaseValidator<UrlValidator> {
  private static URL_RE = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

  mustBe(_type: 'string'): UrlValidator { return this }

  httpsOnly(message?: string): UrlValidator {
    this._validates['httpsOnly'] = (v) =>
      String(v ?? '').startsWith('https://') || (message ?? 'URL must use HTTPS')
    return this
  }

  allowedDomains(domains: string[], message?: string): UrlValidator {
    this._validates['allowedDomains'] = (v) => {
      try {
        const hostname = new URL(String(v ?? '')).hostname
        return domains.some((d) => hostname === d || hostname.endsWith(`.${d}`)) ||
          (message ?? `URL must be from: ${domains.join(', ')}`)
      } catch { return message ?? 'Invalid URL' }
    }
    return this
  }

  noTrailingSlash(message?: string): UrlValidator {
    this._validates['noTrailingSlash'] = (v) =>
      !String(v ?? '').endsWith('/') || (message ?? 'URL must not end with a slash')
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      pattern: { value: UrlValidator.URL_RE, message: 'Enter a valid URL' },
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── Tel / Phone validator ────────────────────────────────────────────────────

export class TelValidator extends BaseValidator<TelValidator> {
  length(digits: number, message?: string): TelValidator {
    this._validates['length'] = (v) => {
      const s = String(v ?? '').replace(/\D/g, '')
      return s.length === digits || (message ?? `Must be exactly ${digits} digits`)
    }
    return this
  }

  minLength(digits: number, message?: string): TelValidator {
    this._validates['minLength'] = (v) => {
      const s = String(v ?? '').replace(/\D/g, '')
      return s.length >= digits || (message ?? `Must be at least ${digits} digits`)
    }
    return this
  }

  maxLength(digits: number, message?: string): TelValidator {
    this._validates['maxLength'] = (v) => {
      const s = String(v ?? '').replace(/\D/g, '')
      return s.length <= digits || (message ?? `Must be at most ${digits} digits`)
    }
    return this
  }

  shouldMatch(pattern: RegExp, message?: string): TelValidator {
    this._validates['pattern'] = (v) =>
      pattern.test(String(v ?? '')) || (message ?? 'Invalid phone number format')
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── Boolean validator ────────────────────────────────────────────────────────

export class BooleanValidator extends BaseValidator<BooleanValidator> {
  mustBeTrue(message?: string): BooleanValidator {
    this._validates['mustBeTrue'] = (v) =>
      v === true || (message ?? 'Must be checked')
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      validate: Object.keys(this._validates).length ? this._validates : undefined,
    }
  }
}

// ─── Array validator ──────────────────────────────────────────────────────────

export class ArrayValidator extends BaseValidator<ArrayValidator> {
  private _min?: number
  private _max?: number

  minItems(count: number, message?: string): ArrayValidator {
    this._min = count
    this._validates['minItems'] = (v) => {
      const arr = Array.isArray(v) ? v : []
      return arr.length >= count || (message ?? `Select at least ${count} item${count > 1 ? 's' : ''}`)
    }
    return this
  }

  maxItems(count: number, message?: string): ArrayValidator {
    this._max = count
    this._validates['maxItems'] = (v) => {
      const arr = Array.isArray(v) ? v : []
      return arr.length <= count || (message ?? `Select at most ${count} item${count > 1 ? 's' : ''}`)
    }
    return this
  }

  exactItems(count: number, message?: string): ArrayValidator {
    this._validates['exactItems'] = (v) => {
      const arr = Array.isArray(v) ? v : []
      return arr.length === count || (message ?? `Must select exactly ${count} item${count > 1 ? 's' : ''}`)
    }
    return this
  }

  noEmpty(message?: string): ArrayValidator {
    this._validates['noEmpty'] = (v) => {
      const arr = Array.isArray(v) ? v as string[] : []
      return arr.every((item) => String(item).trim().length > 0) || (message ?? 'Items cannot be empty')
    }
    return this
  }

  shouldBeIn(list: string[], message?: string): ArrayValidator {
    this._validates['shouldBeIn'] = (v) => {
      const arr = Array.isArray(v) ? v as string[] : []
      const invalid = arr.filter((item) => !list.includes(item))
      return invalid.length === 0 || (message ?? `Invalid selection: ${invalid.join(', ')}`)
    }
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── Password validator ───────────────────────────────────────────────────────

export class PasswordValidator extends BaseValidator<PasswordValidator> {
  private _minLength?: { value: number; message: string }
  private _maxLength?: { value: number; message: string }

  minLength(len: number, message?: string): PasswordValidator {
    this._minLength = { value: len, message: message ?? `Minimum ${len} characters required` }
    return this
  }

  maxLength(len: number, message?: string): PasswordValidator {
    this._maxLength = { value: len, message: message ?? `Maximum ${len} characters allowed` }
    return this
  }

  hasUppercase(message?: string): PasswordValidator {
    this._validates['hasUppercase'] = (v) =>
      /[A-Z]/.test(String(v ?? '')) || (message ?? 'Must contain at least one uppercase letter')
    return this
  }

  hasLowercase(message?: string): PasswordValidator {
    this._validates['hasLowercase'] = (v) =>
      /[a-z]/.test(String(v ?? '')) || (message ?? 'Must contain at least one lowercase letter')
    return this
  }

  hasDigit(message?: string): PasswordValidator {
    this._validates['hasDigit'] = (v) =>
      /\d/.test(String(v ?? '')) || (message ?? 'Must contain at least one number')
    return this
  }

  hasSpecialChar(message?: string): PasswordValidator {
    this._validates['hasSpecialChar'] = (v) =>
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(String(v ?? '')) ||
      (message ?? 'Must contain at least one special character')
    return this
  }

  noSpaces(message?: string): PasswordValidator {
    this._validates['noSpaces'] = (v) =>
      !/\s/.test(String(v ?? '')) || (message ?? 'Password cannot contain spaces')
    return this
  }

  /** Confirm this field matches another field value — pass a getter for the other field */
  confirmMatch(getOtherValue: () => unknown, message?: string): PasswordValidator {
    this._validates['confirmMatch'] = (v) =>
      v === getOtherValue() || (message ?? 'Passwords do not match')
    return this
  }

  /** Shorthand: minLength(8) + uppercase + lowercase + digit + special char */
  strong(message?: string): PasswordValidator {
    return this.minLength(8, message).hasUppercase(message).hasLowercase(message).hasDigit(message).hasSpecialChar(message)
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      minLength: this._minLength,
      maxLength: this._maxLength,
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── Date validator ───────────────────────────────────────────────────────────

export class DateValidator extends BaseValidator<DateValidator> {
  private _toDate(v: unknown): Date | null {
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v
    if (typeof v === 'string' || typeof v === 'number') {
      const d = new Date(v as string | number)
      return isNaN(d.getTime()) ? null : d
    }
    return null
  }

  validDate(message?: string): DateValidator {
    this._validates['validDate'] = (v) =>
      this._toDate(v) !== null || (message ?? 'Must be a valid date')
    return this
  }

  minDate(date: Date, message?: string): DateValidator {
    this._validates['minDate'] = (v) => {
      const d = this._toDate(v)
      if (!d) return 'Invalid date'
      return d >= date || (message ?? `Date must be on or after ${date.toLocaleDateString()}`)
    }
    return this
  }

  maxDate(date: Date, message?: string): DateValidator {
    this._validates['maxDate'] = (v) => {
      const d = this._toDate(v)
      if (!d) return 'Invalid date'
      return d <= date || (message ?? `Date must be on or before ${date.toLocaleDateString()}`)
    }
    return this
  }

  notInPast(message?: string): DateValidator {
    this._validates['notInPast'] = (v) => {
      const d = this._toDate(v)
      if (!d) return 'Invalid date'
      const today = new Date(); today.setHours(0, 0, 0, 0)
      return d >= today || (message ?? 'Date cannot be in the past')
    }
    return this
  }

  notInFuture(message?: string): DateValidator {
    this._validates['notInFuture'] = (v) => {
      const d = this._toDate(v)
      if (!d) return 'Invalid date'
      const today = new Date(); today.setHours(23, 59, 59, 999)
      return d <= today || (message ?? 'Date cannot be in the future')
    }
    return this
  }

  between(minDate: Date, maxDate: Date, message?: string): DateValidator {
    return this.minDate(minDate, message).maxDate(maxDate, message)
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── Select validator (select / radio) ───────────────────────────────────────

export class SelectValidator extends BaseValidator<SelectValidator> {
  shouldBeIn(list: string[], message?: string): SelectValidator {
    this._validates['shouldBeIn'] = (v) =>
      list.includes(String(v ?? '')) || (message ?? `Must be one of: ${list.join(', ')}`)
    return this
  }

  notEmpty(message?: string): SelectValidator {
    this._validates['notEmpty'] = (v) =>
      (String(v ?? '').trim().length > 0) || (message ?? 'Please make a selection')
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── File validator ───────────────────────────────────────────────────────────

export class FileValidator extends BaseValidator<FileValidator> {
  /** Max file size in bytes */
  maxSize(bytes: number, message?: string): FileValidator {
    this._validates['maxSize'] = (v) => {
      const files = Array.isArray(v) ? v as File[] : v instanceof File ? [v] : []
      const tooBig = files.filter((f) => f.size > bytes)
      if (tooBig.length === 0) return true
      const mb = (bytes / 1024 / 1024).toFixed(1)
      return message ?? `File size must not exceed ${mb} MB`
    }
    return this
  }

  allowedTypes(mimeTypes: string[], message?: string): FileValidator {
    this._validates['allowedTypes'] = (v) => {
      const files = Array.isArray(v) ? v as File[] : v instanceof File ? [v] : []
      const invalid = files.filter((f) => !mimeTypes.some((t) =>
        t.endsWith('/*') ? f.type.startsWith(t.replace('/*', '/')) : f.type === t
      ))
      return invalid.length === 0 || (message ?? `Allowed types: ${mimeTypes.join(', ')}`)
    }
    return this
  }

  allowedExtensions(exts: string[], message?: string): FileValidator {
    this._validates['allowedExtensions'] = (v) => {
      const files = Array.isArray(v) ? v as File[] : v instanceof File ? [v] : []
      const invalid = files.filter((f) => {
        const ext = f.name.split('.').pop()?.toLowerCase() ?? ''
        return !exts.map((e) => e.toLowerCase().replace('.', '')).includes(ext)
      })
      return invalid.length === 0 || (message ?? `Allowed extensions: ${exts.join(', ')}`)
    }
    return this
  }

  maxFiles(count: number, message?: string): FileValidator {
    this._validates['maxFiles'] = (v) => {
      const files = Array.isArray(v) ? v : v instanceof File ? [v] : []
      return files.length <= count || (message ?? `Maximum ${count} file${count > 1 ? 's' : ''} allowed`)
    }
    return this
  }

  minFiles(count: number, message?: string): FileValidator {
    this._validates['minFiles'] = (v) => {
      const files = Array.isArray(v) ? v : v instanceof File ? [v] : []
      return files.length >= count || (message ?? `At least ${count} file${count > 1 ? 's' : ''} required`)
    }
    return this
  }

  compile(): CompiledRules {
    return {
      required: this._required || undefined,
      validate: Object.keys(this._validates).length ? { ...this._validates } : undefined,
    }
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export const v = {
  /** text, textarea fields — lengthBetween, shouldMatch, shouldBeIn, noSpaces, alphanumeric */
  string: () => new StringValidator(),
  /** number fields — between, integer, multipleOf, nonZero, length */
  number: () => new NumberValidator(),
  /** password fields — strong(), hasUppercase, hasDigit, hasSpecialChar, confirmMatch */
  password: () => new PasswordValidator(),
  /** email fields — auto email regex, domain whitelist/blacklist */
  email: () => new EmailValidator(),
  /** url fields — httpsOnly, allowedDomains, noTrailingSlash */
  url: () => new UrlValidator(),
  /** tel/phone fields — length, minLength, maxLength, shouldMatch */
  tel: () => new TelValidator(),
  /** DatePicker fields — minDate, maxDate, notInPast, notInFuture */
  date: () => new DateValidator(),
  /** select/radio fields — shouldBeIn, notEmpty */
  select: () => new SelectValidator(),
  /** checkbox/switch fields — mustBeTrue */
  boolean: () => new BooleanValidator(),
  /** multiselect/chipselect/taginput — minItems, maxItems, exactItems, shouldBeIn, noEmpty */
  array: () => new ArrayValidator(),
  /** FileUpload fields — maxSize, allowedTypes, allowedExtensions, maxFiles, minFiles */
  file: () => new FileValidator(),
}

export type AnyValidator =
  | StringValidator
  | NumberValidator
  | PasswordValidator
  | EmailValidator
  | UrlValidator
  | TelValidator
  | DateValidator
  | SelectValidator
  | BooleanValidator
  | ArrayValidator
  | FileValidator
