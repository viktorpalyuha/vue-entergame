<template>
  <select class="select">
    <slot></slot>
  </select>
</template>

<style lang="scss" scoped>
.select {
  border: 2px solid black;
  background-color: transparent;
  line-height: 1;
  padding: 1em 2em;
}
</style>
