import { colors, fontFamily } from 'cs-design-system';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: colors.ink,
        cloud: colors.cloud,
        slate: colors.slate,
        rust: colors.rust,
        'status-fail': colors['status-fail'],
        'status-pass': colors['status-pass'],
        'status-fail-tint': colors['status-fail-tint'],
        'sage-tint': colors['sage-tint'],
      },
      fontFamily: {
        ...fontFamily,
        nunito: ['Nunito', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
    },
  },
  plugins: [],
}
