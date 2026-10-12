import { onMounted, onUnmounted, ref, shallowRef, type Ref } from "vue";
import { engineConfig } from "@/config/engine";
import { loadCesium } from "./loadCesium";
import type { CesiumViewerLike } from "./types";

export interface UseCesiumViewerOptions {
  /** Ion token（可选；无 token 时示例仍可启动，影像可能受限） */
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
      viewer.value = new Cesium.Viewer(container.value, {
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: true,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
      });
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
