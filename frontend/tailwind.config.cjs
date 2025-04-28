/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flipkart: {
          blue: '#2874f0',
          yellow: '#ffe500',
          green: '#388e3c',
          orange: '#ff9f00',
          red: '#ff6161'
        }
      },
    },
  },
  plugins: [],
} 