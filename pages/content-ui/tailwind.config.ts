import baseConfig from '@extension/tailwindcss-config';
import { withUI } from '@extension/ui';

export default withUI({
  ...baseConfig,
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      typography: {
        sm: {
          css: {
            fontSize: '1rem',
            h1: {
              fontSize: '1.5rem',
            },
            h2: {
              fontSize: '1.25rem',
            },
            h3: {
              fontSize: '1.125rem',
            },
            h4: {
              fontSize: '1rem',
            },
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
});
