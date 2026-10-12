/**
 * Cesium / Three 运行时配置（来自 env，无需 npm 安装引擎本体）。
 *
 * - enabled=false：页面展示说明，不加载任何脚本
 * - loadMode=remote：从 CDN / 远程 baseUrl 加载
 * - loadMode=local：从 public 静态目录（如 /vendor/cesium/）加载
 */

export type EngineLoadMode = "remote" | "local";

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value == null || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function parseMode(value: string | undefined): EngineLoadMode {
  return value === "local" ? "local" : "remote";
}

function ensureTrailingSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}

const DEFAULT_CESIUM_REMOTE =
  "https://cdn.jsdelivr.net/npm/cesium@1.125.0/Build/Cesium/";
const DEFAULT_THREE_REMOTE =
  "https://cdn.jsdelivr.net/npm/three@0.170.0/build/";

export const engineConfig = {
  cesium: {
    enabled: parseBool(import.meta.env.VITE_CESIUM_ENABLED, false),
    loadMode: parseMode(import.meta.env.VITE_CESIUM_LOAD_MODE),
    /** 必须以 / 结尾；remote 用 CDN，local 用 /vendor/cesium/ */
    baseUrl: ensureTrailingSlash(
      import.meta.env.VITE_CESIUM_BASE_URL ||
        (parseMode(import.meta.env.VITE_CESIUM_LOAD_MODE) === "local"
          ? "/vendor/cesium/"
          : DEFAULT_CESIUM_REMOTE),
    ),
  },
  three: {
    enabled: parseBool(import.meta.env.VITE_THREE_ENABLED, false),
    loadMode: parseMode(import.meta.env.VITE_THREE_LOAD_MODE),
    baseUrl: ensureTrailingSlash(
      import.meta.env.VITE_THREE_BASE_URL ||
        (parseMode(import.meta.env.VITE_THREE_LOAD_MODE) === "local"
          ? "/vendor/three/"
          : DEFAULT_THREE_REMOTE),
    ),
  },
} as const;

export type EngineConfig = typeof engineConfig;
