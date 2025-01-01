/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customOrange: '#ea634b',
        customBlue: '#a0bde1',
        customGray: '#7494ac',
      },
    },
  },
  plugins: [],
}

