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
        vButton(text="Да" type="error" :link="`/shrines/${$router.currentRoute.params.edit}`")
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
      editorData: '',
      incomingData: '',
      showLoading: false,
      showModal: false
    }
  },
  asyncData ({ store, params }) {
    return store.dispatch('api/getArticle', {
      category: 'shrines',
      id: params.edit
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
      this.$store.dispatch('api/updateArticle', this.article).then(res => {
        if (res) {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Статья обновлена' })
          setTimeout(() => {
            this.$router.push(`/shrines/${this.article.alias}`)
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
