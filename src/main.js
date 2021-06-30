import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import interceptorsSetup from './helpers/interceptors';
import sizeConfigSetup from './helpers/ads/sizeConfig';
import AddSpace from './components/ads/AddSpace';

import './styles/reset.css';

interceptorsSetup();
sizeConfigSetup();

createApp(App)
  .component('add-space', AddSpace)
  .use(store)
  .use(router)
  .mount('#app');
