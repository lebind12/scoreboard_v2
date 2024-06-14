/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        SoccerBoard: "url('/src/assets/FieldBoard.png')",
        Dont: "url('/src/assets/FieldBoard.png')",
      },
    },
  },
  plugins: [],
};
