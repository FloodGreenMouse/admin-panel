<template lang="pug">
  .page.edit
    h1.page-title Новая статья
    .editor
      .flex
        .col-6
          h2.h2 Заголовок статьи
          .flex
            .col-4
              .input-field
                vInput(
                  v-model="inputTitle"
                  :invalid="!validTitle"
                  placeholder="Заголовок статьи"
                  @input="validTitle = true"
                  :maxLength="50"
                  required)
        .col-6
          .file-input
            fileInput(v-model="file")
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
        vButton(text="Да" type="error" link="/news")
        vButton(text="Нет" @click="showModal = false")
</template>

<script>
import mixinNewArticle from '@/mixins/new-article'
import vButton from '@/components/form/button'
import vEditor from '@/components/editor'
import vModal from '@/components/modal'
import vInput from '@/components/form/input'
import fileInput from '@/components/form/file-input'

export default {
  name: 'edit-page',
  mixins: [mixinNewArticle],
  components: {
    vButton,
    vEditor,
    vInput,
    vModal,
    fileInput
  },
  data () {
    return {
      category: 'history'
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
