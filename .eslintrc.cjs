require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true /** 指定是否停止在父级目录寻找配置文件 */,
  /** 用于启用特定环境的全局变量 */
  env: {
    browser: true /** 浏览器全局变量 */,
    node: true /** Node.js 全局变量和 Node.js 作用域 */,
    es6: true /** 启用除了modules以外的所有 EC6 特性,开启后会自动设置ecmaVersion为6 */
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/typescript/recommended", "@vue/prettier", "@vue/eslint-config-typescript", "./.eslintrc-auto-import.json"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020 /** ECMAScript 版本 */,
    sourceType: "module" /** 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块) */,
    // jsxPragma: "React",
    /** 想使用的额外的语言特性 */
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  parser: "vue-eslint-parser",
  rules: {
    /** 配置规则 */
    // TS
    "@typescript-eslint/no-explicit-any": "off",
    // "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    /* 允许在TypeScript或JavaScript文件中使用require语句 */
    "@typescript-eslint/no-var-requires": "off",
    /* 允许将this关键字赋值给一个局部变量 */
    "@typescript-eslint/no-this-alias": "off",
    /* 允许存在没有使用过的值 */
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    // Vue
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    // 允许在 v-for 指令中使用 v-if
    "vue/no-use-v-if-with-v-for": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    // Prettier
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
};
