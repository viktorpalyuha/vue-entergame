import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import interceptorsSetup from './helpers/interceptors';

import './styles/reset.css';

interceptorsSetup();

createApp(App).use(store).use(router).mount('#app');
