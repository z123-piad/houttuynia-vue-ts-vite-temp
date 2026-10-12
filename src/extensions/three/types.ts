/** 宽松类型：Three 由 CDN/静态资源注入，不依赖 npm `three` 包 */
export interface ThreeRendererLike {
  setSize: (w: number, h: number) => void;
  setPixelRatio?: (ratio: number) => void;
  render: (scene: unknown, camera: unknown) => void;
  dispose: () => void;
  domElement: HTMLCanvasElement;
}

export interface ThreeModule {
  Scene: new () => {
    add: (...objects: unknown[]) => void;
  };
  PerspectiveCamera: new (
    fov: number,
    aspect: number,
    near: number,
    far: number,
  ) => {
    position: { set: (x: number, y: number, z: number) => void };
    aspect: number;
    updateProjectionMatrix: () => void;
  };
  WebGLRenderer: new (params?: { antialias?: boolean }) => ThreeRendererLike;
  AmbientLight: new (color?: number, intensity?: number) => unknown;
  DirectionalLight: new (
    color?: number,
    intensity?: number,
  ) => {
    position: { set: (x: number, y: number, z: number) => void };
  };
  BoxGeometry: new (w?: number, h?: number, d?: number) => unknown;
  MeshStandardMaterial: new (params?: Record<string, unknown>) => unknown;
  Mesh: new (
    geometry: unknown,
    material: unknown,
  ) => {
    rotation: { x: number; y: number };
  };
  Color: new (color?: string | number) => unknown;
}

declare global {
  interface Window {
    THREE?: ThreeModule;
  }
}

export {};
