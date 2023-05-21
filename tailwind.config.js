/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#120D18',
        'dark-light': '#33263E',
        'vivid-pink': '#E42575',
        'discord-purple': '#404FED',
        white: '#F8F7F8',
      },
      fontFamily: {
        NotoSansJP: ['Noto Sans JP', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
        VastShadow: ['Vast Shadow', 'cursive'],
        Kalam: ['Kalam', 'cursive'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {};

      addUtilities(newUtilities);
    },
  ],
};
