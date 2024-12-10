import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite';
import vue from "@vitejs/plugin-vue";
import path from 'path';
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import UnoCSS from 'unocss/vite';
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
      // 指定自动导入组件TS类型声明文件路径
      dts: path.resolve(rootDirectory, "types", "components.d.ts"),
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      /**
       * 自定义插入位置
       * @default: body-last
       */
      inject: 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    }),
    UnoCSS({})
  ];
  const css = {
    // CSS 预处理器
    preprocessorOptions: {
      //define global scss variable
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  };
  const server = {
    host: '0.0.0.0',
    port: Number(env.VITE_APP_PORT),
    // 自动打开浏览器
    open: true,
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: env.VITE_APP_TARGET,
        changeOrigin: true,
        rewrite: path =>
          path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      }
    }
  };
  console.log({ 'APP_INFO: ': __APP_INFO__, mode });
  return {
    resolve: {
      alias: {
        "@": rootDirectory,
      }
    },
    plugins,
    css,
    server
  }
})
