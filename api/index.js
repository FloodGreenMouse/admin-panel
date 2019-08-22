import firebase from '~/plugins/firebase'

const API = {

  /**
   * Get categories
   * @method GET
   */
  getArticles () {
    return firebase.firebase.database().ref('/articles').once('value')
  },

  /**
   * Get categories
   * @method GET
   * @param id <string>
   */
  getArticle (id) {
    return firebase.firebase.database().ref(`/articles/${id}`).once('value')
  },

  /**
   * Get categories
   * @method GET
   * @param data <object>
   */
  updateArticle (data) {
    const article = {}
    article['/article' + data.alias] = data
    return firebase.firebase.database().ref().child('/articles').update(article,
      function (error) {
        if (error) {
          return 'error'
        } else {
          return 'success'
        }
      })
  },

  /**
   * Get categories
   * @method GET
   * @param data <object>
   */
  addArticle (data) {
    const postKey = firebase.firebase.database().ref().child('/articles').push().key
    const article = {}
    data.id = Date.now()
    data.alias = postKey
    article['/article' + postKey] = data
    return firebase.firebase.database().ref().child('/articles').update(article)
  },

  /**
   * Get categories
   * @method GET
   * @param alias <string>
   */
  deleteArticle (alias) {
    return firebase.firebase.database().ref().child(`/articles/article${alias}`).remove()
  }
}

export default API
