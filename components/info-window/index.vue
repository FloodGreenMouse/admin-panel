<template lang="pug">
  .info-window-component
    .header
      span {{ title }}
    .body
      slot
</template>

<script>
export default {
  name: 'info-window-component',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$el.classList.add('reveal')
  }
}
</script>

<style lang="scss">
  .info-window-component {
    .body span * {
      color: $color-primary;
    }
  }
</style>

<style lang="scss" scoped>
  .info-window-component {
    border-radius: 3px;
    background-color: rgba($color-primary, 0.1);
    margin: 10px 0;
    overflow: hidden;
    opacity: 0;
    .header {
      padding: 10px 20px;
      background-color: rgba($color-primary, 0.2);
      span {
        color: $color-primary;
        font-weight: 500;
        font-size: 18px;
      }
    }
    .body {
      padding: 20px 25px;
      span {
        color: $color-primary;
        font-size: 16px;
      }
    }
  }
  .reveal {
    animation: reveal 0.5s 0.2s ease 1 forwards;
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
</style>
