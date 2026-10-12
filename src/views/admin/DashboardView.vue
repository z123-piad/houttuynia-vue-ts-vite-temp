<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>

<template>
  <div class="dashboard">
    <h1>控制台</h1>
    <p>
      这是管理后台布局下的占位页。可在此接入表格、表单与权限模块；UI
      组件库请按需自行安装（如 Element Plus / Ant Design Vue）。
    </p>
    <dl>
      <div>
        <dt>应用标题</dt>
        <dd>{{ appStore.title }}</dd>
      </div>
      <div>
        <dt>API 前缀</dt>
        <dd>{{ appStore.baseApi }}</dd>
      </div>
      <div>
        <dt>环境</dt>
        <dd>{{ appStore.mode }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  h1 {
    margin: 0 0 12px;
    font-size: 22px;
  }

  p {
    margin: 0 0 20px;
    color: $text-muted;
    max-width: 48em;
    line-height: 1.6;
  }

  dl {
    display: grid;
    gap: 12px;
    max-width: 420px;
  }

  div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid $border-color;
    border-radius: 8px;
    background: $surface;
  }

  dt {
    color: $text-muted;
  }

  dd {
    margin: 0;
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
}
</style>
