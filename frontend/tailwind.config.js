/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111936',
        muted: '#64708f',
        brand: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          500: '#6554f4',
          600: '#5644e8',
          700: '#4736cc'
        }
      },
      boxShadow: {
        card: '0 8px 30px rgba(25, 35, 67, 0.055)',
        sidebar: '8px 0 30px rgba(26, 33, 61, 0.035)'
      }
    }
  },
  plugins: []
}
