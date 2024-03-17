/** @type {import('tailwindcss').Config} */
const config = {
  content: ["views/**/*.ejs"],
  theme: {
    extend: {
      screens: {
        landscape: { raw: "(orientation: landscape)" },
        portrait: { raw: "(orientation: portrait)" },
      },
    },
  },
};

module.exports = config;
