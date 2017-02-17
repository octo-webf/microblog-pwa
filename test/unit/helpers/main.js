import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(VueI18n);

window.VueResource = VueResource;
window.VueI18n = VueI18n;
window.Vue = Vue;
