/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0B1220',
          700: '#14213D',
          500: '#2563EB',
          100: '#DBEAFE'
        }
      }
    }
  },
  plugins: []
};
