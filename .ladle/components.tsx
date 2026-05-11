import '@/styles/tokens.scss'
import type { GlobalProvider } from '@ladle/react'

// This file is Ladle's entry point for global set up

export const Provider: GlobalProvider = ({ children }) => {
  return (
    <>{children}</>
  )
}
