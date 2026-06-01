/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['HelveticaNowDisplay-Medium', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['HelveticaNowDisplayW01-Rg', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
