import { onMounted, onUnmounted, ref, shallowRef, type Ref } from "vue";
import { engineConfig } from "@/config/engine";
import { loadCesium } from "./loadCesium";
import type { CesiumViewerLike } from "./types";

export interface UseCesiumViewerOptions {
  /** Ion token（可选）。未提供时使用 OSM 底图，避免默认 Ion 资源失败。 */
  ionToken?: string;
}

/**
 * 在容器中挂载 Cesium Viewer。需 VITE_CESIUM_ENABLED=true。
 */
export function useCesiumViewer(
  container: Ref<HTMLElement | null>,
  options: UseCesiumViewerOptions = {},
) {
  const viewer = shallowRef<CesiumViewerLike | null>(null);
  const status = ref<"idle" | "loading" | "ready" | "disabled" | "error">(
    engineConfig.cesium.enabled ? "idle" : "disabled",
  );
  const errorMessage = ref("");

  onMounted(async () => {
    if (!engineConfig.cesium.enabled) {
      status.value = "disabled";
      return;
    }
    if (!container.value) return;

    status.value = "loading";
    try {
      const Cesium = await loadCesium();
      if (options.ionToken && Cesium.Ion) {
        Cesium.Ion.defaultAccessToken = options.ionToken;
      }

      const viewerOptions: Record<string, unknown> = {
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: true,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
      };

      // 无 Ion token 时禁用默认 Ion 影像，改用 OSM，保证示例可离线于 Ion 运行
      if (!options.ionToken && Cesium.OpenStreetMapImageryProvider) {
        const osm = new Cesium.OpenStreetMapImageryProvider({
          url: "https://tile.openstreetmap.org/",
        });
        viewerOptions.baseLayer = Cesium.ImageryLayer
          ? new Cesium.ImageryLayer(osm)
          : false;
        viewerOptions.imageryProvider = osm;
      }

      viewer.value = new Cesium.Viewer(container.value, viewerOptions);
      status.value = "ready";
    } catch (error) {
      status.value = "error";
      errorMessage.value =
        error instanceof Error ? error.message : String(error);
    }
  });

  onUnmounted(() => {
    viewer.value?.destroy();
    viewer.value = null;
  });

  return {
    viewer,
    status,
    errorMessage,
    config: engineConfig.cesium,
  };
}
