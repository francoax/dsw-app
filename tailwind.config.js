/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tw-elements/dist/plugin.cjs")],
  daisyui: {
    themes: ["dark"],
  }
};
