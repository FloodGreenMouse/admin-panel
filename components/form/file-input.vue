<template lang="pug">
  .file-input-component
    .flex.a-center
      input(
        type="file"
        name="Добавить изображение"
        ref="file"
        accept=".jpg, .png, .jpeg"
        @change="getFile")
      vButton(
        v-if="fileData === null"
        text="Добавить изображение"
        @click="openImage")
      vButton(
        v-else
        text="Удалить изображение"
        @click="deleteImage")
      span.error(v-if="showError") Узображение больше 1мб!
    .file-info.flex.a-center(v-if="!showError")
      img.preview-image(v-if="imagePreview.length" :src="imagePreview" alt="Изображение")
      span {{ fileDataName }}
      span {{ fileDataSize }}
</template>

<script>
import vButton from '~/components/form/button'

export default {
  name: 'file-input-component',
  components: {
    vButton
  },
  data () {
    return {
      fileData: null,
      fileDataName: '',
      fileDataSize: '',
      showError: false,
      imagePreview: ''
    }
  },
  methods: {
    openImage () {
      this.$refs.file.click()
    },
    deleteImage () {
      this.$refs.file.value = null
      this.fileData = null
      this.fileDataName = ''
      this.fileDataSize = ''
      this.imagePreview = ''
    },
    getFile () {
      const file = this.$refs.file.files[0]
      if (file.size / 1024 < 1000) {
        this.base64 = file
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          this.imagePreview = fileReader.result
        }
        this.showError = false
        this.fileData = file
        this.fileDataName = file.name
        this.fileDataSize = Math.round(file.size / 1024) + 'Kbs'
        this.$emit('input', this.fileData)
      } else {
        this.showError = true
        this.$refs.file.value = null
        this.fileData = null
        this.fileDataName = ''
        this.fileDataSize = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-input-component {
    .preview-image {
      max-width: 100px;
    }
    input {
      display: none;
    }
    span {
      margin-left: 20px;
    }
    .error {
      color: $color-error;
    }
  }
</style>
