import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import interceptorsSetup from './helpers/interceptors';
import AddSpace from './components/ads/AddSpace';
import adsSetup from './components/ads/prebidConfig';

import './styles/reset.css';

interceptorsSetup();
adsSetup();

createApp(App)
  .component('add-space', AddSpace)
  .use(store)
  .use(router)
  .mount('#app');
