<template lang="pug">
  .page.articles
    h1.page-title Категория: новости
    .articles-listing.flex.wrap
      vArticle(
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :link="`/news/${article.alias}`")
    .add-article.flex.j-end
      vButton(text="+" type="add" title="Добавить статью" link="/news/new-article")
</template>

<script>
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
    return store.dispatch('api/getArticles', 'news').then(res => {
      return {
        articles: res.val()
      }
    }).catch(err => {
      console.warn('error', err)
      return {}
    })
  }
}
</script>

<style lang="scss" scoped>
  .articles-listing {
    padding: 20px 0;
  }
  .add-article {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
</style>
