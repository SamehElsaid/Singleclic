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
        mainColor: "#2a3847",
        secColor: "#1f2d3d",
        appColor: "#fedb22",
      },
    },
  },
  plugins: [],
};
