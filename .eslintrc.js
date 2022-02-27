module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-comments", "node", "import", "jest"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    "plugin:node/recommended",
    "plugin:jest/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    node: {
      resolvePaths: [__dirname, "node_modules/@types"],
      tryExtensions: [".js", ".json", ".node", ".ts"],
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] }, // Will be transpiled by TS anyway
    ],
    "node/no-missing-import": "off", // Handled by eslint-plugin-import
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
  },
};
