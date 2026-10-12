<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useScreenScale } from "@/composables/useScreenScale";

const { scaleStyle, designWidth, designHeight, scale } = useScreenScale({
  width: 1920,
  height: 1080,
  mode: "contain",
});

const now = ref(new Date());
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  window.clearInterval(timer);
});

const clock = computed(() =>
  now.value.toLocaleString("zh-CN", { hour12: false }),
);

const panels = [
  { title: "在线终端", value: "1,284", trend: "+3.2%" },
  { title: "告警事件", value: "36", trend: "-12%" },
  { title: "图层服务", value: "18", trend: "稳定" },
  { title: "今日访问", value: "9.6k", trend: "+8%" },
];
</script>

<template>
  <div class="screen-viewport">
    <div class="screen-stage" :style="scaleStyle">
      <header class="screen-stage__header">
        <div>
          <p class="eyebrow">Large Screen Pattern</p>
          <h1>城市运行态势大屏</h1>
        </div>
        <div class="header-meta">
          <span>{{ clock }}</span>
          <span>缩放 {{ scale.toFixed(3) }}</span>
          <RouterLink class="back" to="/">返回首页</RouterLink>
        </div>
      </header>

      <section class="metrics">
        <article v-for="item in panels" :key="item.title">
          <h2>{{ item.title }}</h2>
          <p class="value">{{ item.value }}</p>
          <p class="trend">{{ item.trend }}</p>
        </article>
      </section>

      <main class="screen-stage__body">
        <section class="panel main-panel">
          <h2>主视口占位</h2>
          <p>
            设计稿 {{ designWidth }}×{{ designHeight }}，使用
            <code>useScreenScale</code>（contain）。此处可嵌入地图、Cesium
            或图表。
          </p>
          <div class="fake-chart" aria-hidden="true">
            <span
              v-for="n in 12"
              :key="n"
              :style="{ height: `${30 + n * 8}%` }"
            />
          </div>
        </section>
        <aside class="side">
          <section class="panel">
            <h2>适配说明</h2>
            <p>
              也可用 <code>useRemAdapter</code>。同一页不要混用 rem 与
              transform。
            </p>
          </section>
          <section class="panel">
            <h2>跳转</h2>
            <p>
              <RouterLink to="/scene/cesium">Cesium</RouterLink>
              ·
              <RouterLink to="/scene/three">Three</RouterLink>
              ·
              <RouterLink to="/admin">后台</RouterLink>
            </p>
          </section>
        </aside>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen-viewport {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #020617;
  color: #e2e8f0;
}

.screen-stage {
  transform-origin: left top;
  background:
    radial-gradient(ellipse at top, #0f172a 0%, #020617 70%),
    linear-gradient(180deg, rgba(14, 165, 233, 0.08), transparent 40%);
  box-sizing: border-box;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.screen-stage__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  padding-bottom: 16px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #38bdf8;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 14px;
}

h1 {
  margin: 0;
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.header-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  color: #94a3b8;
  font-size: 18px;
}

.back {
  color: #7dd3fc;
  text-decoration: none;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  article {
    padding: 18px 20px;
    border: 1px solid rgba(56, 189, 248, 0.25);
    background: rgba(15, 23, 42, 0.7);
  }

  h2 {
    margin: 0;
    font-size: 16px;
    color: #94a3b8;
    font-weight: 500;
  }

  .value {
    margin: 10px 0 4px;
    font-size: 36px;
    font-weight: 700;
  }

  .trend {
    margin: 0;
    color: #38bdf8;
    font-size: 14px;
  }
}

.screen-stage__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;
  min-height: 0;
}

.side {
  display: grid;
  gap: 16px;
}

.panel {
  padding: 20px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  background: rgba(15, 23, 42, 0.65);

  h2 {
    margin: 0 0 12px;
    font-size: 22px;
  }

  p {
    margin: 0;
    line-height: 1.7;
    color: #cbd5e1;
    font-size: 18px;
  }

  a {
    color: #7dd3fc;
  }

  code {
    color: #38bdf8;
  }
}

.main-panel {
  display: flex;
  flex-direction: column;
}

.fake-chart {
  margin-top: 24px;
  flex: 1;
  min-height: 280px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 16px;
  border: 1px dashed rgba(56, 189, 248, 0.35);

  span {
    flex: 1;
    background: linear-gradient(180deg, #38bdf8, rgba(56, 189, 248, 0.15));
  }
}
</style>
