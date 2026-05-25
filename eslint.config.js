import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  // JavaScript / JSX files (React components)
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser, React: 'readonly' },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  // TypeScript / TSX files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
