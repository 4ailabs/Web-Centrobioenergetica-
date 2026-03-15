/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fafa',
          100: '#d6f0ef',
          200: '#b0e3e1',
          300: '#7dcfcc',
          400: '#4ab8b3',
          500: '#2bb4ae',
          600: '#20a39e',
          700: '#1a8a86',
          800: '#145a58',
          900: '#104948',
        },
        neutral: {
          50: '#F9F8F6',
          100: '#f5f5f2',
          200: '#ebebea',
          300: '#d4d4d2',
          400: '#a8a8a6',
          500: '#7c7c7a',
          600: '#5c5c5a',
          700: '#3d3d3b',
          800: '#1e1e1c',
          900: '#100e12',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pplx': '0.375rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-up': 'slideInUp 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideInUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          'from': { transform: 'translateX(-20px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
