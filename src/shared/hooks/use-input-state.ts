import { useState } from 'react'

/**
 * Manages controlled/uncontrolled state for input components.
 * When `value` is provided the input is externally controlled — internal state is ignored.
 * When `value` is omitted the input manages its own state, seeded by `initialValue`.
 * `onChange` is always called on every change regardless of mode.
 */
export const useInputState = (
  value: string | undefined,
  initialValue: string,
  onChange?: (value: string) => void,
) => {
  const isExternallyControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(initialValue)
  const currentValue = isExternallyControlled ? value : internalValue

  const handleChange = (newValue: string) => {
    if (!isExternallyControlled) setInternalValue(newValue)
    onChange?.(newValue)
  }

  return { currentValue, handleChange }
}
