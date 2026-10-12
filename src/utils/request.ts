import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  DEFAULT_SUCCESS_CODES,
  type ApiResponse,
  type ApiSuccessCode,
} from "@/types/http";
import { notify } from "./message";

export interface RequestOptions {
  /** 跳过业务 code 校验，直接返回 AxiosResponse.data 原始值 */
  raw?: boolean;
  /** 成功业务码；默认 DEFAULT_SUCCESS_CODES */
  successCodes?: ApiSuccessCode[];
  /** 关闭错误 toast（仍 reject） */
  silent?: boolean;
}

type RequestConfig = AxiosRequestConfig & { requestOptions?: RequestOptions };

function isApiResponse(payload: unknown): payload is ApiResponse {
  return (
    !!payload &&
    typeof payload === "object" &&
    "code" in (payload as Record<string, unknown>)
  );
}

function unwrap<T>(payload: unknown, options: RequestOptions = {}): T {
  if (options.raw || !isApiResponse(payload)) {
    return payload as T;
  }

  const codes = options.successCodes ?? DEFAULT_SUCCESS_CODES;
  const { code, msg, message, data } = payload;
  if (codes.includes(code)) {
    return data as T;
  }

  const text = msg || message || "系统出错";
  if (!options.silent) notify("error", text);
  throw new Error(text);
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50_000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在此挂载 token：config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

service.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    const err = error as {
      config?: RequestConfig;
      response?: { data?: { msg?: string; message?: string } };
      message?: string;
    };
    const silent = err.config?.requestOptions?.silent;
    if (!silent) {
      notify(
        "error",
        err.response?.data?.msg ||
          err.response?.data?.message ||
          err.message ||
          "网络异常",
      );
    }
    return Promise.reject(error);
  },
);

async function request<T = unknown>(config: RequestConfig): Promise<T> {
  const { requestOptions, ...axiosConfig } = config;
  // 显式挂到 config，确保错误拦截器也能读到 silent 等选项
  const response = await service.request<unknown>({
    ...axiosConfig,
    requestOptions,
  } as RequestConfig);
  return unwrap<T>(response.data, requestOptions);
}

export function get<T = unknown>(
  url: string,
  config?: RequestConfig,
): Promise<T> {
  return request<T>({ ...config, url, method: "GET" });
}

export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> {
  return request<T>({ ...config, url, method: "POST", data });
}

export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> {
  return request<T>({ ...config, url, method: "PUT", data });
}

export function del<T = unknown>(
  url: string,
  config?: RequestConfig,
): Promise<T> {
  return request<T>({ ...config, url, method: "DELETE" });
}

/** 需要完整 AxiosResponse 时使用（少见） */
export function getHttpClient(): AxiosInstance {
  return service;
}

export default service;
