<template>
  <div class="sort">
    <div>
      <categories-list :categories="categories"></categories-list>
    </div>
    <div>
      <price-filter :options="filterOptions"></price-filter>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CategoriesList from './categories/CategoriesList';
import PriceFilter from './price-filter/PriceFilter';

export default {
  components: { CategoriesList, PriceFilter },
  setup() {
    const categories = ref(['Single-player', 'Online', 'Co-op']);
    const filterOptions = ref([
      'Standard',
      'Cheapest first',
      'Most expensive first'
    ]);

    return { categories, filterOptions };
  }
};
</script>

<style lang="scss" scoped>
.sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 325px) and (max-width: 575px) {
  .sort {
    justify-content: center;
  }
}
</style>
