/**
 * Cesium 接入占位（可选依赖，默认不安装）。
 *
 * 安装：
 *   npm i cesium vite-plugin-cesium
 *
 * 并在 vite.config.ts 中启用 vite-plugin-cesium，详见 docs/extensions.md。
 *
 * 示例（安装依赖后取消注释）：
 *
 * import { onMounted, onUnmounted, shallowRef, type Ref } from "vue";
 * import { Viewer } from "cesium";
 * import "cesium/Build/Cesium/Widgets/widgets.css";
 *
 * export function useCesiumViewer(container: Ref<HTMLElement | null>) {
 *   const viewer = shallowRef<Viewer | null>(null);
 *
 *   onMounted(() => {
 *     if (!container.value) return;
 *     viewer.value = new Viewer(container.value, {
 *       animation: false,
 *       timeline: false,
 *     });
 *   });
 *
 *   onUnmounted(() => {
 *     viewer.value?.destroy();
 *     viewer.value = null;
 *   });
 *
 *   return { viewer };
 * }
 */

export function useCesiumViewer() {
  throw new Error(
    "[extensions/cesium] 请先安装 cesium / vite-plugin-cesium，并按 docs/extensions.md 启用。",
  );
}
