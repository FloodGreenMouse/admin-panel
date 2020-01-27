<template lang="pug">
  .page.edit
    h1.page-title Редактирование статьи
    .editor
      .input-field
        vInput(
          v-model="inputTitle"
          :incomingData="article.title"
          :maxLength="50"
          placeholder="Заголовок статьи")
      .file-input(v-if="!article.image")
        fileInput(v-model="file")
      .file-input.main-image(v-else)
        img(:src="article.image" alt="Изображение")
        vButton(@click="deleteImage" text="Удалить изображение")
      vEditor(v-model="editorData")
    .buttons.flex.j-end
      vButton(
        text="Сохранить"
        @click="sendData"
        :loading="showLoading")
      vButton(
        text="Отмена"
        @click="showModal = true"
        type="secondary")
    vModal(@close="showModal = false" :show="showModal")
      template(v-slot:header)
        h2 Отменить редактирование?
      template(v-slot:footer)
        vButton(text="Да" type="error" link="/needs")
        vButton(text="Нет" @click="showModal = false")
</template>

<script>
import vButton from '@/components/form/button'
import vEditor from '@/components/editor'
import vModal from '@/components/modal'
import vInput from '@/components/form/input'
import fileInput from '@/components/form/file-input'

export default {
  name: 'edit-page',
  components: {
    vButton,
    vEditor,
    vInput,
    vModal,
    fileInput
  },
  data () {
    return {
      file: null,
      inputTitle: '',
      editorData: '',
      showLoading: false,
      showModal: false
    }
  },
  asyncData ({ store }) {
    return store.dispatch('api/getArticle', {
      category: 'other',
      id: '-needs'
    }).then(res => {
      return {
        article: res.val(),
        inputTitle: res.val().title,
        editorData: res.val().content
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
  },
  methods: {
    sendData () {
      this.showLoading = true
      this.article.title = this.inputTitle
      this.article.content = this.editorData
      if (!this.article.image) {
        this.article.file = this.file
      }
      this.article.unique = true
      this.$store.dispatch('api/updateArticle', this.article).then(res => {
        if (res) {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Статья обновлена' })
          setTimeout(() => {
            this.$router.push('/needs')
          }, 500)
        } else {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'error',
            title: 'Ошибка',
            message: 'Возникла какая-то ошибка' })
          console.log('Error')
        }
      })
    },
    deleteImage () {
      this.article.image = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .page.edit {
    //
  }
</style>
