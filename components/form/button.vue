<template lang="pug">
.button-component
  button(@click="$emit('click')" :class="type") {{ text }}
</template>

<script>
export default {
  name: 'button-component',
  props: {
    text: {
      type: String,
      default: 'Выбор'
    },
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-component button {
    padding: 10px 20px;
    margin: 5px 10px;
    border: 0;
    border-radius: 5px;
    background-color: $color-white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: $font-weight-medium;
    outline: none;
    cursor: pointer;
    transition: $trs2;
    &:hover {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }
  }
  button.primary {
    background-color: $color-primary;
    color: $color-white;
    &:hover {
      background-color: lighten($color-primary, 5%);
    }
    &:active {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
      background-color: lighten($color-primary, 7%);
    }
  }
  button.danger {
    background-color: $color-danger;
    color: $color-white;
    &:hover {
      background-color: lighten($color-danger, 5%);
    }
    &:active {
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
      background-color: lighten($color-danger, 7%);
    }
  }
  button.error {
    background-color: $color-error;
    color: $color-white;
    &:hover {
      background-color: lighten($color-error, 5%);
    }
    &:active {
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
      background-color: lighten($color-error, 7%);
    }
  }
</style>
