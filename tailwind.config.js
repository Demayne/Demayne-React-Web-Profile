/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
        },
        accent: {
          DEFAULT: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md-soft': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg-soft': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl-soft': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'shine': 'shine 3s infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

