import React, { useId, useState, useEffect } from 'react'
import { cn } from '../../../utils/cn'

export interface CountryCode {
  code: string
  dialCode: string
  flag: string
  name: string
}

export const DEFAULT_COUNTRY_CODES: CountryCode[] = [
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'CN', dialCode: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'BR', dialCode: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'MX', dialCode: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: 'ZA', dialCode: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NG', dialCode: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: 'SG', dialCode: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'KR', dialCode: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: 'IT', dialCode: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', dialCode: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'RU', dialCode: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: 'PK', dialCode: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'BD', dialCode: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'ID', dialCode: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'TR', dialCode: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: 'SA', dialCode: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'NL', dialCode: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'CH', dialCode: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'SE', dialCode: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', dialCode: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: 'PL', dialCode: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: 'AR', dialCode: '+54', flag: '🇦🇷', name: 'Argentina' },
]

export type PhoneInputSize = 'sm' | 'md' | 'lg'

export interface PhoneInputValue {
  countryCode: CountryCode
  number: string
  /** Full value e.g. "+91 9876543210" */
  full: string
}

export interface PhoneInputProps {
  value?: PhoneInputValue
  defaultCountry?: string
  onChange?: (value: PhoneInputValue) => void
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: PhoneInputSize
  fullWidth?: boolean
  maxLength?: number
  showMaxLength?: boolean
  countryCodes?: CountryCode[]
  className?: string
  containerClassName?: string
  id?: string
}

const sizeClasses: Record<PhoneInputSize, string> = {
  sm: 'h-8 text-sm',
  md: 'h-9 text-sm',
  lg: 'h-11 text-base',
}

const dialSelectSizes: Record<PhoneInputSize, string> = {
  sm: 'text-sm px-1.5',
  md: 'text-sm px-2',
  lg: 'text-base px-2.5',
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({
    value: controlledValue,
    defaultCountry = 'US',
    onChange,
    label,
    helperText,
    error,
    placeholder = 'Phone number',
    disabled = false,
    required = false,
    size = 'md',
    fullWidth = false,
    maxLength,
    showMaxLength = false,
    countryCodes = DEFAULT_COUNTRY_CODES,
    className,
    containerClassName,
    id: externalId,
  }, ref) => {
    const generatedId = useId()
    const id = externalId ?? generatedId

    const defaultCC = countryCodes.find((c) => c.code === defaultCountry) ?? countryCodes[0]
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
      controlledValue?.countryCode ?? defaultCC
    )
    const [phoneNumber, setPhoneNumber] = useState(controlledValue?.number ?? '')

    useEffect(() => {
      if (controlledValue?.countryCode) {
        setSelectedCountry(controlledValue.countryCode)
      }
    }, [controlledValue?.countryCode])

    useEffect(() => {
      if (controlledValue?.number !== undefined) {
        setPhoneNumber(controlledValue.number)
      }
    }, [controlledValue?.number])

    const activeCountry = controlledValue?.countryCode ?? selectedCountry
    const activeNumber = controlledValue?.number ?? phoneNumber

    const buildValue = (country: CountryCode, number: string): PhoneInputValue => ({
      countryCode: country,
      number,
      full: `${country.dialCode} ${number}`.trim(),
    })

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const country = countryCodes.find((c) => c.code === e.target.value) ?? defaultCC
      setSelectedCountry(country)
      onChange?.(buildValue(country, activeNumber))
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d\s\-().+]/g, '')
      if (maxLength !== undefined && raw.replace(/\D/g, '').length > maxLength) return
      setPhoneNumber(raw)
      onChange?.(buildValue(activeCountry, raw))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'Home', 'End',
        ' ', '-', '(', ')', '.', '+',
      ]
      if (allowed.includes(e.key)) return
      if (e.ctrlKey || e.metaKey) return
      if (!/^\d$/.test(e.key)) e.preventDefault()
    }

    const height = sizeClasses[size]
    const dialSize = dialSelectSizes[size]

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text">
            {label}{required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div
          className={cn(
            'flex items-stretch rounded-md border overflow-hidden bg-surface transition-colors',
            'focus-within:border-border-focus focus-within:ring-2 focus-within:ring-border-focus/20',
            error ? 'border-error focus-within:border-error focus-within:ring-error/20' : 'border-border',
            disabled && 'opacity-50 cursor-not-allowed',
            fullWidth && 'w-full',
          )}
        >
          {/* Country code selector */}
          <select
            value={activeCountry.code}
            onChange={handleCountryChange}
            disabled={disabled}
            aria-label="Country code"
            className={cn(
              'border-r border-border bg-surface-hover text-text cursor-pointer outline-none',
              'appearance-none focus:outline-none',
              height,
              dialSize,
            )}
            style={{ minWidth: size === 'sm' ? 72 : size === 'lg' ? 96 : 84 }}
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.dialCode}
              </option>
            ))}
          </select>

          {/* Phone number input */}
          <input
            ref={ref}
            id={id}
            type="tel"
            inputMode="tel"
            value={activeNumber}
            onChange={handleNumberChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            aria-invalid={!!error}
            className={cn(
              'flex-1 bg-transparent text-text placeholder:text-text-muted outline-none px-3',
              'disabled:cursor-not-allowed',
              height,
              className,
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            {error && <p className="text-xs text-error" role="alert">{error}</p>}
            {!error && helperText && <p className="text-xs text-text-muted">{helperText}</p>}
          </div>
          {showMaxLength && maxLength !== undefined && (
            <p className={cn(
              'text-xs text-text-muted ml-auto',
              activeNumber.replace(/\D/g, '').length >= maxLength && 'text-error'
            )}>
              {activeNumber.replace(/\D/g, '').length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'
