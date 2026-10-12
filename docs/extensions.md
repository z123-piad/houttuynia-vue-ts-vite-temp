# 扩展指南：大屏 · Cesium · Three.js · 管理后台 · HTTP

本脚手架保持依赖精简。Cesium / Three **默认不 npm 安装**，通过环境变量启停，并从 **remote CDN** 或 **local 静态目录** 加载。

---

## 1. 大屏适配

### 方案 A：`transform` 缩放（示例页）

```ts
import { useScreenScale } from "@/composables/useScreenScale";

const { scaleStyle } = useScreenScale({
  width: 1920,
  height: 1080,
  mode: "contain", // width | height | cover | contain
});
```

路由：`/screen` → `src/views/screen/ScreenView.vue`。

### 方案 B：`rem` 动态根字号

```ts
import { useRemAdapter } from "@/composables/useRemAdapter";

useRemAdapter({ designWidth: 1920, rootFontSize: 16 });
```

同一页面不要混用 rem 与 transform。

---

## 2. Cesium / Three 配置开关

读取入口：`src/config/engine.ts`。

| 变量 | 含义 | 示例 |
| --- | --- | --- |
| `VITE_CESIUM_ENABLED` | 是否启用 Cesium | `true` / `false` |
| `VITE_CESIUM_LOAD_MODE` | `remote`（CDN）或 `local`（静态目录） | `remote` |
| `VITE_CESIUM_BASE_URL` | 资源根路径，**须以 `/` 结尾** | 见下方 |
| `VITE_THREE_ENABLED` | 是否启用 Three | `true` / `false` |
| `VITE_THREE_LOAD_MODE` | `remote` / `local` | `remote` |
| `VITE_THREE_BASE_URL` | 资源根路径，**须以 `/` 结尾** | 见下方 |

### 开发默认（`env/.env.development`）

- 端口：`VITE_APP_PORT=19001`
- Cesium / Three：`ENABLED=true`，`LOAD_MODE=remote`，使用 jsDelivr CDN  
  → **无需** `npm i cesium` / `npm i three`

### 关闭引擎

```env
VITE_CESIUM_ENABLED=false
VITE_THREE_ENABLED=false
```

页面仍可打开，会显示「未启用」说明，不发起脚本请求。

### remote（CDN）

```env
VITE_CESIUM_ENABLED=true
VITE_CESIUM_LOAD_MODE=remote
VITE_CESIUM_BASE_URL=https://cdn.jsdelivr.net/npm/cesium@1.125.0/Build/Cesium/

VITE_THREE_ENABLED=true
VITE_THREE_LOAD_MODE=remote
VITE_THREE_BASE_URL=https://cdn.jsdelivr.net/npm/three@0.170.0/build/
```

### local（`public/vendor`）

```env
VITE_CESIUM_ENABLED=true
VITE_CESIUM_LOAD_MODE=local
VITE_CESIUM_BASE_URL=/vendor/cesium/

VITE_THREE_ENABLED=true
VITE_THREE_LOAD_MODE=local
VITE_THREE_BASE_URL=/vendor/three/
```

目录说明：

- `public/vendor/cesium/README.md`
- `public/vendor/three/README.md`

加载实现：

- Cesium：`src/extensions/cesium/loadCesium.ts`（`Cesium.js` + `Widgets/widgets.css`）
- Three：`src/extensions/three/loadThree.ts`（优先 `three.module.js`，回退 `three.min.js`）

示例路由：

| 路径 | 说明 |
| --- | --- |
| `/scene` | 扩展总览（当前 env 状态） |
| `/scene/cesium` | Cesium Viewer 轻量演示 |
| `/scene/three` | Three 旋转方块演示 |

> 可选：若团队坚持 npm 包 + `vite-plugin-cesium`，仍可自行安装；本脚手架路径优先「可关断的静态/CDN 加载」。

---

## 3. 管理后台模式

| 能力 | 位置 |
| --- | --- |
| 路由 | `src/router/` |
| 布局插槽 | `src/layouts/AdminLayout.vue` |
| 控制台示例 | `/admin/dashboard` |
| 表单示例 | `/admin/users` |
| 环境变量 | `env/.env*` |

未捆绑 Element Plus / Ant Design Vue，按需自行安装。

---

## 4. Axios 封装基线

文件：`src/utils/request.ts`，类型：`src/types/http.ts`。

- 单例 `axios` 实例（`baseURL = VITE_APP_BASE_API`）
- 请求 / 响应拦截器（token、错误提示挂载点）
- Typed helpers：`get` / `post` / `put` / `del`，默认解包 `{ code, msg, data }.data`
- `requestOptions.raw` / `silent` / `successCodes` 可覆盖行为

```ts
import { get, post } from "@/utils/request";

interface User { id: number; name: string }
await get<User[]>("/demo/users");
await post<User>("/demo/users", { name: "Ada", role: "admin" });
```

示例 API：`src/api/demo.ts`（后台页在无后端时回退 mock）。

---

## 5. 推荐目录

```
src/
  api/           # 接口按域拆分
  config/        # 运行时配置（engine 等）
  components/
  composables/   # 大屏工具
  extensions/    # Cesium / Three 加载与组合式函数
  layouts/
  router/
  stores/
  utils/         # request、message
  views/
public/vendor/   # local 模式下的引擎静态资源（可选）
```
