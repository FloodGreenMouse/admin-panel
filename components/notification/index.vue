<template lang="pug">
.notification-component.flex.j-start.column(:style="`height: ${notifications.length * 150}px`")
  notificationMessage(
    v-for="(notification, i) in notifications"
    :key="i"
    :notification="notification"
    :index="i")
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
    transition: all ease 0.2s;
  }
  @include md {
    .notification-component {
      width: 100%;
      left: 0;
      padding: 0 5px;
    }
  }
</style>
