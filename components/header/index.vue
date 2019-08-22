<template lang="pug">
.header-component
  .header-container.flex.a-center.j-between
    span Администратор
    .menu
      span.logout(@click="logout") Выход
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  name: 'header-component',
  methods: {
    logout () {
      firebase.firebase.auth().signOut()
        .then(() => {
          window.localStorage.removeItem('token')
          this.$store.dispatch('deleteUserToken')
          this.$router.push('/login')
        })
        .catch(err => {
          console.warn('error', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .logout {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
</style>
