<script setup lang="ts">
defineProps<{
  title: string;
  enabled: boolean;
  loadMode: string;
  baseUrl: string;
  status: string;
  errorMessage?: string;
}>();
</script>

<template>
  <div class="banner" :data-status="status">
    <div class="banner__row">
      <strong>{{ title }}</strong>
      <span class="tag">{{ enabled ? "已启用" : "未启用" }}</span>
      <span class="tag">{{ loadMode }}</span>
      <span class="tag">{{ status }}</span>
    </div>
    <p class="muted">
      baseUrl: <code>{{ baseUrl }}</code>
    </p>
    <p v-if="!enabled" class="hint">
      在 <code>env/.env.development</code> 将对应
      <code>VITE_*_ENABLED</code> 设为 <code>true</code>，并选择
      <code>remote</code>（CDN）或
      <code>local</code>（<code>public/vendor</code>）。
    </p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.banner {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid $border-color;
  background: $surface;
  margin-bottom: 12px;
}

.banner__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba($brand, 0.12);
  color: $brand;
}

.muted,
.hint {
  margin: 8px 0 0;
  color: $text-muted;
  font-size: 13px;
  line-height: 1.5;
}

.error {
  margin: 8px 0 0;
  color: #b91c1c;
  font-size: 13px;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}
</style>
