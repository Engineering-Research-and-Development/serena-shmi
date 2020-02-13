import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import Config from '../config'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.prototype.$http = Axios;
Vue.prototype.$config = Config;

/**
 * SERENA PARSING
 * Having an id (that is a URL) of type serena:9009/serena/1.0/enterprise_types
 * here I take just the resource part from the id (URL) -> serena/1.0/enterprise_types
 * I need it to identify the resource URL to be concatenated to the host URL
*/
Vue.prototype.SerenaResourceAddressFromURL = function (url) {
  return url.substr(url.indexOf("/") + 1);
}

/**
 * Local Nifi PARSING
 * Having an id (that is a URL) of type serena:enterprise/0
 * here I take just the resource part from the id (URL) -> enterprise/0
 * I need it to identify the resource URL to be concatenated to the host URL
*/
Vue.prototype.LocalNifiResourceAddressFromURL = function (url) {
  return url.substr(url.indexOf(":") + 1);
}

/**
 * here I just take the type of metadata from the id (URL) -> enterprise_types
 * I need it to get the list of element of this type
*/
Vue.prototype.SerenaResourceListNameFromURL = function (url) {
  return url.substr(url.lastIndexOf("/") + 1);
}

/**
 * here I take a substring of the id the identifies the single resource name -> enterprise_type
 * I need it for selecting the single element and using GET,PUT and POST
*/
Vue.prototype.SerenaSingleResourceNameFromURL = function (url) {
  return url.slice(0, -1);
}

Vue.component('enterprise-component', {
  template: `
    <router-link tag="li" class="nav-item nav-dropdown" :to="enterprise.url" disabled>
    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
      <i :class="enterprise.classIcon"></i>
      {{enterprise.name}}
    </div>
    <ul class="nav-dropdown-items">
      <slot></slot>
    </ul>
  </router-link>
  `,
  props: {
    enterprise: Object
  }
});

/* eslint-disable */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
