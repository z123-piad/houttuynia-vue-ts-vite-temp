<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAppStore } from "@/stores/app";
import { fetchDemoUsers, type DemoUser } from "@/api/demo";

const appStore = useAppStore();
const users = ref<DemoUser[]>([]);
const source = ref<"api" | "mock" | "idle">("idle");
const loading = ref(false);

const MOCK_USERS: DemoUser[] = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "editor" },
  { id: 3, name: "Carol", role: "viewer" },
];

async function loadUsers() {
  loading.value = true;
  try {
    users.value = await fetchDemoUsers();
    source.value = "api";
  } catch {
    users.value = MOCK_USERS;
    source.value = "mock";
  } finally {
    loading.value = false;
  }
}

onMounted(loadUsers);
</script>

<template>
  <div class="dashboard">
    <h1>控制台</h1>
    <p>
      管理后台布局示例：侧栏 + 内容区。下方演示 Axios typed helpers（
      <code>get&lt;T&gt;</code>
      ）；无后端时自动回退本地 mock。
    </p>

    <dl class="meta">
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
      <div>
        <dt>数据来源</dt>
        <dd>{{ source }}{{ loading ? "（加载中）" : "" }}</dd>
      </div>
    </dl>

    <div class="table-wrap">
      <div class="table-head">
        <h2>用户列表示例</h2>
        <button type="button" @click="loadUsers">刷新</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>角色</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  h1 {
    margin: 0 0 12px;
    font-size: 22px;
  }

  > p {
    margin: 0 0 20px;
    color: $text-muted;
    max-width: 52em;
    line-height: 1.6;
  }
}

.meta {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 0 0 20px;

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

.table-wrap {
  border: 1px solid $border-color;
  border-radius: 10px;
  background: $surface;
  overflow: hidden;
}

.table-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid $border-color;

  h2 {
    margin: 0;
    font-size: 16px;
  }

  button {
    border: 1px solid $border-color;
    background: #fff;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
  }
}

table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid $border-color;
    font-size: 14px;
  }

  th {
    color: $text-muted;
    font-weight: 500;
  }
}
</style>
