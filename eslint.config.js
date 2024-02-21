import globals from "globals";

import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    name: "javascript",
    files: ["*.js"],
    rules: js.configs.recommended.rules,
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.builtin,
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

export default config;
