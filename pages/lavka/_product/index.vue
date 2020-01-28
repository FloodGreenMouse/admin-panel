<template lang="pug">
  .page.product
    h1.page-title {{ product.title }}
    .main-image(v-if="hasImage")
      img(:src="product.image" alt="Товар")
    .prices
      h2.h2 Стоимость товара
      .price(v-for="(item, i) in product.prices" :key="i")
        span.price-title Наименование:
        =" "
        span {{ item.description || 'нет наименования' }}
        =" "
        span.price-title Стоимость:
        =" "
        span {{ item.price }} руб.
    h2.h2 Описание
    .article-content(v-html="product.content")
    .buttons.flex.j-end
      vButton(text="Редактировать" @click="openEditor")
      vButton(text="Удалить" @click="showModal = true" type="error")
    vModal(@close="showModal = false" :show="showModal")
      template(v-slot:header)
        h2 Удалить товар?
      template(v-slot:footer)
        vButton(text="Да" @click="deleteProduct" type="error")
        vButton(text="Отмена" @click="showModal = false" type="secondary")
</template>

<script>
import vButton from '~/components/form/button'
import vModal from '~/components/modal'

export default {
  name: 'product-page',
  components: {
    vButton,
    vModal
  },
  data () {
    return {
      product: {},
      showModal: false
    }
  },
  asyncData ({ store, params }) {
    return store.dispatch('api/getArticle', {
      category: 'lavka',
      id: params.product
    }).then(res => {
      return {
        product: res.val()
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
    openEditor () {
      this.$router.push(`/lavka/product/${this.product.alias}`)
    },
    deleteProduct () {
      this.$store.dispatch('api/deleteArticle', {
        category: 'lavka',
        id: this.product.alias
      })
      setTimeout(() => {
        this.$router.push('/lavka')
      })
    }
  },
  mounted () {
    document.querySelectorAll('oembed[url]').forEach(element => {
      const videoContainer = document.createElement('div')
      const iframe = document.createElement('iframe')
      let url = element.getAttribute('url').replace('youtu.be', 'youtube.com/embed/')
      url = url.replace('watch?v=', '/embed/')
      iframe.setAttribute('width', '100%')
      iframe.setAttribute('height', '100%')
      iframe.setAttribute('src', url)
      iframe.setAttribute('frameborder', '0')
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope')
      videoContainer.appendChild(iframe)
      videoContainer.className = 'video-content'

      element.appendChild(videoContainer)
    })
  }
}
</script>

<style lang="scss">
  .video-content {
    margin-top: 50px;
    margin-bottom: 50px;
    max-height: 480px;
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  .page.product {
    .price {
      margin-bottom: 10px;
      .price-title {
        font-weight: 900;
      }
    }
  }
  .article-content {
    margin-bottom: 50px;
  }
</style>
