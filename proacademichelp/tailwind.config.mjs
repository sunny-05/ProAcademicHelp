/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./styles/**/*.css" // <- fixed glob
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f8ff',
          100: '#dfefff',
          200: '#b9dbff',
          300: '#8ac4ff',
          400: '#58a8ff',
          500: '#2a8aff',
          600: '#176be6',
          700: '#1254b4',
          800: '#103f84',
          900: '#0d2c5b'
        }
      }
    }
  },
  plugins: []
};
