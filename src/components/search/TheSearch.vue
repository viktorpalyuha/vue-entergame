<template>
  <form @submit.prevent>
    <input
      type="text"
      placeholder="Search"
      class="search"
      @keydown.enter="findGamesByName"
    />
  </form>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    function findGamesByName(event) {
      const inputValue = event.target.value;
      if (!inputValue.trim()) {
        store.dispatch('games/loadGames');
      } else {
        store.dispatch('games/loadGamesByName', inputValue);
      }
    }

    return { findGamesByName };
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 190px;
  height: 30px;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #ccc;
}
</style>
