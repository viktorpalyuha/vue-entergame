<template>
  <base-select @change="onOptionClick">
    <option v-for="option in options" :key="option">{{ option }}</option>
  </base-select>
</template>

<script>
import { useStore } from 'vuex';
import BaseSelect from '../../ui/BaseSelect';
export default {
  components: {
    BaseSelect
  },
  props: ['options'],
  setup() {
    const store = useStore();

    function onOptionClick(event) {
      const filterOption = event.target.value;

      if (filterOption === 'Standard') {
        store.dispatch('games/loadGames');
      } else {
        store.dispatch('games/loadSortedGamesByPrice', filterOption);
      }
    }

    return { onOptionClick };
  }
};
</script>
