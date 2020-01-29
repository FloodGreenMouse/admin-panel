export default {
  data () {
    return {
      article: {},
      showModal: false
    }
  },
  methods: {
    openEditor () {
      this.$router.push(`/${this.category}/article/${this.article.alias}`)
    },
    deleteArticle () {
      this.$store.dispatch('api/deleteArticle', this.article)
      setTimeout(() => {
        this.$router.push(`/${this.category}`)
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
