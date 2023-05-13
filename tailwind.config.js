/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '300px',
      'md': '600px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'gray': '#242424',
        'dark-gray': '#1b1b1b',
        'light-gray': '#cfcfcf',
        'green': '#1db954',
      },
    },
    fontFamily: {
      sans: ['Inter', 'Helvetica', 'sans-serif'],
      logo: ['Bebas Neue', 'sans-serif']
    },
    backgroundImage: {
      'home': 'url("/images/music-bg.png")'
    }
  },
  plugins: [],
}

