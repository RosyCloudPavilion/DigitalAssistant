import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import ElementUI, { Notification } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import $ from 'jquery'
import utils from './utils/index.js'
import request from "./utils/request.js";

Vue.prototype.utils = utils

Vue.config.productionTip = false

Vue.prototype.$ = $;

Vue.prototype.request = request

Vue.use(ElementUI, { size: "small" });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
