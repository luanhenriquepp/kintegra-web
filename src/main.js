import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import axios from 'axios';
import "./App.css";



Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
