<template>
  <div class="card">
    <img :src="game.img_url" :alt="game.name" />
    <div class="container">
      <div class="description-container">
        <h1>
          <b>{{ game.name }}</b>
        </h1>
        <p>Developer: {{ game.developer }}</p>
        <p>{{ game.categories }}</p>
      </div>

      <div class="button-price-container">
        <span>
          <b>${{ game.price }}</b>
        </span>
        <button>Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["game"],
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2px 16px;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;

  img {
    border-radius: 5px 5px 0 0;
    width: 100%;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.8);
  }
}

button {
  transition: 0.25s;
  background: none;
  border: 2px solid;
  line-height: 1;
  margin: 0.5em;
  padding: 1em 2em;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: #8fc866;
    box-shadow: 0 0.5em 0.5em -0.4em black;
    transform: translateY(-0.25em);
  }
}

.button-price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
