import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"], // Apply to all JavaScript files
    languageOptions: {
      sourceType: ["commonjs", "module"], // Use CommonJS module syntax
    },
    rules: {
      "no-unused-vars": 1, // Warn about unused variables
      "no-undef": 2, // Error for undefined variables
    },
  },
  {
    languageOptions: {
      globals: globals.node, // Define Node.js global variables
    },
  },
  pluginJs.configs.recommended, // Use recommended rules from `@eslint/js`
];
