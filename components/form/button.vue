<template lang="pug">
.button-component
  button(
    @click="$emit('click')"
    :class="[classList, {'loading' : loading }]"
    :disabled="loading"
    :type="role"
    :title="title")
    span.text(:class="{'hide-text': loading}") {{ text }}
    .button-loader(v-if="loading")
  nuxt-link.link(
    v-if="link.length"
    :to="link"
    :title="title")
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
    },
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    classList () {
      if (this.type === 'error') {
        return 'error'
      }
      if (this.type === 'danger') {
        return 'danger'
      }
      if (this.type === 'secondary') {
        return 'secondary'
      }
      if (this.type === 'add') {
        return 'add'
      }
      return 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-component {
    position: relative;
    button {
      padding: 10px 20px;
      margin: 5px 10px 5px 0;
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
        box-shadow: $shadow-button-hovered;
      }
      .text {
        color: $color-white;
        transition: $trs2;
      }
    }
  }

  button.primary {
    background-color: $color-primary;
    color: $color-white;
    &:hover {
      background-color: lighten($color-primary, 5%);
    }
    &:active {
      box-shadow: $shadow-button-active;
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
      box-shadow: $shadow-button-active;
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
      box-shadow: $shadow-button-active;
      background-color: lighten($color-error, 7%);
    }
  }
  button.secondary {
    background-color: darken($color-light, 30%);
    color: $color-white;
    &:hover {
      background-color: darken($color-light, 25%);
    }
    &:active {
      box-shadow: $shadow-button-active;
      background-color: darken($color-light, 18%);
    }
  }
  button.add {
    background-color: $color-primary;
    color: $color-white;
    border-radius: 50%;
    padding: 25px;
    height: 25px;
    width: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    font-size: 25px;
    &:hover {
      background-color: lighten($color-primary, 5%);
    }
    &:active {
      box-shadow: $shadow-button-active;
      background-color: lighten($color-primary, 7%);
    }
  }
  button.loading {
    position: relative;
    background-color: $color-light;
    box-shadow: none;
    cursor: default;
    transition: $trs3;
    animation: button-start-loading 0.2s ease-in-out 1;
    &:hover {
      box-shadow: none;
      background-color: $color-light;
    }
    .button-loader {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      &:after, &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transform-origin: center;
        animation: button-loader 1s ease-in-out infinite;
      }
      &:after {
        border: 3px solid;
        border-color: transparent transparent darken($color-light, 20%) transparent;
        animation-delay: -0.1s;
      }
      &:before {
        border: 3px solid;
        border-color: transparent transparent transparent darken($color-light, 20%);
        animation-delay: 0.1s;
      }
    }
  }
  .link {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  @keyframes button-loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .hide-text {
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
