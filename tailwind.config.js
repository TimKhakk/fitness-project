/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Lato', 'Arial', 'sans-serif'],
      },
      colors: {
        light: '#F7F6FA',
        dark: '#192126',
        primary: '#BBF246',
      },
    },
  },
  plugins: [],
};
