import type { RouteRecordRaw } from "vue-router";

/**
 * 路由表：按「空白页 / 管理后台布局 / 大屏布局」拆分，便于扩展。
 */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/HomeView.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: "/admin/dashboard",
    meta: { title: "管理后台" },
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("@/views/admin/DashboardView.vue"),
        meta: { title: "控制台" },
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/admin/UsersView.vue"),
        meta: { title: "用户示例" },
      },
    ],
  },
  {
    path: "/screen",
    name: "ScreenDemo",
    component: () => import("@/views/screen/ScreenView.vue"),
    meta: { title: "大屏示例", fullscreen: true },
  },
  {
    path: "/scene",
    name: "SceneHub",
    component: () => import("@/views/scene/SceneHubView.vue"),
    meta: { title: "三维场景扩展" },
  },
  {
    path: "/scene/cesium",
    name: "SceneCesium",
    component: () => import("@/views/scene/CesiumView.vue"),
    meta: { title: "Cesium 示例" },
  },
  {
    path: "/scene/three",
    name: "SceneThree",
    component: () => import("@/views/scene/ThreeView.vue"),
    meta: { title: "Three.js 示例" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/NotFoundView.vue"),
    meta: { title: "未找到" },
  },
];
