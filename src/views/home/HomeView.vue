<script setup lang="ts">
import { RouterLink } from "vue-router";
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <div class="home">
    <header class="home__hero">
      <p class="eyebrow">Vue 3 · Vite · TypeScript</p>
      <h1>Houttuynia Scaffold</h1>
      <p class="lead">
        面向大屏可视化、Cesium / Three.js
        三维场景，以及可选管理后台的可扩展脚手架。
      </p>
      <div class="actions">
        <RouterLink class="btn btn--primary" to="/screen">大屏示例</RouterLink>
        <RouterLink class="btn" to="/scene">三维扩展点</RouterLink>
        <RouterLink class="btn" to="/admin">管理后台布局</RouterLink>
      </div>
    </header>

    <section class="cards">
      <article>
        <SvgIcon icon-class="hxsm" size="28px" color="currentColor" />
        <h2>大屏</h2>
        <p>内置 rem / transform 缩放工具，按设计稿尺寸适配。</p>
      </article>
      <article>
        <SvgIcon icon-class="bbt" size="28px" color="currentColor" />
        <h2>GIS / 3D</h2>
        <p>Cesium、Three.js 作为可选依赖，文档说明接入方式。</p>
      </article>
      <article>
        <SvgIcon
          icon-class="whiteListStatistics"
          size="28px"
          color="currentColor"
        />
        <h2>后台</h2>
        <p>路由 + 布局插槽 + 环境变量，够用但不臃肿。</p>
      </article>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  padding: 48px 24px 64px;
  max-width: 960px;
  margin: 0 auto;
  color: $text-color;
}

.home__hero {
  margin-bottom: 40px;
}

.eyebrow {
  margin: 0 0 8px;
  color: $brand;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 12px;
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.2;
}

.lead {
  margin: 0 0 24px;
  color: $text-muted;
  font-size: 16px;
  line-height: 1.6;
  max-width: 40em;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid $border-color;
  background: $surface;
  color: $text-color;
  text-decoration: none;
  font-size: 14px;

  &--primary {
    background: $brand;
    border-color: $brand;
    color: #fff;
  }
}

.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  article {
    padding: 18px;
    border: 1px solid $border-color;
    border-radius: 12px;
    background: $surface;
  }

  h2 {
    margin: 12px 0 8px;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: $text-muted;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
