import { computed, onMounted, onUnmounted, ref } from "vue";

export type ScreenScaleMode = "width" | "height" | "cover" | "contain";

export interface ScreenScaleOptions {
  /** 设计稿宽度，默认 1920 */
  width?: number;
  /** 设计稿高度，默认 1080 */
  height?: number;
  /**
   * width: 仅按宽缩放
   * height: 仅按高缩放
   * cover: 取较大缩放比（铺满，可能裁切）
   * contain: 取较小缩放比（完整可见，可能留白）
   */
  mode?: ScreenScaleMode;
}

/**
 * 大屏 transform 等比缩放。将返回的 style 绑到设计稿尺寸的容器上即可。
 * rem 方案见 docs/extensions.md。
 */
export function useScreenScale(options: ScreenScaleOptions = {}) {
  const designWidth = options.width ?? 1920;
  const designHeight = options.height ?? 1080;
  const mode = options.mode ?? "contain";

  const viewportWidth = ref(
    typeof window !== "undefined" ? window.innerWidth : designWidth,
  );
  const viewportHeight = ref(
    typeof window !== "undefined" ? window.innerHeight : designHeight,
  );

  const scaleX = computed(() => viewportWidth.value / designWidth);
  const scaleY = computed(() => viewportHeight.value / designHeight);

  const scale = computed(() => {
    switch (mode) {
      case "width":
        return scaleX.value;
      case "height":
        return scaleY.value;
      case "cover":
        return Math.max(scaleX.value, scaleY.value);
      case "contain":
      default:
        return Math.min(scaleX.value, scaleY.value);
    }
  });

  const scaleStyle = computed(() => ({
    width: `${designWidth}px`,
    height: `${designHeight}px`,
    transform: `scale(${scale.value})`,
    transformOrigin: "left top" as const,
  }));

  function update() {
    viewportWidth.value = window.innerWidth;
    viewportHeight.value = window.innerHeight;
  }

  onMounted(() => {
    update();
    window.addEventListener("resize", update);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return {
    designWidth,
    designHeight,
    scale,
    scaleX,
    scaleY,
    scaleStyle,
    update,
  };
}
