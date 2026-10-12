# 扩展指南：大屏 · Cesium · Three.js · 管理后台

本脚手架保持依赖精简。以下能力以**扩展点 + 文档**提供，按需安装重型包。

---

## 1. 大屏适配

### 方案 A：`transform` 缩放（已内置示例）

```ts
import { useScreenScale } from "@/composables/useScreenScale";

const { scaleStyle } = useScreenScale({
  width: 1920,
  height: 1080,
  mode: "contain", // width | height | cover | contain
});
```

路由示例：`/screen` → `src/views/screen/ScreenView.vue`。

### 方案 B：`rem` 动态根字号

```ts
import { useRemAdapter } from "@/composables/useRemAdapter";

useRemAdapter({ designWidth: 1920, rootFontSize: 16 });
```

在样式中使用 `rem` 即可随视口缩放。两种方案不要混用在同一页面。

### 图表

推荐按页面安装 ECharts（或其它库），不要默认写进脚手架依赖：

```bash
npm i echarts
```

---

## 2. Cesium（可选）

```bash
npm i cesium vite-plugin-cesium
```

在 `vite.config.ts` 中：

```ts
import cesium from "vite-plugin-cesium";

plugins: [
  // ...
  cesium(),
]
```

接入占位：`src/extensions/cesium/useCesiumViewer.ts`（安装后按文件内注释启用）。

注意：Cesium 体积大，建议独立路由懒加载，避免拖慢首屏。

---

## 3. Three.js（可选）

```bash
npm i three
npm i -D @types/three
```

接入占位：`src/extensions/three/useThreeScene.ts`。

GIS 与三维场景建议放在 `src/views/scene/` 下按业务拆分；公共渲染逻辑放进 `src/extensions/`。

---

## 4. 管理后台模式（轻量）

已提供：

| 能力 | 位置 |
| --- | --- |
| 路由 | `src/router/` |
| 布局插槽 | `src/layouts/AdminLayout.vue`（header / aside / default） |
| 环境变量 | `env/.env*` + `src/types/env.d.ts` |
| HTTP | `src/utils/request.ts` |
| 状态 | `src/stores/app.ts` |

未捆绑 Element Plus / Ant Design Vue。需要时：

```bash
npm i element-plus
# 或
npm i ant-design-vue
```

动态路由、按钮权限可在 `router.beforeEach` 与独立 `permission` 模块中扩展，无需改布局骨架。

---

## 5. 推荐目录约定

```
src/
  api/           # 接口按域拆分
  components/    # 通用组件
  composables/   # 组合式函数（含大屏工具）
  extensions/    # 可选重依赖接入（Cesium / Three）
  layouts/       # 布局
  router/        # 路由
  stores/        # Pinia
  styles/        # 全局样式与变量
  utils/         # 工具（请求、消息等）
  views/         # 页面
```
