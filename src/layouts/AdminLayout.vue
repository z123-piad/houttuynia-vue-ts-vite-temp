<script setup lang="ts">
/**
 * 轻量后台布局：仅提供 header / aside / main 插槽位，
 * 不捆绑 UI 组件库。按需替换侧栏菜单、面包屑等。
 */
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="admin-layout">
    <header class="admin-layout__header">
      <slot name="header">
        <div class="flex items-center gap-4">
          <RouterLink class="brand" to="/">Houttuynia</RouterLink>
          <span class="muted">{{ route.meta.title }}</span>
        </div>
      </slot>
    </header>

    <div class="admin-layout__body">
      <aside class="admin-layout__aside">
        <slot name="aside">
          <nav class="nav">
            <RouterLink to="/admin/dashboard">控制台</RouterLink>
            <RouterLink to="/admin/users">用户示例</RouterLink>
            <RouterLink to="/screen">大屏示例</RouterLink>
            <RouterLink to="/scene">三维扩展</RouterLink>
            <RouterLink to="/">返回首页</RouterLink>
          </nav>
        </slot>
      </aside>

      <main class="admin-layout__main">
        <slot>
          <RouterView />
        </slot>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $page-bg;
  color: $text-color;
}

.admin-layout__header {
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $border-color;
  background: $surface;
}

.admin-layout__body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.admin-layout__aside {
  width: 220px;
  padding: 16px 12px;
  border-right: 1px solid $border-color;
  background: $surface;
}

.admin-layout__main {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.brand {
  font-weight: 700;
  color: $brand;
  text-decoration: none;
}

.muted {
  color: $text-muted;
  font-size: 14px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    color: $text-color;
    text-decoration: none;
    padding: 8px 10px;
    border-radius: 6px;

    &.router-link-active {
      background: rgba($brand, 0.12);
      color: $brand;
    }

    &:hover {
      background: rgba($brand, 0.08);
    }
  }
}
</style>
