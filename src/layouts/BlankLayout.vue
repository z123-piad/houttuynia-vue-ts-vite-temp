<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="blank-layout">
    <slot>
      <RouterView />
    </slot>
  </div>
</template>

<style scoped>
.blank-layout {
  min-height: 100vh;
}
</style>
