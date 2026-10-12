import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";
import pkg from "./package.json" with { type: "json" };

/** 构建时可注入的应用元信息 */
const __APP_INFO__ = {
  pkg: {
    name: pkg.name,
    version: pkg.version,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    devDependencies: pkg.devDependencies,
  },
  buildTimestamp: Date.now(),
};

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, "src");

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const envDir = path.resolve(rootDir, "env");
  const env = loadEnv(mode, envDir);

  return {
    envDir,
    resolve: {
      alias: {
        "@": srcDir,
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dirs: ["src/composables"],
        eslintrc: {
          // 首次生成后可改为 false，避免每次启动重写
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
        },
        dts: path.resolve(srcDir, "types", "auto-imports.d.ts"),
      }),
      Components({
        dts: path.resolve(srcDir, "types", "components.d.ts"),
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(srcDir, "icons")],
        symbolId: "icon-[dir]-[name]",
        inject: "body-first",
      }),
      UnoCSS(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT) || 19001,
      open: false,
      proxy: env.VITE_APP_BASE_API
        ? {
            [env.VITE_APP_BASE_API]: {
              target: env.VITE_APP_TARGET,
              changeOrigin: true,
              rewrite: (p) =>
                p.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ""),
            },
          }
        : undefined,
    },
  };
});
