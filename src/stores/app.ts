import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const title = ref(import.meta.env.VITE_APP_TITLE);
  const baseApi = ref(import.meta.env.VITE_APP_BASE_API);
  const mode = ref(import.meta.env.MODE);

  const isDev = computed(() => mode.value === "development");

  return { title, baseApi, mode, isDev };
});
