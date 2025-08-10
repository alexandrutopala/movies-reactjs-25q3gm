/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'main-red': '#F65261',
        'main-red-500': '#F65261',
        'main-red-600': '#F51247'
      }
    },
  },
  plugins: [],
}
