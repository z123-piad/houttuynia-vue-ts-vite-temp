# Houttuynia Vue3 + Vite + TypeScript 脚手架

面向三类场景的可维护前端脚手架：

1. **大屏 / 数据可视化**（`useScreenScale` / `useRemAdapter`，示例 `/screen`）
2. **Cesium / Three.js**（env 启停；CDN 或 `public/vendor` 加载，**不强制 npm**）
3. **管理后台**（路由 + 布局插槽 + Axios 封装，示例 `/admin`）

## 技术栈

| 技术 | 说明 |
| --- | --- |
| Vue 3 | 组合式 API |
| Vite 6 | 开发与构建 |
| TypeScript | 类型约束 |
| Vue Router | 路由 |
| Pinia | 状态管理 |
| Axios | HTTP（实例 + 拦截器 + typed helpers） |
| UnoCSS + SCSS | 原子化 + 预处理器 |
| ESLint + Prettier | 规范与格式化 |

## 环境要求

- Node.js ≥ 22.11.0
- 推荐 VS Code + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 快速开始

```bash
npm install
npm run dev
```

开发服务器默认端口 **19001**（`env/.env.development` → `VITE_APP_PORT`）。

```bash
npm run build
npm run preview
npm run typecheck
npm run lint
npm run format
```

## 示例路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页 |
| `/screen` | 大屏缩放与面板模式示例 |
| `/scene` | 三维扩展总览（显示当前 env） |
| `/scene/cesium` | Cesium 轻量演示（需启用） |
| `/scene/three` | Three.js 轻量演示（需启用） |
| `/admin/dashboard` | 后台控制台 + Axios/mock 列表示例 |
| `/admin/users` | 后台表单 + typed POST 示例 |

## Cesium / Three 配置旋钮

详见 [docs/extensions.md](./docs/extensions.md)。摘要：

| 变量 | 作用 |
| --- | --- |
| `VITE_CESIUM_ENABLED` / `VITE_THREE_ENABLED` | 启停 |
| `VITE_CESIUM_LOAD_MODE` / `VITE_THREE_LOAD_MODE` | `remote` \| `local` |
| `VITE_CESIUM_BASE_URL` / `VITE_THREE_BASE_URL` | CDN 或 `/vendor/.../` |

开发环境默认 **remote + 启用**（走 jsDelivr，无需 `npm i`）。生产默认关闭。本地静态资源说明见 `public/vendor/*/README.md`。

## Axios

- 封装：`src/utils/request.ts`
- 类型：`src/types/http.ts`
- 用法：`get` / `post` / `put` / `del`，自动解包业务 `data`

## 目录结构

```
env/                 # 环境变量（Vite envDir）
docs/                # 扩展指南
public/vendor/       # local 模式引擎静态资源（可选）
src/
  api/
  config/engine.ts   # Cesium/Three 配置读取
  composables/
  extensions/
  layouts/
  router/
  stores/
  utils/request.ts
  views/
```

路径别名：`@` → `src/`。

## 环境变量（应用）

| 变量 | 说明 |
| --- | --- |
| `VITE_APP_TITLE` | 文档标题前缀 |
| `VITE_APP_PORT` | 开发端口（默认 19001） |
| `VITE_APP_BASE_API` | Axios `baseURL` / 代理前缀 |
| `VITE_APP_TARGET` | 开发代理目标 |

## 扩展阅读

- [扩展指南](./docs/extensions.md)
- [开发常见问题](./FAQ.md)
