/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#BFAFA0',
        'heading-color': '#131313',
        'text-color': '#131313',
        'border-color': '#dddddd',
        'bg-color': '#BFAFA0',
        'accent-color': '#BFAFA0',
      },
      fontFamily: {
        manrope: ['Sora', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
