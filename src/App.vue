<template>
  <div class="container">
    <the-header></the-header>
    <main class="main">
      <router-view></router-view>
      <the-chat v-if="isChatShown"></the-chat>
    </main>
    <the-footer class="footer"></the-footer>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import TheChat from './views/chat/TheChat';

export default {
  setup() {
    const store = useStore();

    function isChatShown() {
      return store.dispatch('isAuthenticated');
    }

    return { isChatShown };
  },
  components: {
    TheHeader,
    TheChat,
    TheFooter
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 0 auto;
}

.main {
  margin: 70px auto 20px auto;
}

.footer {
  margin: auto 0 0 0;
}
</style>
