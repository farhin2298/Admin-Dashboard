/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#18212f',
        mist: '#f6f8fb',
        brand: '#2563eb',
      },
    },
  },
  plugins: [],
};
