import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Read-only design reference — not part of the app.
    "Claude Design/**",
  ]),
  {
    rules: {
      // The UI displays code snippets and uses quotes/apostrophes throughout;
      // React escapes these safely at runtime, so the rule is just noise here.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
