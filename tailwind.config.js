/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0066CC', // Primary Blue
          800: '#0c4a6e',
          900: '#082f49',
        },
        // Success (Green)
        success: '#22C55E',
        successLight: '#dcfce7',
        // Warning (Orange)
        warning: '#F97316',
        warningLight: '#ffedd5',
        // Danger (Red)
        danger: '#EF4444',
        dangerLight: '#fee2e2',
        // Neutral
        neutral: {
          50: '#FFFFFF',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // Medium Gray
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937', // Dark Gray
          900: '#111827',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.3', letterSpacing: '0.2px' }],
        sm: ['12px', { lineHeight: '1.4', letterSpacing: '0.3px' }],
        base: ['14px', { lineHeight: '1.5', letterSpacing: '0px' }],
        lg: ['16px', { lineHeight: '1.6', letterSpacing: '0px' }],
        xl: ['18px', { lineHeight: '1.4', letterSpacing: '0px' }],
        '2xl': ['24px', { lineHeight: '1.3', letterSpacing: '-0.3px' }],
        '3xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
      },
      boxShadow: {
        flat: 'none',
        elevated: '0 1px 3px rgba(0, 0, 0, 0.1)',
        floating: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
};
