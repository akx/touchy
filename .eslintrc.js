module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prefer-const": "error",
    "no-var": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
