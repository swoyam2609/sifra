/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'max-xsm':{'max':'640px'}
    },
    extend: {
      
    },
  },
  plugins: [],
}