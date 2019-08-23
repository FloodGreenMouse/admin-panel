<template lang="pug">
  transition(name="fade")
    .modal-component(v-if="show" @click.self="close")
      .modal-content.flex.column.j-between
        .modal-header
          slot(name="header")
        .modal-body
          slot(name="body")
        .modal-footer.flex.j-end
          slot(name="footer")
</template>

<script>
export default {
  name: 'modal-component',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-component {
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: rgba($color-text-dark, 0.3);
    z-index: 99;
    .modal-content {
      background-color: $color-white;
      min-width: 500px;
      min-height: 200px;
      padding: 20px 25px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba($color-text-dark, 0.5);
    }
  }
  @include md {
    .modal-content {
      min-width: auto !important;
      max-width: 95%;
      margin: 0 20px;
      width: 100%;
    }
  }
</style>
