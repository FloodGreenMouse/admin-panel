export default {
  data () {
    return {
      article: {},
      file: null,
      inputTitle: '',
      editorData: '',
      oldImage: '',
      backPath: '/',
      showLoading: false,
      showModal: false
    }
  },
  computed: {
    hasImage () {
      return this.article.image.length
    }
  },
  methods: {
    deleteImage () {
      this.oldImage = this.article.image
      this.article.image = ''
    },
    sendData () {
      this.showLoading = true
      this.article.title = this.inputTitle
      this.article.content = this.editorData
      if (!this.article.image.length && this.file !== null) {
        this.article.file = this.file
      } else if (this.oldImage.length && this.file === null) {
        this.$store.dispatch('api/deleteImage', {
          category: this.article.category,
          alias: this.article.alias
        })
      }
      this.$store.dispatch('api/updateArticle', this.article).then(res => {
        if (res) {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Статья обновлена' })
          setTimeout(() => {
            this.$router.push(this.backPath)
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
  },
  mounted () {
    this.backPath = `/${this.category}/${this.article.alias}`
  }
}
