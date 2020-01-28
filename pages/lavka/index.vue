<template lang="pug">
  .page.products
    h1.page-title Категория: лавка монастыря
    .products-listing.flex.wrap
      vArticle(
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        :link="`/lavka/${product.alias}`")
    .add-product.flex.j-end
      vButton(text="+" type="add" title="Добавить товар" link="/lavka/new-product")
</template>

<script>
import vArticle from '@/components/article'
import vButton from '@/components/form/button'

export default {
  name: 'products-page',
  components: {
    vArticle,
    vButton
  },
  data () {
    return {
      products: {}
    }
  },
  asyncData ({ store }) {
    return store.dispatch('api/getArticles', 'lavka').then(res => {
      return {
        products: res.val()
      }
    }).catch(err => {
      console.warn('error', err)
      return {}
    })
  }
}
</script>

<style lang="scss" scoped>
  .products-listing {
    padding: 20px 0;
  }
  .add-product {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
</style>
