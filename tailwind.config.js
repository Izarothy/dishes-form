module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/src/images/home-background.jpg')",
      },
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      colors: {
        'primary-dark': '#18182A',
        'secondary-dark': '#10101E',
      },
    },
  },
  plugins: [],
};
