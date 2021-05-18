import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      categoryStats: [],
      priceStats: []
    };
  },
  mutations: {
    addCategoryStats(state, payload) {
      const categoryIndex = state.categoryStats.findIndex(
        (item) => item.category === payload.category
      );
      if (categoryIndex !== -1) {
        state.categoryStats[categoryIndex] = payload;
      } else {
        state.categoryStats.push(payload);
      }
    },
    addPriceStats(state, payload) {
      state.priceStats[payload.index] = payload.stats;
    }
  },
  actions: {
    async getStatsByCategory(context, payload) {
      try {
        const response = await axios.get(
          `/api/games/statistics?category=${payload}`
        );
        context.commit('addCategoryStats', response.data[0]);
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalAveragePrice(context, payload) {
      try {
        const response = await axios.get('/api/games/statistics');

        context.commit('addPriceStats', {
          index: payload,
          stats: response.data[0]
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getGamesInPriceRange(context, payload) {
      try {
        const response = await axios.get(
          `/api/games/statistics?price=${payload.range}`
        );
        context.commit('addPriceStats', {
          index: payload.index + 1,
          stats: response.data[0]
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    categoryStats(state) {
      return state.categoryStats;
    },
    priceStats(state) {
      return state.priceStats;
    }
  }
};
