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
    return store.dispatch('api/getArticle', {
      category: 'news',
      id: params.article
    }).then(res => {
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
      this.$router.push(`/news/article/${this.article.alias}`)
    },
    deleteArticle () {
      this.$store.dispatch('api/deleteArticle', {
        category: 'news',
        id: this.article.alias
      })
      setTimeout(() => {
        this.$router.push('/news')
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
  .article-content {
    margin-bottom: 50px;
  }
</style>
