<template lang="pug">
  .page.edit
    h1.page-title Редактирование статьи
    .editor
      .flex
        .col-6
          h2.h2 Заголовок статьи
          .flex
            .col-4
              .input-field
                vInput(
                  v-model="inputTitle"
                  :incomingData="article.title"
                  placeholder="Заголовок статьи"
                  @input="validTitle = true"
                  :maxLength="50"
                  required)
        .col-6
          .file-input(v-if="!hasImage")
            fileInput(v-model="file")
          .file-input.article-image(v-else)
            vButton(@click="deleteImage" text="Удалить изображение")
            img(:src="article.image" alt="Изображение")
      h2.h2 Контент
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
import mixinEditArticle from '@/mixins/edit-article'
import vButton from '@/components/form/button'
import vEditor from '@/components/editor'
import vModal from '@/components/modal'
import vInput from '@/components/form/input'
import fileInput from '@/components/form/file-input'

export default {
  name: 'edit-page',
  mixins: [mixinEditArticle],
  components: {
    vButton,
    vEditor,
    vInput,
    vModal,
    fileInput
  },
  data () {
    return {
      category: 'needs'
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
  mounted () {
    this.article.unique = true
    this.backPath = `/${this.category}`
  }
}
</script>

<style lang="scss" scoped>
  .page.edit {
    //
  }
</style>
