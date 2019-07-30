<template lang="pug">
.notification-message-component(:class="notification.type")
  .header
    span.title {{ notification.title }}
  .body
    span {{ notification.message }}
</template>

<script>
// TODO: Добавить анимацию скрытия сообщения
export default {
  name: 'notification-message',
  props: {
    notification: {
      type: Object,
      default: () => {}
    },
    index: Number
  },
  data () {
    return {
      timer: null,
      hideTimer: null,
      hide: false
    }
  },
  mounted () {
    this.$el.onmousemove = e => {
      this.$el.style.transform = `translate(${e.offsetX / 80}px, ${e.offsetY / 80}px)`
    }
  }
}
</script>

<style lang="scss" scoped>
  .notification-message-component {
    width: 400px;
    height: 150px;
    border-radius: 5px;
    padding: 15px 15px;
    margin-bottom: 20px;
    opacity: 0.8;
    box-shadow: 0 0 10px rgba($color-text-dark, 0.5);
    animation: reveal 0.4s ease 1;
    cursor: default;
    transition: $trs2;
    &:hover {
      box-shadow: 5px 2px 10px rgba($color-text-dark, 0.5);
    }
    & * {
      color: $color-white;
    }
  }
  .hide {
    animation: hide 0.2s ease 1 forwards;
  }
  @keyframes hide {
    0% {
      opacity: 0.8;
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
      transform: translateY(50px) scale(0);
    }
    100% {
      opacity: 0.8;
      transform: translateY(0) scale(1);
    }
  }
  .body {
    margin-top: 20px;
  }
  .title {
    font-weight: $font-weight-bold;
    font-size: 20px;
  }
  .info {
    background-color: $color-info;
  }
  .warning {
    background-color: $color-danger;
  }
  .error {
    background-color: $color-error;
  }
</style>
