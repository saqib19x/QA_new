module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        first_linear:
          "linear-gradient(120.48deg, #3BB1DD 0%, #7273E4 44.37%, #A23DEA 100%)",
        form_bg: "linear-gradient(360deg, #BAA09F -12.54%, #7C6C6C 99.99%); ",
      },
      colors: {
        "prime-red": "#fa5853",
      },
      boxShadow: {
        shad_prime: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
    },
  },
  plugins: [],
}