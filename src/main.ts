import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import AppWrapper from './AppWrapper.vue'
import * as VueRouter from 'vue-router';
import store from './store';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

library.add(faPencilAlt);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/:filename?', component: App, props: true}
  ],
});


createApp(AppWrapper)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount('#app')
