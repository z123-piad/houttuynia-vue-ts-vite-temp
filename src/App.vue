<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import variables from "@/styles/variables.module.scss";
import { useCounterStore } from "@/store/counter";
const counterStore = useCounterStore();
//
console.log(variables.bgColor)
</script>

<template>
  <div>
    <h1 class="text-3xl">vue3-element-admin-父组件</h1>
    <button type="primary" @click="counterStore.increment">count++</button>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <div>
      <SvgIcon icon-class="hxsm" prefix="icon" :color="'red'" size="200px" />SVG 本地图标 {{ counterStore.count }}
    </div>
  </div>
  <div class="box text-red w-100 h-150 bg-green dark:bg-white">123</div>
  <HelloWorld :msg="'vue3-element-admin'+counterStore.count" />
</template>

<style lang="scss" scoped>
.box {
  background-color: $bg-color;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
