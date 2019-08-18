<template lang="pug">
.menu-component
  .menu-container
    menuLink(link="/") Главная
    menuLink(link="/articles") Статьи
</template>

<script>
import menuLink from './menu-link'

export default {
  name: 'menu-component',
  components: {
    menuLink
  }
}
</script>

<style lang="scss" scoped>
  .menu-container {
    position: fixed;
    left: 0;
    top: 48px;
    padding: 20px 0;
    width: 300px;
    height: calc(100% - 48px);
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: $color-white;
    z-index: 0;
  }
</style>
