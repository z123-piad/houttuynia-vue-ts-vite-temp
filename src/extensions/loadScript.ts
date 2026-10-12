const loadedScripts = new Map<string, Promise<void>>();
const loadedStyles = new Map<string, Promise<void>>();

/** 幂等加载远程 / 本地脚本 */
export function loadScript(src: string): Promise<void> {
  const existing = loadedScripts.get(src);
  if (existing) return existing;

  const task = new Promise<void>((resolve, reject) => {
    const found = document.querySelector<HTMLScriptElement>(
      `script[data-scaffold-src="${src}"]`,
    );
    if (found) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.scaffoldSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`[scaffold] 脚本加载失败: ${src}`));
    document.head.appendChild(script);
  });

  loadedScripts.set(src, task);
  return task;
}

/** 幂等加载样式表 */
export function loadStylesheet(href: string): Promise<void> {
  const existing = loadedStyles.get(href);
  if (existing) return existing;

  const task = new Promise<void>((resolve, reject) => {
    const found = document.querySelector<HTMLLinkElement>(
      `link[data-scaffold-href="${href}"]`,
    );
    if (found) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.scaffoldHref = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`[scaffold] 样式加载失败: ${href}`));
    document.head.appendChild(link);
  });

  loadedStyles.set(href, task);
  return task;
}
