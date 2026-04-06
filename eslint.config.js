import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { version } from 'react'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.config.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023, // Should match `target` in tsconfigs.
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactPlugin.config.recommended.rules,
      ...reactHooks.config.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Need this since we won't be importing React in every file --> "jsx": "react-jsx" in tsconfig
    },
    settings: {
      react: {
        version: 'detect' // auto-detects installed version
      }
    }
  }
)