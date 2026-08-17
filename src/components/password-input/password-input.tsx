import type { FC } from 'react'
import { useState, useEffect } from 'react'
import type { BaseInputProps } from '@/shared/utils/input-types'
import { BaseInputWrapper, getAriaDescribedBy } from '@/shared/features/base-input-wrapper/base-input-wrapper'
import { useInputState } from '@/shared/hooks/use-input-state'
import { Icon } from '@/components/icon/icon'
import styles from './styles/password-input.module.scss'

export interface PasswordInputProps extends BaseInputProps {
  /** Whether to show the visibility toggle button. @default true */
  allowToggle?: boolean
}

export const PasswordInput: FC<PasswordInputProps> = ({
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
  allowToggle = true,
  ...rest
}) => {
  const { currentValue, handleChange } = useInputState(value, initialValue, onChange)
  const [showPassword, setShowPassword] = useState(false)
  const showToggle = allowToggle && !disabled

  // Reset visibility when the toggle becomes unavailable
  useEffect(() => {
    if (!showToggle) setShowPassword(false)
  }, [showToggle])

  const classNames = `${styles['input']} ${styles[size]}${errorMessage ? ` ${styles['error']}` : ''}${showToggle ? ` ${styles['with-toggle']}` : ''}${className ? ` ${className}` : ''}`

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
      <div className={styles['input-container']}>
        <input
          {...rest}
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={classNames}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={!!errorMessage || undefined}
          aria-describedby={getAriaDescribedBy(id, errorMessage, description)}
        />
        {showToggle && (
          <button
            type="button"
            className={`${styles['toggle']} ${styles[size]}`}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-controls={id}
          >
            <Icon
              name={showPassword ? 'EyeClosed' : 'EyeOpen'}
              size={size === 'md' ? 20 : 16}
              color="currentColor"
            />
          </button>
        )}
      </div>
    </BaseInputWrapper>
  )
}
