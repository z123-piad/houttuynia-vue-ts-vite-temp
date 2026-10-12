<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: $text-color;

  a {
    color: $brand;
  }
}
</style>
