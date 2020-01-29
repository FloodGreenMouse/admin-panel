<template lang="pug">
  .page.article
    h1.page-title {{ article.title }}
    .main-image(v-if="article.image")
      img(:src="article.image")
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
import mixinPreviewArticle from '@/mixins/preview-article'
import vButton from '~/components/form/button'
import vModal from '~/components/modal'

export default {
  name: 'article-page',
  mixins: [mixinPreviewArticle],
  components: {
    vButton,
    vModal
  },
  data () {
    return {
      category: 'history'
    }
  },
  asyncData ({ store, params }) {
    return store.dispatch('api/getArticle', {
      category: 'history',
      id: params.article
    }).then(res => {
      return {
        article: res.val()
      }
    }).catch(err => {
      console.warn('Error', err)
      return {}
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
  .article-content {
    margin-bottom: 50px;
  }
</style>
