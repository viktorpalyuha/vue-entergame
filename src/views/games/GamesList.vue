<template>
  <div>
    <the-sort></the-sort>
    <div class="games-grid">
      <div class="game" v-for="game in games" :key="game.id">
        <game-item :game="game"></game-item>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import GameItem from '../../components/games/GameItem';
import TheSort from '../../components/sort/TheSort';

export default {
  components: {
    GameItem,
    TheSort
  },
  setup() {
    const store = useStore();

    store.dispatch('games/loadGames');

    const games = computed(() => {
      return store.getters['games/games'];
    });

    return { games };
  }
};
</script>

<style lang="scss" scoped>
.games-grid {
  display: grid;
  gap: 15px;
  max-width: 1180px;
  margin-top: 10px;
}

@media (min-width: 325px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1200px) {
  .games-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
