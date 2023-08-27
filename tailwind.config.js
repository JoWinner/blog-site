/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: "Poppins",
        titleFont: "Montserrat",
      },
      colors: {
        primaryColor: "#141313",
        secondaryColor: "#2546bd",
        primBlue: "#456aef",
        secBlue: "#2546bd",
        secBlack: "#222328",
        primGreen: "#13ce66",
        secGreen: "#127812",
        primRed: "#ec1708",
        primGray: "#273444",
        secGray: "#8492a6",
        lightGray: "#d3dce6",
        bgColor: "#34495e",
      },
      boxShadow: {
        btnShadow: "0px 0px 18px 3px rgba(52,73,94,1)",
      },
    },
  },
  plugins: [],
};
