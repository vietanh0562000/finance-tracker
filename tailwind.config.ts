import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FBF3C4',
          100: '#FBEA8B',
          200: '#FBE567',
          400: '#F0B834',
          600: '#AC691B',
          800: '#895234',
          900: '#382410',
        },
        caramel: {
          100: '#FBF3C4',
          300: '#FBEA8B',
          500: '#AC691B',
          700: '#A04D13',
          900: '#645C40',
        },
        success: '#2D8F4E',
        error: '#D94F4F',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(56,36,16,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
