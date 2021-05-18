<template>
  <div class="pill">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.pill {
  background: none;
  border: 2px solid black;
  border-radius: 16px;
  line-height: 1;
  margin: 0.5em;
  padding: 0.8em 2em;
  color: black;
  transition: 0.3s;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
    box-shadow: inset 10em 0 0 0 black;
  }
}
</style>
