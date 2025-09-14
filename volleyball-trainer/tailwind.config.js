/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        accent: '#f59e0b',
        success: '#22c55e',
        danger: '#ef4444',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

