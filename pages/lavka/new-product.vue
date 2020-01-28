<template lang="pug">
  .page.edit
    h1.page-title Новый товар
    .editor
      .flex
        .col-6
          h2.h2 Название товара
          .flex
            .col-4
              .input-field
                vInput(
                  v-model="inputTitle"
                  :invalid="!validTitle"
                  placeholder="Название"
                  @input="validTitle = true"
                  :maxLength="50"
                  required)
          h2.h2 Стоимость товара
          .flex.a-center(v-for="(item, i) in prices" :key="i")
            .input-field.col-2
              vInput(
                v-model="item.price"
                type="number"
                :maxLength="10"
                :placeholder="item.price")
            .input-field.col-4
              vInput.description(
                v-model="item.description"
                :maxLength="50"
                placeholder="Описание")
            a.delete-price(
              v-if="i !== 0"
              @click.prevent="deletePrice(i)"
              href="") Удалить
            a.add-price(
              v-if="i === prices.length - 1"
              @click.prevent="addPrice"
              href="") Добавить
        .col-6
          .file-input
            fileInput(v-model="file")
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
        vButton(text="Да" type="error" link="/lavka")
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
      validTitle: true,
      showLoading: false,
      showModal: false,
      product: {},
      prices: [{
        price: '0',
        description: ''
      }]
    }
  },
  methods: {
    addPrice () {
      this.prices.push({
        price: '0',
        description: ''
      })
    },
    deletePrice (i) {
      this.prices.forEach((price, index) => {
        if (index === i) {
          this.prices.splice(i, 1)
        }
      })
    },
    deleteImage () {
      this.file = null
    },
    sendData () {
      this.showLoading = true
      this.product = {
        category: 'lavka',
        title: this.inputTitle,
        content: this.editorData,
        prices: this.prices
      }
      if (this.file !== null) {
        this.product.file = this.file
      }
      if (this.product.title.length) {
        this.$store.dispatch('api/addArticle', this.product).then(() => {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Новый товар создан' })
          setTimeout(() => {
            this.$router.push(`/lavka/${this.product.alias}`)
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
