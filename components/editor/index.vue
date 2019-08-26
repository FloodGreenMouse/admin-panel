<template lang="pug">
  .editor-component
    ckeditor(
      :editor="editor"
      :config="config"
      v-model="editorData"
      @input="getData")
</template>

<script>
import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'

Vue.use(CKEditor)

export default {
  name: 'editor-component',
  props: {
    incomingData: {
      type: String,
      default: ''
    }
  },
  components: {
    CKEditor
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: this.incomingData,
      config: {
        language: 'ru',
        height: 1000,
        MediaEmbedProvider: {
          removeProviders: ['youtube']
        }
      }
    }
  },
  methods: {
    getData () {
      this.$emit('input', this.editorData)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>

</style>
