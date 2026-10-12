<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useScreenScale } from "@/composables/useScreenScale";

/** 设计稿基准：1920×1080，按需修改 */
const { scaleStyle, designWidth, designHeight } = useScreenScale({
  width: 1920,
  height: 1080,
  mode: "cover",
});
</script>

<template>
  <div class="screen-viewport">
    <div class="screen-stage" :style="scaleStyle">
      <header class="screen-stage__header">
        <h1>大屏可视化示例</h1>
        <RouterLink class="back" to="/">返回</RouterLink>
      </header>
      <main class="screen-stage__body">
        <section>
          <h2>缩放模式</h2>
          <p>
            当前使用 <code>useScreenScale</code>，设计尺寸 {{ designWidth }}×{{
              designHeight
            }}。亦可改用 rem 方案（见 <code>docs/extensions.md</code>）。
          </p>
        </section>
        <section>
          <h2>扩展建议</h2>
          <p>
            图表库（ECharts
            等）、地图底图、业务面板请按页面拆分组件，避免把重依赖塞进脚手架默认包。
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen-viewport {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #020617;
  color: #e2e8f0;
}

.screen-stage {
  transform-origin: left top;
  background:
    radial-gradient(ellipse at top, #0f172a 0%, #020617 70%),
    linear-gradient(180deg, rgba(14, 165, 233, 0.08), transparent 40%);
  box-sizing: border-box;
  padding: 24px 32px;
}

.screen-stage__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  padding-bottom: 16px;

  h1 {
    margin: 0;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
}

.back {
  color: #7dd3fc;
  text-decoration: none;
}

.screen-stage__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  section {
    min-height: 280px;
    padding: 20px;
    border: 1px solid rgba(56, 189, 248, 0.25);
    border-radius: 4px;
    background: rgba(15, 23, 42, 0.65);
  }

  h2 {
    margin: 0 0 12px;
    font-size: 22px;
  }

  p {
    margin: 0;
    line-height: 1.7;
    color: #cbd5e1;
    font-size: 18px;
  }

  code {
    color: #38bdf8;
  }
}
</style>
