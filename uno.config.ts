import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "full-size": "w-full h-full",
  },
});
