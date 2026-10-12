/// <reference types="vite/client" />

declare module "virtual:svg-icons-register" {
  const component: unknown;
  export default component;
}

declare module "virtual:svg-icons-names" {
  const iconsNames: string[];
  export default iconsNames;
}

declare module "virtual:uno.css";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_TARGET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    engines: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  buildTimestamp: number;
};

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}
