/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class',
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
  
    fontFamily: {
      "Nunito": ['Nunito', 'sans-serif']
    },
     screens: {

      'mobile': {'min': '234px', 'max': '640px'},
      //  => @media (min-width: 234px) and (max-width: 640px) 

      'tablet': '640px',
      // => @media (min-width: 640px) 

      'laptop': '1024px',
      // => @media (min-width: 1024px) 

      'desktop': '1280px',
      // => @media (min-width: 1280px) 
    },
    // colors: {
    //   'primary': '#FFF',
    //   'black': '#111517',
    //   'shadow': '#979797',
    //   'dark': '#202C36',
    //   'dark-2': '#2B3844',
    //   'white-dark': '#FAFAFA'
    // },
    extend: {},
  },
  plugins: [],
}

