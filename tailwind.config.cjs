const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nav: '#010139',
        'purp-0': '#bfa3f8',
        'purp-1': '#8D47FC',
        'purp-2': '#8345FE',
        'purp-3': '#6931F4',
        'purp-4': '#4F2FED',
        'purp-5': '#d29eff',
      },
      height: {
        '150px': '10rem',
        90: '350px',
      },
      fontFamily: {
        'font-pop': ['poppins'],
      },
      spacing: {
        2.5: '10px',
      },
    },
  },
  plugins: [],
};
