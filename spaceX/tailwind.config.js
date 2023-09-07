/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        customDarkGray: '#1c1d22',
        customLightGray: '#8d8e8d',
        customWhite: '#ffffff',
        customLightBg: '#272b32'
      },
    },
  },
  plugins: [],
}
