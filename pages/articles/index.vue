<template lang="pug">
  .page.articles
    h1.page-title Статьи
    .articles-listing.flex.wrap
      vArticle(v-for="article in articles" :key="article.id" :title="article.title")
</template>

<script>
// import firebase from '~/plugins/firebase'
import vArticle from '~/components/article'
import vButton from '~/components/form/button'

export default {
  name: 'articles-page',
  components: {
    vArticle,
    vButton
  },
  data () {
    return {
      articles: {}
    }
  },
  asyncData ({ store }) {
    return store.dispatch('api/getArticles').then(res => {
      console.log(res.val())
      return {
        articles: res.val()
      }
    }).catch(err => {
      console.warn('error', err)
    })
  }
}
</script>

<style lang="scss" scoped>
  .articles-listing {
    padding: 20px 0;
  }
</style>
