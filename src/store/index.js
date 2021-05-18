import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createStore } from 'vuex';

import gamesModule from './modules/games/index';
import statisticsModule from './modules/statistics/index';
import chatModule from './modules/chat/index';

export default createStore({
  state() {
    return {};
  },
  mutations: {},
  actions: {
    async register(_, payload) {
      try {
        await axios.post('/api/auth/register', {
          full_name: payload.fullName.value,
          email: payload.email.value,
          password: payload.password.value
        });
      } catch (error) {
        console.log(error);
      }
    },
    async login(_, payload) {
      try {
        const response = await axios.post('/api/auth/login', {
          email: payload.email.value,
          password: payload.password.value
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    setToken(_, authResult) {
      localStorage.setItem('JWT_token', authResult.JWT_token);
    },
    getToken() {
      return localStorage.getItem('JWT_token');
    },
    async isAuthenticated(context) {
      const token = await context.dispatch('getToken');

      if (!token) {
        return false;
      }

      const decoded = jwt_decode(token);

      if (decoded.exp < Date.now() / 1000) {
        return false;
      } else {
        return true;
      }
    },
    initFacebook() {
      window.FB.init({
        appId: '140451171241667',
        status: false,
        cookie: false,
        xfbml: false,
        version: 'v10.0'
      });
    },
    async fbLogin(context) {
      await context.dispatch('initFacebook');
      return new Promise((resolve, reject) => {
        window.FB.login(
          (result) => {
            if (result.authResponse) {
              axios
                .post(`/api/auth/facebook`, {
                  access_token: result.authResponse.accessToken
                })
                .then((response) => {
                  if (!response.data.JWT_token) {
                    throw Error;
                  }
                  return resolve(response.data);
                })
                .catch(() => reject(new Error('No token found')));
            }
          },
          { scope: 'public_profile, email' }
        );
      });
    }
  },
  modules: {
    games: gamesModule,
    statistics: statisticsModule,
    chat: chatModule
  }
});
