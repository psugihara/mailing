/** @type {import('tailwindcss').Config} */

const path = require("path");

module.exports = {
  content: [
    path.join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        white: "#E4EBFA",
        black: "#111",
        blue: "#B8CEFF",
        "gray-300": "#ccc",
        "gray-500": "#555",
        "gray-600": "#444",
        "gray-700": "#333",
        "gray-800": "#222"
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
