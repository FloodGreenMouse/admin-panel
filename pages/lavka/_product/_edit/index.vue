<template lang="pug">
  .page.edit
    h1.page-title Редактирование товара
    .editor
      .flex
        .col-6
          h2.h2 Название товара
          .input-field.col-4
            vInput(
              v-model="inputTitle"
              :incomingData="product.title"
              :maxLength="50"
              placeholder="Название товара")
          h2.h2 Стоимость товара
          .flex.a-center(v-for="(item, i) in product.prices" :key="i")
            .input-field.col-2
              vInput(
                v-model="item.price"
                :incomingData="item.price"
                type="number"
                :maxLength="10"
                :placeholder="item.price")
            .input-field.col-4
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
              v-if="i === product.prices.length - 1"
              @click.prevent="addPrice"
              href="") Добавить
        .col-6
          .file-input(v-if="!hasImage")
            fileInput(v-model="file")
          .file-input.main-image(v-else)
            img(:src="product.image" alt="Изображение")
            vButton(@click="deleteImage" text="Удалить изображение")
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
        product: res.val(),
        inputTitle: res.val().title,
        editorData: res.val().content
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
  },
  computed: {
    hasImage () {
      return this.product.image.length
    }
  },
  methods: {
    addPrice () {
      this.product.prices.push({
        price: '0',
        description: ''
      })
    },
    deletePrice (i) {
      this.product.prices.forEach((price, index) => {
        if (index === i) {
          this.product.prices.splice(i, 1)
        }
      })
    },
    deleteImage () {
      this.product.image = ''
    },
    sendData () {
      this.showLoading = true
      this.product.title = this.inputTitle
      this.product.content = this.editorData
      if (!this.product.image && this.file !== null) {
        this.product.file = this.file
      } else if (!this.product.image) {
        this.$store.dispatch('api/deleteImage', {
          category: 'lavka',
          alias: this.product.alias
        })
      }
      this.$store.dispatch('api/updateArticle', this.product).then(res => {
        if (res) {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Продукт обновлен' })
          setTimeout(() => {
            this.$router.push(`/lavka/${this.product.alias}`)
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
