/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '102': '448px',"103":"500px"}
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

