import type { FC, ReactNode } from 'react'
import type { InputSize } from '@/shared/utils/input-types'
import styles from './base-input-wrapper.module.scss'

/** Returns the `id` used on the description span — pass to `aria-describedby` on the input. */
export const getDescriptionId = (inputId: string) => `${inputId}-description`

/** Returns the `id` used on the error span — pass to `aria-describedby` on the input. */
export const getErrorId = (inputId: string) => `${inputId}-error`

/** Returns the correct `aria-describedby` value — error id when errored, description id when description exists, otherwise undefined. */
export const getAriaDescribedBy = (inputId: string, errorMessage?: string, description?: string): string | undefined =>
  errorMessage ? getErrorId(inputId) : description ? getDescriptionId(inputId) : undefined

export interface BaseInputWrapperProps {
  /** ID of the input element — used for the label's `htmlFor`. */
  inputId: string
  /** Label text rendered above the input and linked to it via `htmlFor`. */
  label?: string
  /** Marks the field as required. Pass to the underlying input as `required` and `aria-required`. @default false */
  required?: boolean
  /** Shows the required asterisk (*) next to the label. Only has effect when `required` is true. @default true */
  showRequiredIndicator?: boolean
  /** Helper text shown below the input. Hidden when `errorMessage` is set. */
  description?: string
  /** Error text shown below the input in red. Takes priority over `description`. */
  errorMessage?: string
  /** Controls the visual size of the input. @default 'md' */
  size?: InputSize
  /** The input element rendered inside the wrapper. */
  children: ReactNode
}

export const BaseInputWrapper: FC<BaseInputWrapperProps> = ({
  inputId,
  label,
  required = false,
  showRequiredIndicator = true,
  description,
  errorMessage,
  size = 'md',
  children,
}) => (
  <div className={`${styles['wrapper']} ${styles[size]}`}>
    {label && (
      <label htmlFor={inputId} className={styles['label']}>
        {label}
        {required && showRequiredIndicator && (
          <span className={styles['required']} aria-hidden="true">*</span>
        )}
      </label>
    )}
    <div className={styles['input-and-desc']}>
      {children}
      {errorMessage
        ? <span id={getErrorId(inputId)} className={styles['error-message']}>{errorMessage}</span>
        : description && <span id={getDescriptionId(inputId)} className={styles['description']}>{description}</span>
      }
    </div>
  </div>
)
