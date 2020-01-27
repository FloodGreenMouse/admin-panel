<template lang="pug">
  .editor-component
    ckeditor(v-model="localValue")
</template>

<script>
import ckeditor from './ckeditor'

export default {
  name: 'editor-componet',
  components: {
    ckeditor
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  watch: {
    localValue () {
      this.$emit('change', this.localValue)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
