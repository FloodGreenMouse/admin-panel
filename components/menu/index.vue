<template lang="pug">
.menu-component
  transition(name="fade")
    .wrapper(v-if="showMenu" @click="closeMenu")
  .menu-container(:class="{'show-menu': showMenu}")
    menuLink(link="/") Главная
    menuLink(
      v-if="section.active"
      v-for="(section, i) in sections"
      :key="i"
      :link="section.link") {{ section.title }}
</template>

<script>
import { sections } from '@/app.config.js'
import { mapState } from 'vuex'
import menuLink from './menu-link'

export default {
  name: 'menu-component',
  components: {
    menuLink
  },
  data () {
    return {
      sections
    }
  },
  watch: {
    '$route' () {
      this.closeMenu()
    }
  },
  computed: {
    ...mapState({
      showMenu: state => state.showMenu
    })
  },
  methods: {
    closeMenu () {
      this.$store.dispatch('showMenu', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba($color-text-dark, 0.2);
    z-index: 2;
    display: none;
  }
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
    transition: $trs3;
    z-index: 3;
  }

  @include md {
    .wrapper {
      display: block;
    }
    .menu-container {
      width: 250px;
      box-shadow: 0 0 10px rgba($color-text-dark, 0.5);
      transform: translateX(-100%);
      z-index: 3;
    }
    .show-menu {
      transform: translateX(0);
    }
  }
</style>
