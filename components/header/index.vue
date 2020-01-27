<template lang="pug">
.header-component
  .header-container.flex.a-center.j-between
    .logo.flex.a-center
      button(@click="toggleMenu")
        menuIcon.icon
      nuxt-link(to="/") Админ-панель
    .menu
      span.logout(@click="logout") Выход
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
import menuIcon from '~/components/icons/menu'
import cookie from 'vue-cookie'

export default {
  name: 'header-component',
  components: {
    menuIcon
  },
  computed: {
    ...mapState({
      showMenu: state => state.showMenu
    })
  },
  methods: {
    toggleMenu () {
      if (!this.showMenu) {
        this.$store.dispatch('showMenu', true)
      } else {
        this.$store.dispatch('showMenu', false)
      }
    },
    logout () {
      firebase.auth().signOut()
        .then(() => {
          cookie.delete('token')
          this.$store.dispatch('deleteUserToken')
          this.$router.push('/login')
        })
        .catch(() => {
          console.warn('error')
        })
    }
  }
}
</script>

<style lang="scss">
  .logo {
    @include svg($color-white)
  }
</style>

<style lang="scss" scoped>
  .header-component {
    a {
      text-decoration: none;
    }
    .header-container {
      position: fixed;
      width: 100%;
      height: 48px;
      background-color: $color-primary;
      padding: 5px 25px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      z-index: 2;
      * {
        color: $color-white;
      }
    }
    .logo {
      cursor: default;
      user-select: none;
      button {
        background-color: transparent;
        border: 0;
      }
      .icon {
        display: none;
      }
    }
    .logout {
      cursor: pointer;
      user-select: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @include md {
    .header-component {
      .logo {
        .icon {
          display: block;
        }
        span {
          margin-left: 20px;
        }
      }
    }
  }
</style>
