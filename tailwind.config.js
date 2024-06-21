/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // prettier-ignore
        "test": "url('assets/4.png')",
        // prettier-ignore
        "board": "url('assets/FieldBoard_2.png')",
        // prettier-ignore
        "board-top" : "url('assets/4_top.png')",
      },
    },
  },
  plugins: [],
};
