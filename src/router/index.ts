import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to) => {
  const title = (to.meta.title as string | undefined) ?? "";
  const appTitle = import.meta.env.VITE_APP_TITLE;
  document.title = title ? `${title} · ${appTitle}` : appTitle;
});
