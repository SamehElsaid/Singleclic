/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        mainColor: "#5D40B5",
        mainHover: "#3a247e",
        homeBg: "#E3E3E3",
      },
    },
  },
  plugins: [],
};
