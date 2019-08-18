import firebase from '~/plugins/firebase'

const API = {

  /**
   * Get categories
   * @method GET
   * @param params <object>
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
  addArticle (data) {
    const postKey = firebase.firebase.database().ref().child('/articles').push().key
    const article = {}
    data.id = Date.now()
    article['/article' + postKey] = data
    return firebase.firebase.database().ref().child('/articles').update(article)
  },

  /**
   * Get categories
   * @method GET
   * @param id <string>
   */
  deleteArticle (id) {
    return firebase.firebase.database().ref().child(`/articles/${id}`).remove()
  }
}

export default API
