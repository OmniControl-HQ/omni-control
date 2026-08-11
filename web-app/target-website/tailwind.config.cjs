/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        serif: ["'Lora'", "serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        primary: "#ffffff",
        accent: "#c5ff4a",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};