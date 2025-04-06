/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#F4EBDC',
        primary: '#3A506B',
        secondary: '#D8C3A5',
      }
    },
  },
  plugins: [],
};