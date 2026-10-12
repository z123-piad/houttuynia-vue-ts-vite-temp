import { engineConfig } from "@/config/engine";
import { loadScript, loadStylesheet } from "../loadScript";
import type { CesiumNamespace } from "./types";

let loading: Promise<CesiumNamespace> | null = null;

/**
 * 按 env 配置从 remote CDN 或 local 静态目录加载 Cesium（非 npm）。
 */
export async function loadCesium(): Promise<CesiumNamespace> {
  const { enabled, baseUrl, loadMode } = engineConfig.cesium;
  if (!enabled) {
    throw new Error(
      "[cesium] 未启用。请在 env 中设置 VITE_CESIUM_ENABLED=true。",
    );
  }

  if (window.Cesium) return window.Cesium;
  if (loading) return loading;

  loading = (async () => {
    window.CESIUM_BASE_URL = baseUrl;
    await loadStylesheet(`${baseUrl}Widgets/widgets.css`);
    await loadScript(`${baseUrl}Cesium.js`);

    if (!window.Cesium) {
      throw new Error(
        `[cesium] 已请求脚本但未找到 window.Cesium（mode=${loadMode}, base=${baseUrl}）`,
      );
    }
    return window.Cesium;
  })();

  try {
    return await loading;
  } catch (error) {
    loading = null;
    throw error;
  }
}
