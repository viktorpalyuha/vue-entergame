<template>
  <header class="header">
    <div class="header-container">
      <router-link to="games" class="logo" @click="loadAllGames"
        >Entergame</router-link
      >
      <div class="header-right">
        <the-search></the-search>
        <nav>
          <router-link to="games"
            ><img src="../assets/images/cart.svg" alt=""
          /></router-link>
          <router-link to="login">Log In</router-link>
          <router-link to="register">Sign Up</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from 'vuex';

import TheSearch from '../components/search/TheSearch';

export default {
  components: {
    TheSearch
  },
  setup() {
    const store = useStore();

    function loadAllGames() {
      store.dispatch('games/loadGames');
    }

    return { loadAllGames };
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/setup/_variables';
@import '../styles/setup/_fonts';

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  padding: 6px 12px;

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1180px;
    margin: 0 auto;
  }

  a {
    color: $main-color;
    text-align: center;
    padding: 12px;
    letter-spacing: 2px;
    text-decoration: none;
    font-family: $main-font;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 25px;
    border-radius: 4px;

    img {
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: $hover-color;
    }
  }

  .logo {
    font-size: 40px;
    font-family: $logo-font;
    font-weight: bold;
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
