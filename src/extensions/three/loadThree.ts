import { engineConfig } from "@/config/engine";
import { loadScript } from "../loadScript";
import type { ThreeModule } from "./types";

let loading: Promise<ThreeModule> | null = null;

/**
 * 按 env 从 remote / local 加载 Three。
 * 优先 ESM `three.module.js`，失败则回退 UMD `three.min.js` → window.THREE。
 */
export async function loadThree(): Promise<ThreeModule> {
  const { enabled, baseUrl, loadMode } = engineConfig.three;
  if (!enabled) {
    throw new Error(
      "[three] 未启用。请在 env 中设置 VITE_THREE_ENABLED=true。",
    );
  }

  if (window.THREE) return window.THREE;
  if (loading) return loading;

  loading = (async () => {
    const moduleUrl = `${baseUrl}three.module.js`;
    try {
      const mod = (await import(
        /* @vite-ignore */ moduleUrl
      )) as ThreeModule & { default?: ThreeModule };
      return (mod.default ?? mod) as ThreeModule;
    } catch {
      await loadScript(`${baseUrl}three.min.js`);
      if (!window.THREE) {
        throw new Error(
          `[three] ESM 与 UMD 均失败（mode=${loadMode}, base=${baseUrl}）`,
        );
      }
      return window.THREE;
    }
  })();

  try {
    return await loading;
  } catch (error) {
    loading = null;
    throw error;
  }
}
