<template>
  <section class="stats-container">
    <add-space
      path="/19968336/header-bid-tag-2"
      :sizes="smallBannerSizes"
      :mapping="smallBannerMapping"
      divId="div-2"
    ></add-space>
    <div class="category-stats">
      <h1>Category Statistics</h1>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount of games by category</th>
            <th>Average price</th>
            <th>Highest price</th>
            <th>Lowest price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoryStats" :key="category">
            <td>{{ category.category }}</td>
            <td>{{ category.numberOfGames }}</td>
            <td>{{ category.avgPrice }}</td>
            <td>{{ category.highestPrice }}</td>
            <td>{{ category.lowestPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="price-stats">
      <h1>Price Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Total average price</th>
            <th>Number of games in $1-100 range</th>
            <th>Number of games in $100-200 range</th>
            <th>Number of games in $200-300 range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="price in priceStats" :key="price">
              {{ price?.avgPrice || price?.numberOfGames || 0 }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { smallBannerSizes } from '../../helpers/ads/adsSizes';
import { smallBannerMapping } from '../../helpers/ads/adsMapping';

export default {
  setup() {
    const store = useStore();

    const categories = ref([
      'Single-player',
      'Online',
      'Co-op',
      'PvP',
      'Multiplayer'
    ]);
    const priceRanges = ref([0, 100, 200]);

    categories.value.map((category) => {
      store.dispatch('statistics/getStatsByCategory', category);
    });

    store.dispatch('statistics/getTotalAveragePrice', 0);

    priceRanges.value.map((price, index) => {
      store.dispatch('statistics/getGamesInPriceRange', {
        index,
        range: price
      });
    });

    const categoryStats = computed(() => {
      return store.getters['statistics/categoryStats'];
    });

    const priceStats = computed(() => {
      return store.getters['statistics/priceStats'];
    });

    return { categoryStats, priceStats, smallBannerSizes, smallBannerMapping };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/setup/_fonts';

.stats-container {
  text-align: center;
}

table {
  width: 100%;
}

tr {
  &:nth-of-type(odd) {
    background-color: #cdd2d2;
  }
}
td {
  color: black;
  padding: 10px 0px;
}

th {
  padding: 0px 15px;
  height: 40px;
  background-color: #0c0f0a;
  vertical-align: middle;
  font-family: $secondary-font;
  font-size: 18px;
  color: white;
}

.price-stats,
.category-stats {
  h1 {
    font-family: $secondary-font;
    font-weight: bold;
    font-size: 2em;
  }
}

.price-stats {
  margin-top: 40px;
}
</style>
