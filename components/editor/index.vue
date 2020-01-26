<template lang="pug">
  .editor-component
    .editor(
      :value="incomingData"
      ref="editor")
</template>

<script>
import config from './editor-config.js'

export default {
  name: 'editor-component',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    incomingData: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      editorData: this.incomingData
    }
  },
  methods: {
    init () {
      this.value = this.incomingData
      window.ClassicEditor.defaultConfig = {
        toolbar: config.toolbar
      }
      window.ClassicEditor
        .create(this.$refs.editor)
        .then(editor => {
          editor.setData(this.value)
          editor.model.document.on('change:data', () => {
            this.$emit('change', editor.getData())
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>

</style>
