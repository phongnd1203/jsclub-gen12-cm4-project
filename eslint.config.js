const globals = require("globals");

const js = require("@eslint/js");
const prettier = require("eslint-plugin-prettier");

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    name: "javascript",
    files: ["*.js"],
    rules: js.configs.recommended.rules,
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "script",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: "prettier",
    rules: prettier.configs.recommended.rules,
    plugins: {
      prettier: prettier,
    },
  },
];

module.exports = config;
