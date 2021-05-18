import axios from 'axios';
import store from '../store/index';

export default () => {
  axios.interceptors.request.use(
    async (config) => {
      const token = await store.dispatch('getToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};
