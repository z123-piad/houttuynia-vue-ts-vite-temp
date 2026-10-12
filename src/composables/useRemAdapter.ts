import { onMounted, onUnmounted } from "vue";

export interface RemAdapterOptions {
  /** 设计稿宽度 */
  designWidth?: number;
  /** 根字体在设计稿宽度下的 px，默认 16 → 1rem = 设计稿 16px */
  rootFontSize?: number;
  /** 最大根字体，防止超大屏字号过大 */
  maxFontSize?: number;
}

/**
 * 按视口宽度动态设置 html font-size，便于大屏使用 rem 布局。
 * 页面卸载时会恢复原来的 font-size。
 */
export function useRemAdapter(options: RemAdapterOptions = {}) {
  const designWidth = options.designWidth ?? 1920;
  const rootFontSize = options.rootFontSize ?? 16;
  const maxFontSize = options.maxFontSize ?? 24;

  let previous = "";

  function update() {
    const width = document.documentElement.clientWidth;
    const size = Math.min((width / designWidth) * rootFontSize, maxFontSize);
    document.documentElement.style.fontSize = `${size}px`;
  }

  onMounted(() => {
    previous = document.documentElement.style.fontSize;
    update();
    window.addEventListener("resize", update);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
    document.documentElement.style.fontSize = previous;
  });

  return { update };
}
