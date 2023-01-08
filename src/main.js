import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import x2js from "x2js"; //xml数据处理插件
Vue.prototype.$x2js = new x2js(); //全局方法挂载

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
