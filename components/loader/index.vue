<template lang="pug">
.loader-component.flex.center
  .loader
    div
    div
    div
</template>

<script>
export default {
  name: 'loader-component'
}
</script>

<style lang="scss" scoped>
  .loader-component {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: $color-white;
    z-index: 100;
  }
  .loader {
    position: fixed;
    width: 100px;
    height: 100px;
    div {
      position: fixed;
      width: 50px;
      height: 50px;
      border: 5px solid;
      border-radius: 50%;
      border-color: $color-primary transparent transparent transparent;
      animation: spin 1s ease-in-out infinite;
    }
    div:first-child {
      animation-delay: 0.1s;
    }
    div:last-child {
      animation-delay: 0.2s;
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
