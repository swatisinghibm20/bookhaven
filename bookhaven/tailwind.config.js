/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1e3a5f",
          light: "#2d5a9e",
          dark: "#152d4a",
        },
        amber: {
          DEFAULT: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
};
