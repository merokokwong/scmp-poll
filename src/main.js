import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/css/main.scss";
import moment from "moment";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

Vue.prototype.moment = moment;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
