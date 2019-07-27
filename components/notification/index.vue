<template lang="pug">
.notification-component.flex.j-start.column(:style="`height: ${notifications.length * 150}px`")
  notificationMessage(
    v-for="(notification, i) in notifications"
    :key="i"
    :message="notification")
</template>

<script>
import notificationMessage from './notification-message'
import { mapState } from 'vuex'

export default {
  name: 'notification-component',
  components: {
    notificationMessage
  },
  computed: {
    ...mapState({
      notifications: state => state.notifications
    })
  }
}
</script>

<style lang="scss" scoped>
  .notification-component {
    position: fixed;
    width: 400px;
    left: 15px;
    bottom: 0;
    background-color: transparent;
    transition: all ease 0.5s;
  }
</style>
