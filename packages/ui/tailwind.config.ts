import type { Config } from 'tailwindcss';

export default {
  content: { relative: true, files: ['../../apps/*/src/**/*.{ts,tsx}'] },
  theme: {
    extend: {
      colors: {
        canvas: '#F5F7FA',
        surface: '#FFFFFF',
        ink: {
          900: '#142237',
          600: '#526174',
        },
        brand: {
          50: '#EDF2FF',
          600: '#2456D8',
          700: '#1D46B5',
        },
        success: { 50: '#EAF5EF', 700: '#126447' },
        attention: { 50: '#FFF2D8', 800: '#81520B' },
        error: { 50: '#FDEDF0', 700: '#A82435' },
        divider: '#DCE2EA',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        editorial: ['Georgia', '"Times New Roman"', 'serif'],
      },
      maxWidth: {
        content: '75rem',
        operations: '90rem',
      },
      borderRadius: {
        control: '0.5rem',
        card: '1rem',
        signature: '1.5rem',
      },
      boxShadow: {
        overlay: '0 16px 48px rgb(20 34 55 / 16%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
