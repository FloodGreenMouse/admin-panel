<template lang="pug">
  .page.edit
    h1.page-title Новая статья
    .editor
      .input-field
        vInput(
          v-model="inputTitle"
          :invalid="!validTitle"
          placeholder="Заголовок статьи"
          @input="validTitle = true"
          required)
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
        vButton(text="Да" type="error" link="/articles")
        vButton(text="Нет" @click="showModal = false")
</template>

<script>
import vButton from '~/components/form/button'
import vEditor from '~/components/editor'
import vModal from '~/components/modal'
import vInput from '~/components/form/input'

export default {
  name: 'edit-page',
  components: {
    vButton,
    vEditor,
    vInput,
    vModal
  },
  data () {
    return {
      inputTitle: '',
      validTitle: true,
      editorData: '',
      showLoading: false,
      showModal: false
    }
  },
  methods: {
    sendData () {
      this.showLoading = true
      this.article = {
        title: this.inputTitle,
        content: this.editorData
      }
      if (this.article.title.length) {
        this.$store.dispatch('api/addArticle', this.article).then(() => {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Новая статья создана' })
          setTimeout(() => {
            this.$router.push(`/articles/${this.article.alias}`)
          }, 500)
        }).catch(err => {
          this.showLoading = false
          console.log('Error', err)
        })
      } else {
        this.showLoading = false
        this.validTitle = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor {
    margin-top: 50px;
    margin-bottom: 20px;
    .input-field {
      margin-bottom: 30px;
      max-width: 300px;
    }
  }
</style>
