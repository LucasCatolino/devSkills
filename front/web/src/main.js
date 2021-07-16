import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// Require dependencies
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

// Para el correcto funcionamineto del login
export const logInBus = new Vue();
export const comparator = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
