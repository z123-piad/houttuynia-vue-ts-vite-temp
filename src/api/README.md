# API 模块

基于 `@/utils/request` 的 typed helpers（`get` / `post` / `put` / `del`）。

```ts
import { get } from "@/utils/request";

export interface Profile {
  id: string;
  name: string;
}

export function fetchProfile() {
  return get<Profile>("/user/profile");
}
```

约定：后端返回 `{ code, msg, data }` 时，helpers 会在成功码下直接解析出 `data`。
原始响应可传 `{ requestOptions: { raw: true } }`。

环境变量 `VITE_APP_BASE_API` 作为 axios `baseURL`，开发代理目标为 `VITE_APP_TARGET`。
