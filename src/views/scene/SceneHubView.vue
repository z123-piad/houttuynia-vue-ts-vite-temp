<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="scene-hub">
    <RouterLink class="back" to="/">← 返回首页</RouterLink>
    <h1>Cesium / Three.js 扩展点</h1>
    <p>
      脚手架默认<strong>不安装</strong> Cesium 与
      Three.js，以免拖慢无关项目。请按需安装，并参考仓库内
      <code>docs/extensions.md</code> 与
      <code>src/extensions/</code> 下的接入示例。
    </p>

    <div class="grid">
      <section>
        <h2>Cesium</h2>
        <pre><code>npm i cesium vite-plugin-cesium</code></pre>
        <p>
          入口占位：<code>src/extensions/cesium/useCesiumViewer.ts</code>（安装依赖后取消注释即可）。
        </p>
      </section>
      <section>
        <h2>Three.js</h2>
        <pre><code>npm i three
npm i -D @types/three</code></pre>
        <p>
          入口占位：<code>src/extensions/three/useThreeScene.ts</code>（安装依赖后取消注释即可）。
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scene-hub {
  max-width: 880px;
  margin: 0 auto;
  padding: 40px 24px;
  color: $text-color;
}

.back {
  color: $brand;
  text-decoration: none;
  font-size: 14px;
}

h1 {
  margin: 16px 0 12px;
  font-size: 28px;
}

p {
  color: $text-muted;
  line-height: 1.6;
}

.grid {
  margin-top: 28px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

  section {
    padding: 18px;
    border: 1px solid $border-color;
    border-radius: 12px;
    background: $surface;
  }

  h2 {
    margin: 0 0 12px;
    font-size: 18px;
  }

  pre {
    margin: 0 0 12px;
    padding: 12px;
    border-radius: 8px;
    background: #0f172a;
    color: #e2e8f0;
    overflow: auto;
    font-size: 13px;
  }

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
}
</style>
