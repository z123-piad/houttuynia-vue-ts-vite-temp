import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite';
import vue from "@vitejs/plugin-vue";
import path from 'path';
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  name,
  version,
  engines,
  dependencies,
  devDependencies,
} from "./package.json";

// 平台的名称、版本、运行所需的 node 版本、依赖、构建时间的类型提示
const __APP_INFO__ = {
  pkg: {
    '平台名称:': name,
    '平台版本': version,
    'node版本': engines,
    '依赖': dependencies,
    '构建时间': devDependencies
  },
  buildTimestamp: Date.now(),
};
// 代码根目录
const rootDirectory = path.resolve(__dirname, './src')

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 环境变量文件的文件夹，相对于项目的路径，也可以用 nodejs 函数拼接绝对路径
  const envDir = "env";
  // const isProd = mode === "production";
  const env = loadEnv(mode, envDir);


  const plugins = [
    vue(),//不写入vue就会报错
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      eslintrc: {
        // 是否自动生成 eslint 规则，建议生成之后设置 false
        enabled: true,
        // 指定自动导入函数 eslint 规则的文件
        filepath: "./.eslintrc-auto-import.json",
      },
      // 指定自动导入函数TS类型声明文件路径
      dts: path.resolve(rootDirectory, "types", "auto-imports.d.ts"),
    }),
    Components({
      dts: path.resolve(rootDirectory, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
    }),
  ]
  console.log({ 'APP_INFO: ': __APP_INFO__, mode });
  return {
    resolve: {
      alias: {
        "@": rootDirectory,
      }
    },
    plugins
  }
})
