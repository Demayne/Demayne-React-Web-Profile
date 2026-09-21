/** @type {import('tailwindcss').Config} */

// Type scale: a 1.25 ratio stepping from 0.9rem. Use fs-* for fixed sizes; fluid
// roles (hero, display, mail...) are composed from the same steps in index.css.
const scale = {
  'fs-0': '0.9rem',
  'fs-1': '1.12rem',
  'fs-2': '1.4rem',
  'fs-3': '1.75rem',
  'fs-4': '2.19rem',
  'fs-5': '2.73rem',
  'fs-6': '3.42rem',
  'fs-7': '4.27rem',
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          800: '#0E0E0E',
          700: '#131313',
        },
        line: {
          DEFAULT: '#1F1F1F',
          strong: '#2F2F2F',
        },
        fg: {
          DEFAULT: '#F5F5F5',
          soft: '#C5C5C5',
          faint: '#8A8A8A',
        },
        accent: {
          DEFAULT: '#FF8A3D',
          soft: '#FFC49C',
          deep: '#B8541A',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        ...scale,
        'label-lg': ['0.72rem', { letterSpacing: '0.32em' }],
        'label-sm': ['0.66rem', { letterSpacing: '0.28em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        site: '88rem',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.95' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.8)' },
        },
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.2s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
