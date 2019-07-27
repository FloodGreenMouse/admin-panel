<template lang="pug">
.header-component
  .header-container.flex.a-center.j-between
    span Администратор
    .menu
      span.logout(@click="logout") Выход
</template>

<script>
export default {
  name: 'header-component',
  methods: {
    logout () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-container {
    width: 100%;
    height: 48px;
    background-color: $color-primary;
    padding: 5px 25px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
