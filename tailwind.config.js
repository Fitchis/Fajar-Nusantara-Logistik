/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#219cc8',
        'brand-dark': '#197b99',
        sky: {
          400: '#0ea5e9',
          500: '#0284c7',
          600: '#0369a1',
        },
      },
    },
  },
  plugins: [],
};
