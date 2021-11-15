import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

library.add(faPencilAlt);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
