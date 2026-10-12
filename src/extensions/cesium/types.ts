/** 宽松类型：引擎由 CDN/静态资源注入，不依赖 npm `cesium` 包 */
export interface CesiumViewerLike {
  destroy: () => void;
  camera?: {
    flyHome?: (duration?: number) => void;
  };
}

export interface CesiumImageryProviderLike {
  // 标记接口，具体实现由 Cesium 运行时提供
}

export interface CesiumNamespace {
  Viewer: new (
    container: Element,
    options?: Record<string, unknown>,
  ) => CesiumViewerLike;
  Ion?: { defaultAccessToken?: string };
  OpenStreetMapImageryProvider?: new (options?: {
    url?: string;
  }) => CesiumImageryProviderLike;
  ImageryLayer?: new (provider: CesiumImageryProviderLike) => unknown;
}

declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
    Cesium?: CesiumNamespace;
  }
}

export {};
