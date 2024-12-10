// src/types/env.d.ts
interface ImportMetaEnv {
    /**
     * 应用标题
     */
    VITE_APP_TITLE: string;
    /**
     * 应用端口
     */
    VITE_APP_PORT: number;
    /**
     * API基础路径(反向代理)
     */
    VITE_APP_BASE_API: string;
    /**
     * 代理后的路径
     */
    VITE_APP_TARGET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
