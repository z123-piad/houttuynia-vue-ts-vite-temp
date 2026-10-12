<script setup lang="ts">
import { RouterLink } from "vue-router";
import { engineConfig } from "@/config/engine";
</script>

<template>
  <div class="scene-hub">
    <RouterLink class="back" to="/">← 返回首页</RouterLink>
    <h1>Cesium / Three.js 扩展</h1>
    <p>
      引擎通过环境变量启停，并从 <strong>remote CDN</strong> 或
      <strong>local 静态目录</strong> 加载，<strong>默认不 npm 安装</strong>
      重型包。详见 <code>docs/extensions.md</code>。
    </p>

    <div class="grid">
      <section>
        <h2>Cesium</h2>
        <p>
          状态：{{ engineConfig.cesium.enabled ? "启用" : "关闭" }} ·
          {{ engineConfig.cesium.loadMode }}
        </p>
        <pre><code>{{ engineConfig.cesium.baseUrl }}</code></pre>
        <RouterLink class="btn" to="/scene/cesium">打开示例</RouterLink>
      </section>
      <section>
        <h2>Three.js</h2>
        <p>
          状态：{{ engineConfig.three.enabled ? "启用" : "关闭" }} ·
          {{ engineConfig.three.loadMode }}
        </p>
        <pre><code>{{ engineConfig.three.baseUrl }}</code></pre>
        <RouterLink class="btn" to="/scene/three">打开示例</RouterLink>
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
    font-size: 12px;
  }

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
}

.btn {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 8px;
  background: $brand;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
</style>
