/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canopy: {
          950: '#0B1410',
          900: '#0F1712',
          800: '#152019',
          700: '#1C2B22',
          600: '#25392C',
          500: '#2F4A38',
        },
        forest: {
          400: '#4C9A73',
          500: '#1F6F4A',
          600: '#175A3B',
          700: '#12452D',
        },
        amber: {
          400: '#F0B75A',
          500: '#E8A33D',
          600: '#C7862A',
        },
        rose: {
          400: '#CC7A61',
          500: '#B5563A',
          600: '#94422B',
        },
        slate2: {
          500: '#5C7085',
          600: '#3B4B5C',
          700: '#2C3A47',
        },
        paper: '#F6F7F2',
        ink: '#141A17',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,18,0.06), 0 4px 16px rgba(15,23,18,0.06)',
      },
      borderRadius: {
        xl2: '1.1rem',
      },
    },
  },
  plugins: [],
}
