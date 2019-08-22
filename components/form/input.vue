<template lang="pug">
.input-component(:class="{'invalid-input': invalid}")
  input(
    :type="type"
    v-model="input"
    @change="getValue(input)"
    :required="required")
  label.placeholder(:class="{'placeholder-active': input.length}") {{ placeholder }}
  .border
  transition(name="tooltip")
    .tooltip(v-if="required && invalid")
      span.tooltip-text Обязательное поле
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
    },
    required: {
      type: Boolean
    },
    invalid: {
      type: Boolean
    },
    incomingData: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input: this.incomingData
    }
  },
  methods: {
    getValue (input) {
      this.$emit('input', input)
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
    transition: $trs3;
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
      transform: translate(-10px, -30px) scale(0.75);
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
    transform: translate(-10px, -30px) scale(0.75);
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
  .invalid-input {
    border-bottom: 2px solid $color-error;
    animation: invalid-input ease 0.2s 1;
    .border {
      background-color: $color-error;
    }
  }
  @keyframes invalid-input {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .tooltip {
    position: absolute;
    right: 0;
    bottom: 8px;
    border-radius: 3px;
    padding: 5px 10px;
    background-color: $color-error;
    box-shadow: 0 0 5px rgba($color-text-dark, 0.3);
    opacity: 0.8;
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      margin: auto;
      width: 10px;
      height: 10px;
      border-top: 11px solid $color-error;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      opacity: 1;
    }
    .tooltip-text {
      font-size: 12px;
      color: $color-white;
    }
  }

  .tooltip-enter {
    opacity: 0;
    transform: translateY(-5px);
  }

  .tooltip-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  .tooltip-enter-active, .tooltip-leave-active {
    transition: all .3s ease;
  }
</style>
