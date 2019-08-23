<template lang="pug">
  .menu-link-component
    .text
      slot
    nuxt-link(:to="link" @click="$emit('click')")
</template>

<script>
export default {
  name: 'menu-link-component',
  props: {
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-link-component {
    background-color: $color-white;
    position: relative;
    padding: 10px 20px;
    transition: $trs3;
    font-weight: $font-weight-medium;
    color: lighten($color-text-dark, 10%);
    .text {
      position: relative;
      z-index: 0;
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      text-decoration: none;
    }
    &:hover {
      background-color: lighten($color-light, 5%);
    }
  }
  a.nuxt-link-exact-active {
    border-bottom: 1px solid;
    border-bottom-color: lighten($color-light, 5%);
  }
</style>
