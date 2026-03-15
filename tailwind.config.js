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
          100: '#F2F0EC',
          200: '#e8e6e1',
          300: '#d4d2cd',
          400: '#a8a69f',
          500: '#8c8a84',
          600: '#6b6963',
          700: '#504e49',
          800: '#3d3b37',
          900: '#2a2825',
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
