import { onMounted, onUnmounted, ref, shallowRef, type Ref } from "vue";
import { engineConfig } from "@/config/engine";
import { loadThree } from "./loadThree";
import type { ThreeRendererLike } from "./types";

/**
 * 轻量 Three 旋转方块示例。需 VITE_THREE_ENABLED=true。
 */
export function useThreeScene(container: Ref<HTMLElement | null>) {
  const renderer = shallowRef<ThreeRendererLike | null>(null);
  const status = ref<"idle" | "loading" | "ready" | "disabled" | "error">(
    engineConfig.three.enabled ? "idle" : "disabled",
  );
  const errorMessage = ref("");

  let raf = 0;
  let onResize: (() => void) | null = null;

  onMounted(async () => {
    if (!engineConfig.three.enabled) {
      status.value = "disabled";
      return;
    }
    if (!container.value) return;

    status.value = "loading";
    try {
      const THREE = await loadThree();
      const el = container.value;
      const scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const dir = new THREE.DirectionalLight(0xffffff, 0.85);
      dir.position.set(3, 5, 2);
      scene.add(dir);

      const camera = new THREE.PerspectiveCamera(
        60,
        el.clientWidth / Math.max(el.clientHeight, 1),
        0.1,
        100,
      );
      camera.position.set(2.2, 1.6, 3.2);

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 }),
      );
      scene.add(mesh);

      const webgl = new THREE.WebGLRenderer({ antialias: true });
      webgl.setSize(el.clientWidth, el.clientHeight);
      webgl.setPixelRatio?.(Math.min(window.devicePixelRatio, 2));
      el.appendChild(webgl.domElement);
      renderer.value = webgl;

      onResize = () => {
        if (!container.value) return;
        camera.aspect =
          container.value.clientWidth /
          Math.max(container.value.clientHeight, 1);
        camera.updateProjectionMatrix();
        webgl.setSize(
          container.value.clientWidth,
          container.value.clientHeight,
        );
      };
      window.addEventListener("resize", onResize);

      const tick = () => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.015;
        webgl.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();
      status.value = "ready";
    } catch (error) {
      status.value = "error";
      errorMessage.value =
        error instanceof Error ? error.message : String(error);
    }
  });

  onUnmounted(() => {
    cancelAnimationFrame(raf);
    if (onResize) window.removeEventListener("resize", onResize);
    renderer.value?.dispose();
    renderer.value?.domElement.remove();
    renderer.value = null;
  });

  return {
    renderer,
    status,
    errorMessage,
    config: engineConfig.three,
  };
}
