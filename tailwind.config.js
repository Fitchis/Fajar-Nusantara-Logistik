/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#219cc8',
        'brand-dark': '#197b99'
      }
    },
  },
  plugins: [],
};
