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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'progress': 'progress 1.5s ease-in-out infinite',
        'toast-in': 'toastIn 0.3s ease-out',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%', marginLeft: '0' },
          '50%': { width: '60%', marginLeft: '20%' },
          '100%': { width: '0%', marginLeft: '100%' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
