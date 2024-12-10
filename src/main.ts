import { createApp } from 'vue'
/** 重置样式 这里引入自定义的重置样式也可 */
import '@unocss/reset/tailwind.css';
import './style.css';
import 'virtual:svg-icons-register';
import App from './App.vue';
import 'uno.css';
import { createPinia } from "pinia";

createApp(App).use(createPinia()).mount('#app')
