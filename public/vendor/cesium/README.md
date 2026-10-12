# 本地 Cesium 静态资源

当 `VITE_CESIUM_LOAD_MODE=local` 且 `VITE_CESIUM_BASE_URL=/vendor/cesium/` 时，将官方构建产物放到本目录：

```text
public/vendor/cesium/
  Cesium.js
  Cesium.js.map          # 可选
  Widgets/widgets.css
  Workers/
  Assets/
  ThirdParty/
  ...
```

可从 [Cesium 发布包](https://cesium.com/downloads/) 或 npm 包 `cesium/Build/Cesium/` 复制，**不要**提交庞大二进制到 git（可按需加入 `.gitignore`）。
