/** 统一业务响应壳（按后端约定可改） */
export interface ApiResponse<T = unknown> {
  code: string | number;
  msg?: string;
  message?: string;
  data: T;
}

export type ApiSuccessCode = string | number;

/** 默认视为成功的业务码 */
export const DEFAULT_SUCCESS_CODES: ApiSuccessCode[] = ["00000", 0, 200, "200"];
