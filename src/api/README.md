# API 模块

按业务域拆分请求，例如：

```ts
// src/api/user.ts
import request from "@/utils/request";

export function fetchProfile() {
  return request.get("/user/profile");
}
```

环境变量 `VITE_APP_BASE_API` 作为 axios `baseURL`，开发环境由 Vite 代理到 `VITE_APP_TARGET`。
