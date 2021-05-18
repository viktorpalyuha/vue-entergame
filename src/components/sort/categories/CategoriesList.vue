<template>
  <div class="categories-container">
    <base-pill
      v-for="category in categories"
      :key="category"
      @click="onCategoryClicked(category)"
    >
      {{ category }}
    </base-pill>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import BasePill from '../../ui/BasePill';

export default {
  props: ['categories'],
  components: {
    BasePill
  },
  setup() {
    const store = useStore();

    function onCategoryClicked(category) {
      store.dispatch('games/loadGamesByCategory', category);
    }

    return { onCategoryClicked };
  }
};
</script>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  justify-content: space-around;
}
</style>
