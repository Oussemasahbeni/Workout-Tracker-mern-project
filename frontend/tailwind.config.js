/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: " jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2f6a87",
        error: "#e7195a",
        header: "#bc4123",
        header_bg: "#fff",
        form_title: "##183153",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
