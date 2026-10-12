# 开发常见问题

## 1. SVG 图标 `fill` / `color` 不生效

原因：部分 SVG 文件自带 `fill` 属性，会覆盖组件传入颜色。

处理：编辑 `src/icons/*.svg`，删除内部硬编码的 `fill`（需要保留的结构色除外）。

## 2. 找不到模块 `@/components/xxx.vue` 类型声明

确认：

1. `tsconfig.json` 中 `paths` 已配置 `"@/*": ["./src/*"]`
2. `src/types/env.d.ts` 中声明了 `*.vue` 模块
3. VS Code 使用 Vue - Official（Volar），并禁用 Vetur

## 3. 环境变量读不到

- 变量名必须以 `VITE_` 开头
- 文件放在 `env/`（见 `vite.config.ts` 的 `envDir`）
- 修改后需重启 `npm run dev`

## 4. 代理不生效

检查 `env/.env.development` 中 `VITE_APP_BASE_API` 与 `VITE_APP_TARGET`，请求需走该前缀（与 `src/utils/request.ts` 的 `baseURL` 一致）。
