import { useState, type FC } from 'react'
import type { InputSize } from '@/shared/utils/input-types'
import { BaseInputWrapper, getDescriptionId, getErrorId } from '@/shared/features/base-input-wrapper/base-input-wrapper'
import styles from './styles/number-input.module.scss'

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'type' | 'value'> {
  /** ID of the input element — used for the label's `htmlFor` and `aria-describedby` linking. */
  id: string
  /** Controls the input value. If provided, the consumer manages state — `onChange` must also be provided, otherwise the input will be read-only. */
  value?: string
  /** Initial value for uncontrolled mode. Ignored when `value` is provided. */
  initialValue?: string
  /** Called with the new value whenever the input changes. */
  onChange?: (value: string) => void
  /** Label text rendered above the input and linked to it via `htmlFor`. */
  label?: string
  /** Shows the required asterisk (*) next to the label. Only has effect when `required` is true. @default true */
  showRequiredIndicator?: boolean
  /** Helper text shown below the input. Hidden when `errorMessage` is set. */
  description?: string
  /** Error text shown below the input in red. Takes priority over `description`. */
  errorMessage?: string
  /** Controls the visual size of the input. @default 'md' */
  size?: InputSize
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
  ...rest
}) => {
  const isExternallyControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(initialValue)
  const currentValue = isExternallyControlled ? value : internalValue

  const handleChange = (newValue: string) => {
    if (!isExternallyControlled) setInternalValue(newValue)
    onChange?.(newValue)
  }

  const describedBy = errorMessage ? getErrorId(id) : description ? getDescriptionId(id) : undefined
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
        aria-describedby={describedBy}
      />
    </BaseInputWrapper>
  )
}
