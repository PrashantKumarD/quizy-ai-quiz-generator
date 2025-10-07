/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "quiz-bg": "url('/myback31.jpg')",
        "quiz-bg2": "url('/myback2.jpg')",
        "quiz-back": "url('/myquizback.jpg')",
      },
    },
  },
  plugins: [],
};
