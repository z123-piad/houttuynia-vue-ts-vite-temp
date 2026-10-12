/**
 * Three.js 接入占位（可选依赖，默认不安装）。
 *
 * 安装：
 *   npm i three
 *   npm i -D @types/three
 *
 * 示例（安装依赖后取消注释）：
 *
 * import { onMounted, onUnmounted, shallowRef, type Ref } from "vue";
 * import {
 *   AmbientLight,
 *   PerspectiveCamera,
 *   Scene,
 *   WebGLRenderer,
 * } from "three";
 *
 * export function useThreeScene(container: Ref<HTMLElement | null>) {
 *   const renderer = shallowRef<WebGLRenderer | null>(null);
 *   let raf = 0;
 *
 *   onMounted(() => {
 *     if (!container.value) return;
 *     const scene = new Scene();
 *     const camera = new PerspectiveCamera(
 *       60,
 *       container.value.clientWidth / container.value.clientHeight,
 *       0.1,
 *       2000,
 *     );
 *     camera.position.set(0, 2, 6);
 *     scene.add(new AmbientLight(0xffffff, 1));
 *
 *     const webgl = new WebGLRenderer({ antialias: true });
 *     webgl.setSize(container.value.clientWidth, container.value.clientHeight);
 *     container.value.appendChild(webgl.domElement);
 *     renderer.value = webgl;
 *
 *     const tick = () => {
 *       webgl.render(scene, camera);
 *       raf = requestAnimationFrame(tick);
 *     };
 *     tick();
 *   });
 *
 *   onUnmounted(() => {
 *     cancelAnimationFrame(raf);
 *     renderer.value?.dispose();
 *     renderer.value?.domElement.remove();
 *     renderer.value = null;
 *   });
 *
 *   return { renderer };
 * }
 */

export function useThreeScene() {
  throw new Error(
    "[extensions/three] 请先安装 three（及 @types/three），并按 docs/extensions.md 启用。",
  );
}
