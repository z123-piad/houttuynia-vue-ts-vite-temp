# 本地 Three.js 静态资源

当 `VITE_THREE_LOAD_MODE=local` 且 `VITE_THREE_BASE_URL=/vendor/three/` 时，将构建文件放到本目录：

```text
public/vendor/three/
  three.module.js    # 优先（ESM）
  three.min.js       # 回退（UMD → window.THREE）
```

可从 npm 包 `three/build/` 复制。默认不强制安装；开发环境推荐 `remote` CDN。
