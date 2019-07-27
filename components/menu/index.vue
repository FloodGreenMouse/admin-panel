<template lang="pug">
.menu-component
  .menu-container
</template>

<script>
export default {
  name: 'menu-component'
}
</script>

<style lang="scss" scoped>
  .menu-container {
    position: fixed;
    left: 0;
    top: 48px;
    width: 300px;
    height: calc(100% - 48px);
    overflow-y: scroll;
    background-color: $color-white;
    z-index: 0;
  }
</style>
