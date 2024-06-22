/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tm: {
          black: {
            100: "#5a5a5a",
            200: "#333333",
            300: "#111111"
          },
          gray: "#f7f7f7",
          primary: "#690dff",
        }
      },
      width: {
        addBoardModal: "550px"
      }
    },
  },
  plugins: [],
}

