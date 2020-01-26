<template lang="pug">
  .ckeditor-wysiwyg-component
    .editor(
      :value="value"
      ref="editor")
</template>

<script>
import config from './editor-config.js'

export default {
  name: 'ckeditor-wysiwyg-component',
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
      editor: null
    }
  },
  methods: {
    init () {
      window.ClassicEditor.defaultConfig = {
        toolbar: config.toolbar
      }
      window.ClassicEditor
        .create(this.$refs.editor)
        .then(editor => {
          editor.model.document.on('change:data', () => {
            this.$emit('change', editor.getData())
          })
          editor.setData(this.value)
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
