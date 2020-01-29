export default {
  data () {
    return {
      file: null,
      inputTitle: '',
      validTitle: true,
      editorData: '',
      showLoading: false,
      showModal: false
    }
  },
  methods: {
    deleteImage () {
      this.file = null
    },
    sendData () {
      this.showLoading = true
      this.article = {
        category: this.category,
        title: this.inputTitle,
        content: this.editorData,
        image: ''
      }
      if (this.file !== null) {
        this.article.file = this.file
      }
      if (this.article.title.length) {
        this.$store.dispatch('api/addArticle', this.article).then(() => {
          this.showLoading = false
          this.$store.dispatch('addNotification', {
            type: 'info',
            title: 'Успешно',
            message: 'Новая статья создана' })
          setTimeout(() => {
            this.$router.push(`/${this.category}/${this.article.alias}`)
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
