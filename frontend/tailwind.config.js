/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'], // Arabic Primary
        manrope: ['Manrope', 'sans-serif'], // English Primary
      },
      colors: {
        shoka: {
          sand: '#D6C6A5',      // Heritage Sand - Primary Brand
          clay: '#8C6239',      // Deep Clay/Bronze - Secondary Brand
          dark: '#2A2A2A',      // Charcoal Black - Text/Dark BG
          ivory: '#F7F3EB',     // Ivory White - Light BG
          gold: '#C2A45C',      // Muted Gold - Accent
        },
        // Semantic aliases
        bg: {
          light: '#F7F3EB',     // Ivory for main backgrounds
          warm: '#EFEBE0',      // Slightly darker warm bg for sections
          dark: '#2A2A2A',      // Charcoal for footers/dark sections
        },
        text: {
          primary: '#2A2A2A',   // Charcoal Black
          secondary: '#5C5C5C', // Soft Grey
          muted: '#8A8A8A',     // Muted text
          light: '#F7F3EB',     // Light text on dark backgrounds
        }
      },
      backgroundImage: {
        'grain-texture': "url('/grain.png')", // Placeholder for texture
        'hero-heritage': 'radial-gradient(circle at 10% 20%, rgba(214, 198, 165, 0.4) 0%, rgba(247, 243, 235, 0) 60%)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(42, 42, 42, 0.05)',
        'premium': '0 10px 40px rgba(42, 42, 42, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
