<template lang="pug">
  .file-input-component
    .flex.column.j-center
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
      .no-image(v-if="!imagePreview.length")
        iconImage
      .preview-image(v-else)
        img(:src="imagePreview" alt="Изображение")
        span {{ fileDataName }}
        =" "
        span {{ fileDataSize }}
</template>

<script>
import vButton from '~/components/form/button'
import iconImage from '~/components/icons/image'

export default {
  name: 'file-input-component',
  components: {
    vButton,
    iconImage
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
    .file-info {
      margin-top: 20px;
      .preview-image {
        max-width: 100px;
        img {
          width: 100%;
        }
      }
      .no-image {
        max-width: 100px;
        svg {
          width: 100%;
        }
      }
      .error {
        color: $color-error;
      }
    }
    input {
      display: none;
    }
  }
</style>
