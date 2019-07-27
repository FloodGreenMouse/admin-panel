<template lang="pug">
.notification-message-component
  .header
    span.title {{ message }}
  .body
    span Неправильно введен логин или пароль
</template>

<script>
// TODO: Добавить кастом тайтл\сообщение из стора + тип сообщения
export default {
  name: 'notification-message',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timer: null,
      hideTimer: null,
      hide: false
    }
  },
  methods: {
    deleteMessage () {
      this.$store.dispatch('deleteNotification')
      clearTimeout(this.hideTimer)
      clearTimeout(this.timer)
    }
  },
  mounted () {
    this.hideTimer = setTimeout(() => {
      this.$el.classList.add('hide')
    }, 4500)
    this.timer = setTimeout(() => {
      this.deleteMessage()
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
  .notification-message-component {
    background-color: $color-error;
    width: 400px;
    height: 150px;
    border-radius: 5px;
    padding: 15px 15px;
    margin-bottom: 10px;
    animation: reveal 0.2s ease 1;
    & * {
      color: $color-white;
    }
  }
  .hide {
    animation: hide 0.2s ease 1 forwards;
  }
  @keyframes hide {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }
  @keyframes reveal {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .body {
    margin-top: 20px;
  }
  .title {
    font-weight: $font-weight-bold;
    font-size: 20px;
  }
</style>
