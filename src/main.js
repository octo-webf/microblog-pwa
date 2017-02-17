// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';

Vue.use(VueResource);
Vue.use(VueI18n);
Vue.config.lang = (window.location.pathname === '/en/' ? 'en' : 'fr');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
