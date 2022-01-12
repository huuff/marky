import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import AppWrapper from './AppWrapper.vue'
import * as VueRouter from 'vue-router';
import "bootstrap";
import { createPinia } from "pinia"
import "bootstrap/dist/css/bootstrap.min.css";

library.add(faPencilAlt);
library.add(faSave);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/:routeName?', component: App, props: true}
  ],
});


createApp(AppWrapper)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .mount('#app')
