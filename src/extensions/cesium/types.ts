/** 宽松类型：引擎由 CDN/静态资源注入，不依赖 npm `cesium` 包 */
export interface CesiumViewerLike {
  destroy: () => void;
  camera?: {
    flyHome?: (duration?: number) => void;
  };
}

export interface CesiumNamespace {
  Viewer: new (
    container: Element,
    options?: Record<string, unknown>,
  ) => CesiumViewerLike;
  Ion?: { defaultAccessToken?: string };
}

declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
    Cesium?: CesiumNamespace;
  }
}

export {};
