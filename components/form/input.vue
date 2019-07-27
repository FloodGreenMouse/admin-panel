<template lang="pug">
.input-component
  input(:type="type" v-model="input")
  label.placeholder(:class="{'placeholder-active': input.length}") {{ placeholder }}
  .border
</template>

<script>
export default {
  name: 'input-component',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-component {
    position: relative;
    margin-top: 25px;
    padding-bottom: 5px;
    border-bottom: 2px solid $color-light;
    z-index: 1;
  }
  .input-component input {
    width: 100%;
    padding: 5px 0 5px 0;
    border: 0;
    outline: none;
    background-color: transparent;
    font-family: $font-family-default;
    font-weight: $font-weight-regular;
    color: $color-text-dark;
    font-size: 16px;
    &:focus ~.placeholder {
      color: $color-primary;
      transform: translate(-10px, -23px) scale(0.75);
    }
    &:focus ~.border {
      width: 100%;
    }
  }
  .placeholder {
    position: absolute;
    bottom: 5px;
    left: 5px;
    opacity: 0.5;
    transform: translateY(0);
    z-index: -1;
    transition: $trs3;
    font-family: $font-family-default;
    font-weight: $font-weight-regular;
    color: $color-text-dark;
    font-size: 16px;
  }
  .placeholder-active {
    color: $color-primary;
    transform: translate(-10px, -23px) scale(0.75);
  }
  .border {
    position: absolute;
    width: 0;
    left: 0;
    bottom: -1px;
    height: 2px;
    background-color: $color-primary;
    transition: $trs3;
  }
</style>
