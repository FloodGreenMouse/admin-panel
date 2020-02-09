<template lang="pug">
  .menu-link-component.flex.j-between.a-center(@click="isLoading = true")
    .text
      slot
    transition(name="fade")
      vPreloader.preloader(v-if="isLoading")
    nuxt-link(:to="link" @click="$emit('click')")
</template>

<script>
import vPreloader from '@/components/loader/preloader'

export default {
  name: 'menu-link-component',
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    '$route' () {
      setTimeout(() => {
        this.isLoading = false
      }, 200)
    }
  },
  components: {
    vPreloader
  },
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
    .preloader {
      transform-origin: right;
      transform: scale(0.5);
    }
    .text {
      position: relative;
      z-index: 0;
      user-select: none;
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
    border-top: 1px solid;
    border-color: lighten($color-light, 5%);
    background-color: rgba(0, 0, 0, 0.02);
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
</style>
