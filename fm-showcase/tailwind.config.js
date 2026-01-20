
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
  extend: {
    fontFamily: {
      sora: ['Sora', 'sans-serif'], 
      epilogue: ['Epilogue', 'sans-serif'], 
    },
    colors: {
      'ty-black': 'hsl(0, 0%, 7%)',       
      'ty-gray-dark': 'hsl(0, 0%, 15%)',  
      'ty-gray': 'hsl(240, 3%, 46%)',     
      'ty-gray-light': 'hsl(240, 1%, 59%)', 
      'ty-primary': 'hsl(49, 85%, 70%)', 
    }
  }
},
    plugins: [],
  }