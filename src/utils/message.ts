export type MessageLevel = "log" | "info" | "warn" | "error";

/**
 * 轻量消息占位：未接入 UI 组件库前写到控制台。
 * 接入 Element Plus / Ant Design Vue 后，可在此统一替换实现。
 */
export function notify(level: MessageLevel, message: string) {
  const fn = console[level] ?? console.log;
  fn(`[${level}] ${message}`);
}
