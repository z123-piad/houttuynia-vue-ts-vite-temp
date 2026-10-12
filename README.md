# Houttuynia Vue3 + Vite + TypeScript 脚手架

面向三类场景的可维护前端脚手架：

1. **大屏 / 数据可视化**（`useScreenScale` / `useRemAdapter`）
2. **Cesium / Three.js GIS 与三维**（可选依赖，文档接入）
3. **管理后台**（路由 + 布局插槽 + 环境配置，不捆绑完整后台模板）

## 技术栈

| 技术 | 说明 |
| --- | --- |
| Vue 3 | 组合式 API |
| Vite 6 | 开发与构建 |
| TypeScript | 类型约束 |
| Vue Router | 路由 |
| Pinia | 状态管理 |
| Axios | HTTP |
| UnoCSS + SCSS | 原子化 + 预处理器 |
| ESLint + Prettier | 规范与格式化 |

Cesium、Three.js、ECharts、UI 组件库等**默认不安装**，见 [docs/extensions.md](./docs/extensions.md)。

## 环境要求

- Node.js ≥ 22.11.0
- 推荐 VS Code + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 快速开始

```bash
npm install
npm run dev
```

常用脚本：

```bash
npm run build       # 类型检查 + 生产构建
npm run preview     # 预览构建产物
npm run typecheck   # 仅类型检查
npm run lint        # ESLint（自动修复）
npm run format      # Prettier
```

开发服务器默认端口见 `env/.env.development` 中的 `VITE_APP_PORT`（默认 `3000`）。

## 目录结构

```
env/                 # 环境变量（Vite envDir）
docs/                # 扩展指南
public/              # 静态资源
src/
  api/               # 接口模块
  components/        # 通用组件（含 SvgIcon）
  composables/       # 大屏缩放等组合式函数
  extensions/        # Cesium / Three 可选接入点
  layouts/           # Blank / Admin 布局
  router/            # 路由表
  stores/            # Pinia
  styles/            # 全局样式与变量
  types/             # 类型声明
  utils/             # request、message 等
  views/             # 页面
  App.vue
  main.ts
```

路径别名：`@` → `src/`（同时配置于 `vite.config.ts` 与 `tsconfig.json`）。

## 内置路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页入口 |
| `/screen` | 大屏缩放示例 |
| `/scene` | Cesium / Three 扩展说明页 |
| `/admin` | 管理后台布局示例 |

## 环境变量

文件位于 `env/`：

| 变量 | 说明 |
| --- | --- |
| `VITE_APP_TITLE` | 文档标题前缀 |
| `VITE_APP_PORT` | 开发端口 |
| `VITE_APP_BASE_API` | Axios `baseURL` / 代理前缀 |
| `VITE_APP_TARGET` | 开发代理目标 |

类型声明：`src/types/env.d.ts`。

## 扩展阅读

- [扩展指南（大屏 / Cesium / Three / 后台）](./docs/extensions.md)
- [开发常见问题](./FAQ.md)

## 设计原则

- **可维护脚手架优先**：只保留路由、布局、环境、请求与扩展点
- **重依赖按需安装**：三维与图表不塞进默认 `dependencies`
- **后台够用即可**：布局插槽就绪，不做成完整 admin 模板
