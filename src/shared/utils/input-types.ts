export type InputSize = 'md' | 'sm'

export interface SelectOption {
  id: string
  label: string
  value: string
}

/** Base props shared by all input components. Extends HTML input attributes — pass any valid HTML input prop. */
export interface BaseInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'type' | 'value'> {
  /** ID of the input element — links the label via `htmlFor` and wires up description/error accessibility. */
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