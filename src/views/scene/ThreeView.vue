<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import EngineStatusBanner from "@/components/EngineStatusBanner.vue";
import { useThreeScene } from "@/extensions/three/useThreeScene";

const container = ref<HTMLElement | null>(null);
const { status, errorMessage, config } = useThreeScene(container);
</script>

<template>
  <div class="page">
    <header class="page__header">
      <div>
        <RouterLink to="/scene">← 三维扩展</RouterLink>
        <h1>Three.js 示例</h1>
      </div>
      <RouterLink to="/">首页</RouterLink>
    </header>

    <EngineStatusBanner
      title="Three.js"
      :enabled="config.enabled"
      :load-mode="config.loadMode"
      :base-url="config.baseUrl"
      :status="status"
      :error-message="errorMessage"
    />

    <div ref="container" class="viewport" />
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #0b1220;
  color: #e2e8f0;
  box-sizing: border-box;
}

.page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  a {
    color: #7dd3fc;
    text-decoration: none;
  }

  h1 {
    margin: 8px 0 0;
    font-size: 24px;
  }
}

.viewport {
  flex: 1;
  min-height: 480px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: radial-gradient(circle at 30% 20%, #1e293b, #020617 70%);
}
</style>
