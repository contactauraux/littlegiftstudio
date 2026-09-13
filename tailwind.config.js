/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#fdf8f6',
          100: '#fbeee9',
          200: '#f8ded5',
          300: '#f2c5b7',
          400: '#e9a08e',
          500: '#dc7a65',
          600: '#c75b45',
          700: '#a64733',
          800: '#893c2d',
          900: '#73362a',
        },
        rosebud: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
        },
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
        },
        matcha: {
          50: '#f4f7f2',
          100: '#e6ede2',
          200: '#cedec6',
          300: '#a9c59d',
          400: '#84a873',
          500: '#648c53',
        },
        butter: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
        },
        cream: '#FFFBF7',
        craftcard: '#FDF7F2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cursive: ['"Caveat"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(220, 122, 101, 0.08)',
        'craft': '0 4px 20px 0 rgba(220, 122, 101, 0.12)',
        'card-hover': '0 20px 35px -10px rgba(166, 71, 51, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.1) rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
};
