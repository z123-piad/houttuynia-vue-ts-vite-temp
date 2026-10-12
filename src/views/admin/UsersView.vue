<script setup lang="ts">
import { reactive, ref } from "vue";
import { createDemoUser, type DemoUser } from "@/api/demo";

const form = reactive({ name: "", role: "viewer" });
const created = ref<DemoUser | null>(null);
const note = ref("提交将调用 post<DemoUser>；失败时仅本地预览结果。");

async function onSubmit() {
  const payload = { name: form.name.trim(), role: form.role };
  if (!payload.name) {
    note.value = "请填写名称";
    return;
  }
  try {
    created.value = await createDemoUser(payload);
    note.value = "已通过 API 创建";
  } catch {
    created.value = { id: Date.now(), ...payload };
    note.value = "API 不可用，已生成本地预览对象（演示表单模式）";
  }
}
</script>

<template>
  <div class="users">
    <h1>用户表单示例</h1>
    <p>展示后台常见「表单 → typed POST」模式，不捆绑 UI 组件库。</p>

    <form class="form" @submit.prevent="onSubmit">
      <label>
        名称
        <input v-model="form.name" placeholder="用户名" />
      </label>
      <label>
        角色
        <select v-model="form.role">
          <option value="admin">admin</option>
          <option value="editor">editor</option>
          <option value="viewer">viewer</option>
        </select>
      </label>
      <button type="submit">提交</button>
    </form>

    <p class="note">{{ note }}</p>
    <pre v-if="created">{{ created }}</pre>
  </div>
</template>

<style scoped lang="scss">
.users {
  h1 {
    margin: 0 0 8px;
    font-size: 22px;
  }

  > p {
    color: $text-muted;
    margin: 0 0 16px;
  }
}

.form {
  display: grid;
  gap: 12px;
  max-width: 360px;
  margin-bottom: 16px;

  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
  }

  input,
  select,
  button {
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid $border-color;
    font: inherit;
  }

  button {
    background: $brand;
    color: #fff;
    border-color: $brand;
    cursor: pointer;
  }
}

.note {
  color: $text-muted;
  font-size: 13px;
}

pre {
  padding: 12px;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 8px;
  max-width: 420px;
  overflow: auto;
}
</style>
