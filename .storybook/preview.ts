import type { Preview } from '@storybook/react'
import '../src/styles.css'
import '../src/theme/defaultTokens.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--color-background, #f8fafc)' },
        { name: 'dark', value: '#0f172a' },
        { name: 'surface', value: 'var(--color-surface, #ffffff)' },
      ],
    },
  },
}

export default preview
