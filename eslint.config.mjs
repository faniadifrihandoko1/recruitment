import eslint from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

import { defineConfig, globalIgnores } from "eslint/config";
// import tseslint from "typescript-eslint";
const eslintConfig = defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  [
    ...nextVitals,
    // Override default ignores of eslint-config-next.
    globalIgnores([
      // Default ignores of eslint-config-next:
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ]),

    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: {
        import: importPlugin,
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: "./tsconfig.json",
          },
        },
      },

      rules: {
        semi: ["error"],
        eqeqeq: ["error", "always"],
        "import/no-unresolved": "error",
        "react/no-unescaped-entities": "off",
        "@next/next/no-page-custom-font": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@next/next/no-img-element": "off",
        "newline-before-return": "error",
        "import/newline-after-import": ["error", { count: 1 }],
        "no-duplicate-imports": "error",
        "react/jsx-key": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@next/next/no-assign-module-variable": "error",
        "@next/next/no-async-client-component": "error",
      },
    },
  ]
);

export default eslintConfig;
