import { createContext, useContext, useState, type FC, type ReactNode } from "react"

/** Validation function for a form input. Return an empty string if valid, or an error message string if invalid. */
export type ErrorCallback = (value: string) => string

interface InputState {
  value: string
  errorMessage: string
  isDirty: boolean
  errorCallbacks: ErrorCallback[]
}

type FormInputStatesMap = Record<string, InputState>

/** Options passed when registering an input with the form. */
export interface RegisterInputOptions {
  /** Validation callbacks to run when the input value changes or the form is submitted. */
  errorCallbacks?: ErrorCallback[]
  /** Initial value for the input. */
  initialValue?: string
}

interface FormContextType {
  /** Current value of every registered input, keyed by inputId. */
  values: Record<string, string>
  /** Current error message of every registered input, keyed by inputId. */
  errorMessages: Record<string, string>
  /** True as soon as any input has been modified. */
  isFormDirty: boolean
  /** Updates the value of a registered input and re-runs validation. Marks the input as dirty. */
  setInputValue: (inputId: string, value: string) => void
  /** Registers an input with the form. No-op if the input is already registered. */
  registerInput: (inputId: string, options?: RegisterInputOptions) => void
  /** Removes an input from the form state. Call on unmount to keep form state clean. */
  deregisterInput: (inputId: string) => void
}

const FormContext = createContext<FormContextType | null>(null)

const validateInput = (inputId: string, value: string, currentInputs: FormInputStatesMap): string => {
  for (const callback of currentInputs[inputId]?.errorCallbacks ?? []) {
    const error = callback(value)
    if (error !== '') return error
  }
  return ''
}

const extractErrorMessages = (inputs: FormInputStatesMap): Record<string, string> =>
  Object.fromEntries(Object.entries(inputs).map(([id, input]) => [id, input.errorMessage]))

const extractValues = (inputs: FormInputStatesMap): Record<string, string> =>
  Object.fromEntries(Object.entries(inputs).map(([id, input]) => [id, input.value]))

/**
 * Sets up form state and logic. Destructure what you need and spread the rest into `FormProvider`.
 *
 * @example
 * const { isFormDirty, ...rest } = useForm()
 * <FormProvider {...rest} handleFormSuccess={...} handleFormError={...}>
 */
export const useForm = () => {
  const [inputs, setInputs] = useState<FormInputStatesMap>({})

  /** Registers an input with the form. No-op if the input is already registered. */
  const registerInput = (inputId: string, options?: RegisterInputOptions) => {
    setInputs(prev => {
      if (prev[inputId]) return prev
      return {
        ...prev,
        [inputId]: {
          value: options?.initialValue ?? '',
          errorMessage: '',
          isDirty: false,
          errorCallbacks: options?.errorCallbacks ?? [],
        },
      }
    })
  }

  /** Updates the value of a registered input and re-runs validation. Marks the input as dirty. */
  const setInputValue = (inputId: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [inputId]: {
        ...prev[inputId],
        value,
        isDirty: true,
        errorMessage: validateInput(inputId, value, prev),
      },
    }))
  }

  /** Removes an input from the form state. Call on unmount to keep form state clean. */
  const deregisterInput = (inputId: string) => {
    setInputs(prev => {
      const remaining = { ...prev }
      delete remaining[inputId]
      return remaining
    })
  }

  /**
   * Validates all inputs, marks them all dirty, then calls `onSuccess` or `onError`,
   * depending on whether all inputs are valid or not.
   * Passed to `FormProvider` — not called directly by consumers.
   */
  const handleSubmit = (
    onSuccess: (values: Record<string, string>) => void,
    onError: (errorMessages: Record<string, string>) => void,
  ) => {
    let hasErrors = false
    const validatedInputs: FormInputStatesMap = {}

    for (const inputId in inputs) {
      const errorMessage = validateInput(inputId, inputs[inputId].value, inputs)
      if (errorMessage !== '') hasErrors = true
      validatedInputs[inputId] = { ...inputs[inputId], isDirty: true, errorMessage }
    }

    setInputs(validatedInputs)

    if (hasErrors) {
      onError(Object.fromEntries(Object.entries(extractErrorMessages(validatedInputs)).filter(([, error]) => error !== '')))
    } else {
      onSuccess(extractValues(validatedInputs))
    }
  }

  const values = extractValues(inputs)
  const errorMessages = extractErrorMessages(inputs)
  const isFormDirty = Object.values(inputs).some(input => input.isDirty)

  return { values, errorMessages, isFormDirty, registerInput, deregisterInput, setInputValue, handleSubmit }
}

interface FormProviderProps extends FormContextType {
  /** Validates all inputs, marks them all dirty, then calls `onSuccess` or `onError`
   * depending on whether all inputs are valid or not. Passed to `FormProvider` — not
   * called directly by consumers.
   */
  handleSubmit: (
    onSuccess: (values: Record<string, string>) => void,
    onError: (errorMessages: Record<string, string>) => void,
  ) => void
  /** Called with all input values when the form is submitted with no validation errors. */
  handleFormSuccess: (values: Record<string, string>) => void
  /** Called with only the errored inputs when the form is submitted with validation errors. */
  handleFormError: (errorMessages: Record<string, string>) => void
  children: ReactNode
}

/**
 * Provides form context to all child inputs and wraps them in a `<form>` element.
 * Use with `useForm` to set up form state.
 *
 * @example
 * const { isFormDirty, ...rest } = useForm()
 * <FormProvider {...rest} handleFormSuccess={...} handleFormError={...}>
 *   <FormInput ... />
 * </FormProvider>
 */
export const FormProvider: FC<FormProviderProps> = ({
  values,
  errorMessages,
  isFormDirty,
  registerInput,
  deregisterInput,
  setInputValue,
  handleSubmit,
  handleFormSuccess,
  handleFormError,
  children,
}) => (
  <FormContext.Provider value={{ values, errorMessages, isFormDirty, registerInput, deregisterInput, setInputValue }}>
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(handleFormSuccess, handleFormError) }}>
      {children}
    </form>
  </FormContext.Provider>
)

/**
 * Returns the form context. Must be used within a `FormProvider`.
 * Used by `FormInput` to read and update form state.
 */
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext)
  if (!context) throw new Error('useFormContext must be used within a FormProvider')
  return context
}
