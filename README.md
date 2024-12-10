# houttuynia-vue-ts-vite-temp

# 项目描述

https://juejin.cn/post/7228990409909108793?searchId=202411271559399A30DF14E76A1E6B00B8

* ## 技术栈

  | 技术       | 描述                                         |      |
  | ---------- | -------------------------------------------- | ---- |
  | Vue3       | 渐进式 JavaScript 框架                       |      |
  | Vite       | 前端开发与构建工具                           |      |
  | TypeScript | 微软新推出的一种语言，是 JavaScript 的超集   |      |
  | Pinia      | 新一代状态管理工具                           |      |
  | Vue Router | Vue.js 的官方路由                            |      |
  | VueUse     | 基于Vue组合式API的实用工具集(类比HuTool工具) |      |
  | vue-i18n   | Vue 国际化多语言插件                         |      |
  | Echarts    | 一个基于 JavaScript 的开源可视化图表库       |      |
  |            |                                              |      |

  

* ## **运行环境**

  |                  | 名称           | 备注 |
  | ---------------- | -------------- | ---- |
  | 开发工具         | VSCode         |      |
  | 运行环境         | Node v22.11.0  |      |
  | VSCode插件(必装) | Vue - Official |      |
  |                  |                |      |
  |                  |                |      |





# Vite 配置

## src 路径别名配置

> 相对路径别名配置，使用 @ 代替 src

> 如果添加后不起作用，检查 `tsconfig.json` 文件



## unplugin 自动导入

安装插件 unplugin-auto-import unplugin-vue-components

```ts
// vite.config.ts
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

AutoImport({
  // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
  imports: ["vue"],
  eslintrc: {
    // 是否自动生成 eslint 规则，建议生成之后设置 false
    enabled: true,
    // 指定自动导入函数 eslint 规则的文件
    filepath: "./.eslintrc-auto-import.json",
  },
  // 指定自动导入函数TS类型声明文件路径
  dts: path.resolve(rootDirectory, "types", "auto-imports.d.ts"),
}),
Components({
  dts: path.resolve(rootDirectory, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
}),
```





## 整合 SVG 图标

### 整合 `Iconfont` 第三方图标库

[vite-plugin-svg-icons 官方文档]: (https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)







### 阿里矢量图库





## 整合 SCSS



## 整合 UnoCSS



## 整合 Pinia



## 环境变量



## 反向代理解决跨域



## 整合 Axios



## vue-router 动态路由



## 按钮权限





## 组件封装



## 规范配置
