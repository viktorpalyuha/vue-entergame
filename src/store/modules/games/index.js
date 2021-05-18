import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      games: null
    };
  },
  mutations: {
    setGames(state, payload) {
      state.games = payload;
    }
  },
  actions: {
    async loadGames(context) {
      try {
        const response = await axios.get('/api/games');
        context.commit('setGames', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async loadGamesByCategory(context, payload) {
      try {
        const response = await axios.get(`/api/games/category/${payload}`);
        context.commit('setGames', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async loadGamesByName(context, payload) {
      try {
        const response = await axios.get(`/api/games/search/${payload}`);
        context.commit('setGames', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async loadSortedGamesByPrice(context, payload) {
      try {
        const expensiveness = payload === 'Cheapest first' ? 'low' : 'highest';
        const response = await axios.get(
          `/api/games/sort?from=${expensiveness}`
        );
        context.commit('setGames', response.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    games(state) {
      return state.games;
    }
  }
};
