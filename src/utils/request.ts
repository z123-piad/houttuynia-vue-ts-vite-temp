import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { notify } from "./message";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50_000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在此挂载 token 等：config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const payload = response.data;
    // 按后端约定调整：此处假定 { code, msg, data }
    if (payload && typeof payload === "object" && "code" in payload) {
      const { code, msg } = payload as { code: string | number; msg?: string };
      if (code === "00000" || code === 0 || code === 200) {
        return payload;
      }
      notify("error", msg || "系统出错");
      return Promise.reject(new Error(msg || "Error"));
    }
    return payload;
  },
  (error: unknown) => {
    const err = error as {
      response?: { data?: { msg?: string } };
      message?: string;
    };
    notify("error", err.response?.data?.msg || err.message || "网络异常");
    return Promise.reject(error);
  },
);

export default service;
