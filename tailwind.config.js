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
        'bg-dark1': '#000000',
        'bg-dark2': '#161B22',
        'dark-text': '#8b949e'
      },
      fontFamily: {
        manrope: ['Sora', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
