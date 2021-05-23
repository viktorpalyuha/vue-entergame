import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import interceptorsSetup from './helpers/interceptors';
import AddSpace from './components/ads/AddSpace';
import prebidSetup from './helpers/ads/prebidConfig';

import './styles/reset.css';

interceptorsSetup();
prebidSetup();

createApp(App)
  .component('add-space', AddSpace)
  .use(store)
  .use(router)
  .mount('#app');
