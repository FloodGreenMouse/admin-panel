<template lang="pug">
  .page.edit
    h1.page-title Редактирование товара
    .editor
      h2.h2 Название товара
      .input-field.col-4
        vInput(
          v-model="inputTitle"
          :incomingData="article.title"
          :maxLength="50"
          placeholder="Название товара")
      h2.h2 Стоимость товара
      .flex.a-center(v-for="(item, i) in article.prices" :key="i")
        .input-field.col-2
          vInput(
            v-model="item.price"
            :incomingData="item.price"
            type="number"
            :maxLength="10"
            :placeholder="item.price")
        .input-field.col-2
          vInput.description(
            v-model="item.description"
            :incomingData="item.description"
            :maxLength="50"
            placeholder="Описание")
        a.delete-price(
          v-if="i !== 0"
          @click.prevent="deletePrice(i)"
          href="") Удалить
        a.add-price(
          v-if="i === article.prices.length - 1"
          @click.prevent="addPrice"
          href="") Добавить
      h2.h2 Описание
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
        vButton(text="Да" type="error" :link="`/lavka/${$router.currentRoute.params.edit}`")
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
      category: 'lavka',
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
    addPrice () {
      this.article.prices.push({
        price: '0',
        description: ''
      })
    },
    deletePrice (i) {
      this.article.prices.forEach((price, index) => {
        if (index === i) {
          this.article.prices.splice(i, 1)
        }
      })
    },
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
            message: 'Продукт обновлен' })
          setTimeout(() => {
            this.$router.push(`/lavka/${this.article.alias}`)
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
    .input-field .description {
      margin-left: 10px;
    }
    .cost {
      display: inline-block;
      margin-bottom: 30px;
    }
    .add-price, .delete-price {
      margin-left: 10px;
    }
    .add-price {
      color: $color-primary;
    }
    .delete-price {
      color: $color-error;
    }
  }
</style>
