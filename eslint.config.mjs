// @ts-check

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      "dist/**/*",
    ],
  },
  {
    plugins: {
      "@stylistic/js": stylisticJs,
      "@stylistic/ts": stylisticTs,
    },
  },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
    }
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["src/**/*"],
    rules: {
      "@stylistic/ts/semi": [ "error" ],
      "@stylistic/ts/brace-style": [ "error" ],
      "@stylistic/js/object-curly-spacing": [
        "error",
        "always",
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        }
      ],
      "@stylistic/js/indent": [
        "error",
        2,
        {
          MemberExpression: 0,
          SwitchCase: 1,
        },
      ],
      "@stylistic/js/newline-per-chained-call": [
        "error",
        {
          ignoreChainWithDepth: 1,
        },
      ],
      "@stylistic/js/max-statements-per-line": [
        "error",
        {
          max: 1,
        },
      ],
      "@stylistic/ts/comma-dangle": [
        "error",
        "always-multiline",
      ],
      "@stylistic/js/function-paren-newline": [
        "error",
        "multiline",
      ],
      "@stylistic/ts/keyword-spacing": [
        "error",
        {
          before: true,
          after: true,
        },
      ],
    },
  }
);
