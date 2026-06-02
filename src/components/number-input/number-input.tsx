import type { FC } from 'react'
import type { BaseInputProps } from '@/shared/utils/input-types'
import { BaseInputWrapper, getAriaDescribedBy } from '@/shared/features/base-input-wrapper/base-input-wrapper'
import { useInputState } from '@/shared/hooks/use-input-state'
import styles from './styles/number-input.module.scss'

export interface NumberInputProps extends BaseInputProps {
  /** Maximum number of decimal places allowed. Values with more decimals are trimmed on change. */
  maxDecimals?: number
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
  ...rest
}) => {
  const { currentValue, handleChange: updateValue } = useInputState(value, initialValue, onChange)

  const handleChange = (newValue: string) => {
    if (maxDecimals !== undefined) {
      const dotIndex = newValue.indexOf('.')
      if (dotIndex !== -1 && newValue.length - dotIndex - 1 > maxDecimals) {
        newValue = newValue.slice(0, dotIndex + maxDecimals + 1)
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
        {...rest}
        id={id}
        type="number"
        className={classNames}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={!!errorMessage || undefined}
        aria-describedby={getAriaDescribedBy(id, errorMessage, description)}
      />
    </BaseInputWrapper>
  )
}
