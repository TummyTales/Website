module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'Playfair Display',
      secondary: 'Lato',
      tertiary: 'Rozha One',

    },
    container: {
      padding: {
        DEFAULT: '10px',
        // lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },

    extend: {
      screens:{
        'small': { 'max': '639px' },
      },
      fontFamily:{
        'fjalla':['Fjalla One'],
        'jost':['Jost'],
        'ubuntu':['Ubuntu'],
  
      },
      colors: {
        body: '#e5e5e5',
        dark: '#0a0909',
        grey: {
          DEFAULT: '#777876',
          100: '#e4e4e3',
        },
        accent: {
          DEFAULT: '#fe7634',
          hover: '#F55304',
        },
      },
      backgroundImage: {
        'food': "url('./assets/food.jpg')",
        'colour': "url('./assets/wave.png')",
        'front': "url('./assets/front.jpg')",
        'mid':"url('./assets/mid.jpg')",
        'recipe':"url('./assets/recbg.avif)"
        
      },
    },
  },
  plugins: [],
}
