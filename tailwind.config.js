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
          50: '#faf3f0',
          100: '#f0ddd6',
          200: '#e3c0b0',
          300: '#d49d84',
          400: '#c47d62',
          500: '#B5604A',
          600: '#B5604A',
          700: '#9a4f3c',
          800: '#7a3f30',
          900: '#5e3025',
        },
        salvia: {
          50: '#f4f7f1',
          100: '#e4eade',
          200: '#c8d5bc',
          300: '#a8c0a0',
          400: '#8FA87A',
          500: '#7a9466',
          600: '#657a55',
          700: '#506244',
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
        editorial: ['Newsreader', 'Georgia', 'serif'],
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
