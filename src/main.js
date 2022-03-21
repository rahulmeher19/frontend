import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store/index.js';
import axios from 'axios'

Vue.config.productionTip = false

// axios configuration
Vue.use(axios);

let headers = {
  'content-type' : 'application/json',
};

if(localStorage.getItem('NiTOROM-TOKEN')) {
  headers.authorization = 'Bearer ' + localStorage.getItem('NiTOROM-TOKEN');
}

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: headers,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#nitorom');
