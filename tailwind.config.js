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
          50: '#f0f9f4',
          100: '#dcf0e6',
          200: '#b5e3cc',
          300: '#81ceae',
          400: '#4cb38a',
          500: '#2d9670',
          600: '#2d6a4f',
          700: '#255743',
          800: '#1e4636',
          900: '#18382b',
        },
        neutral: {
          50: '#fafaf8',
          100: '#f5f5f2',
          200: '#e8e8e2',
          300: '#d4d4cc',
          400: '#a8a89e',
          500: '#7a7a72',
          600: '#57574e',
          700: '#44443c',
          800: '#2a2a24',
          900: '#1b1b18',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
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
