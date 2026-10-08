/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
      },
      colors: {
        health: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'row-flash': {
          '0%': { boxShadow: '0 0 0 0 rgba(22, 163, 74, 0.55)' },
          '100%': { boxShadow: '0 0 0 10px rgba(22, 163, 74, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.25s ease-out both',
        'toast-in': 'toast-in 0.2s ease-out both',
        'row-flash': 'row-flash 1.1s ease-out',
      },
    },
  },
  plugins: [],
}
