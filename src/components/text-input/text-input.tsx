import type { FC } from 'react'
import type { BaseInputProps } from '@/shared/utils/input-types'
import { BaseInputWrapper, getAriaDescribedBy } from '@/shared/features/base-input-wrapper/base-input-wrapper'
import { useInputState } from '@/shared/hooks/use-input-state'
import styles from './styles/text-input.module.scss'

export type TextInputProps = BaseInputProps

export const TextInput: FC<TextInputProps> = ({
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
  const { currentValue, handleChange } = useInputState(value, initialValue, onChange)
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
        type="text"
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
