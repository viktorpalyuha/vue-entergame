<template>
  <footer class="footer">
    <div class="footer-container">
      <router-link to="#" class="logo">Entergame</router-link>
      <router-link to="/statistics">Statistics</router-link>
      <p>&copy; All rights reserved</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '../styles/setup/_variables';
@import '../styles/setup/_fonts';

.footer {
  background-color: #f1f1f1;
  padding: 20px 10px;

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1180px;
  }

  a {
    color: black;
    text-decoration: none;
  }

  .logo {
    font-size: 18px;
    font-family: $logo-font;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
