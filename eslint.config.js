import pluginVue from "eslint-plugin-vue";
import {
  withVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import prettierConfig from "@vue/eslint-config-prettier";
import globals from "globals";
import autoImportGlobals from "./.eslintrc-auto-import.json" with { type: "json" };

export default withVueTs(
  {
    name: "app/files-to-lint",
    files: ["src/**/*.{vue,ts,tsx}", "vite.config.ts", "uno.config.ts"],
  },
  {
    name: "app/files-to-ignore",
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/*.local",
      "src/types/auto-imports.d.ts",
      "src/types/components.d.ts",
    ],
  },
  ...pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    name: "app/language-options",
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportGlobals.globals,
      },
    },
  },
  {
    name: "app/rules",
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-use-v-if-with-v-for": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  prettierConfig,
);
