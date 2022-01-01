module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          darkest: '#222222',
          dark: '#313630',
          DEFAULT: '#464B45',
          light: '#585D57',
          lightest: '#6A6F69',
        },
        green: {
          darkest: '#009C4B',
          dark: '#01AD61',
          DEFAULT: '#019D4D',
          light: '#73C595',
          lightest: '#A6EBBF',
        },
        blue: {
          darkest: '#4892D1',
          dark: '#6FA4D8',
          DEFAULT: '#95B8E0',
          light: '#BBCEEC',
          lightest: '#E1E5EE',
        },
        pink: {
          darkest: '#F16FAD',
          dark: '#F28FBB',
          DEFAULT: '#F4ADCD',
          light: '#F8CBDF',
          lightest: '#FDE9F4',
        }
      },
    },
    textShadow: {
      '2xl': '1px 1px 5px rgb(33 34 43 / 20%)',
      '3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      'header': '5px 5px 5px rgb(17 18 18)',
    },
    screens: {
      sm: "919px",
    },
  },
  plugins: [],
}