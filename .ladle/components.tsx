import '@/styles/tokens.scss'
import type { GlobalProvider } from '@ladle/react'

// This file is Ladle's entry point for global set up
// Adding this to import the tokens SCSS file. Without it, none of the tokens are applied on the stories.

export const Provider: GlobalProvider = ({ children }) => {
  return (
    <>{children}</>
  )
}
