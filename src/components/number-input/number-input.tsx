import type { FC } from 'react'
import { useRef } from 'react'
import type { BaseInputProps } from '@/shared/utils/input-types'
import { BaseInputWrapper, getAriaDescribedBy } from '@/shared/features/base-input-wrapper/base-input-wrapper'
import { useInputState } from '@/shared/hooks/use-input-state'
import styles from './styles/number-input.module.scss'

export interface NumberInputProps extends BaseInputProps {
  /** Maximum number of decimal places allowed. Values with more decimals are trimmed on change. */
  maxDecimals?: number
  /** When false, negative values are stripped on change. @default true */
  allowNegative?: boolean
}

export const NumberInput: FC<NumberInputProps> = ({
  id,
  value,
  initialValue = '',
  onChange,
  className,
  disabled = false,
  label,
  required = false,
  showRequiredIndicator = true,
  description,
  errorMessage,
  size = 'md',
  maxDecimals,
  allowNegative = true,
  ...rest
}) => {
  const { currentValue, handleChange: updateValue } = useInputState(value, initialValue, onChange)
  const showingLeadingMinus = useRef(false)
  const { onKeyDown: consumerOnKeyDown, ...inputRest } = rest

  /** Blocks invalid `-` presses at the key level — necessary because type="number" hides intermediate states from onChange. */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-') {
      if (!allowNegative || e.currentTarget.value !== '' || showingLeadingMinus.current) {
        e.preventDefault()
      } else {
        showingLeadingMinus.current = true
      }
    } else if ((e.key === 'Backspace' || e.key === 'Delete') && e.currentTarget.value === '') {
      showingLeadingMinus.current = false
    }
    // If user passed an `onKeyDown`, that's after the `-` logic
    consumerOnKeyDown?.(e)
  }

  /** Sanitizes the raw string value before committing — strips negatives, trims decimals, syncs the leading-minus ref. */
  const handleChange = (newValue: string) => {
    if (!allowNegative) newValue = newValue.replace(/^-+/, '')
    if (newValue !== '' && !newValue.startsWith('-')) showingLeadingMinus.current = false
    if (maxDecimals !== undefined) {
      const dotIndex = newValue.indexOf('.')
      if (dotIndex !== -1) {
        if (maxDecimals === 0) {
          newValue = newValue.slice(0, dotIndex)
        } else if (newValue.length - dotIndex - 1 > maxDecimals) {
          newValue = newValue.slice(0, dotIndex + maxDecimals + 1)
        }
      }
    }
    updateValue(newValue)
  }

  const classNames = `${styles['input']} ${styles[size]}${errorMessage ? ` ${styles['error']}` : ''}${className ? ` ${className}` : ''}`

  return (
    <BaseInputWrapper
      inputId={id}
      label={label}
      required={required}
      showRequiredIndicator={showRequiredIndicator}
      description={description}
      errorMessage={errorMessage}
      size={size}
    >
      <input
        {...inputRest}
        id={id}
        type="number"
        className={classNames}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={!!errorMessage || undefined}
        aria-describedby={getAriaDescribedBy(id, errorMessage, description)}
      />
    </BaseInputWrapper>
  )
}
