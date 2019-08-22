<template lang="pug">
  .page.article
    h1.page-title {{ article.title }}
    .article-content(v-html="article.content")
    .buttons.flex.j-end
      vButton(text="Редактировать" @click="openEditor")
      vButton(text="Удалить" @click="showModal = true" type="error")
    vModal(@close="showModal = false" :show="showModal")
      template(v-slot:header)
        h2 Удалить статью?
      template(v-slot:footer)
        vButton(text="Да" @click="deleteArticle" type="error")
        vButton(text="Отмена" @click="showModal = false" type="secondary")
</template>

<script>
import vButton from '~/components/form/button'
import vModal from '~/components/modal'

export default {
  name: 'article-page',
  components: {
    vButton,
    vModal
  },
  data () {
    return {
      article: {},
      showModal: false
    }
  },
  asyncData ({ store, params }) {
    return store.dispatch('api/getArticle', 'article' + params.article).then(res => {
      return {
        article: res.val()
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
    })
  },
  methods: {
    openEditor () {
      this.$router.push(`/articles/article/${this.article.alias}`)
    },
    deleteArticle () {
      this.$store.dispatch('api/deleteArticle', this.article.alias)
      setTimeout(() => {
        this.$router.push('/articles')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-content {
    margin-bottom: 50px;
  }
</style>
