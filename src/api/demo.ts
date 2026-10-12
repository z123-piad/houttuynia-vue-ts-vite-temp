import { get, post } from "@/utils/request";

export interface DemoUser {
  id: number;
  name: string;
  role: string;
}

/**
 * 后台示例 API 声明。
 * 开发环境若代理未就绪，页面侧会回退到本地 mock。
 */
export function fetchDemoUsers() {
  return get<DemoUser[]>("/demo/users", {
    requestOptions: { silent: true },
  });
}

export function createDemoUser(payload: Omit<DemoUser, "id">) {
  return post<DemoUser>("/demo/users", payload, {
    requestOptions: { silent: true },
  });
}
