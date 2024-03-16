/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  quoteProps: "consistent",
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  endOfLine: "auto",
  arrowParens: "always",
  plugins: ["prettier-plugin-ejs", "prettier-plugin-tailwindcss"],
};

module.exports = config;
