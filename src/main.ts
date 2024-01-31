import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark css
import "@/styles/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// svg icons
import "virtual:svg-icons-register";
// element icons
import * as Icons from "@element-plus/icons-vue";
// custom directives
import directives from "@/utils/directives/index";
// vue Router
import router from "@/routers";
// pinia store
import pinia from "@/stores";
// errorHandler
import errorHandler from "@/utils/errorHandler";
// 预加载全局组件
import * as preComp from "@/utils/preComp";

const app = createApp(App);

app.config.errorHandler = errorHandler;
Object.keys(preComp).forEach(key => {
  app.component(key, preComp[key as keyof typeof preComp]);
});

// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(directives).use(router).use(pinia).mount("#app");
