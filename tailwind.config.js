// TailwindCSS configuration
// This file configures TailwindCSS for styling the application.

module.exports = {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/pages/**/*.{js,vue,ts}',
    './src/app/**/*.{js,vue,ts}',
    './src/layouts/**/*.{js,vue,ts}',
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
      spacing: {
        safe: 'max(env(safe-area-inset-bottom), 1rem)',
      },
    },
  },
  plugins: [],
};
