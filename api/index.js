import firebase from '~/plugins/firebase'

const API = {

  /**
   * Get categories
   * @method GET
   */
  getArticles (category) {
    return firebase.database().ref(`/${category}`).once('value')
  },

  /**
   * Get categories
   * @method GET
   * @param data <object>
   */
  getArticle (data) {
    return firebase.database().ref(`/${data.category}/${data.category}${data.id}`).once('value')
  },

  /**
   * Get categories
   * @method GET
   * @param data <object>
   */
  updateArticle (data) {
    const article = {}
    if (!data.unique) {
      article[`/${data.category}` + data.alias] = data
    } else {
      article[data.alias] = data
    }
    return firebase.database().ref().child(`/${data.category}`).update(article).then(() => {
      return true
    }).catch(() => {
      return false
    })
  },

  /**
   * Get categories
   * @method GET
   * @param data <object>
   */
  addArticle (data) {
    const postKey = firebase.database().ref().child(`/${data.category}`).push().key
    const article = {}
    data.id = Date.now()
    if (!data.alias) {
      data.alias = postKey
      article[`/${data.category}` + postKey] = data
    } else {
      article[data.alias] = data
    }
    return firebase.database().ref().child(`/${data.category}`).update(article)
  },

  /**
   * Get categories
   * @method GET
   * @param data <object>
   */
  deleteArticle (data) {
    return firebase.database().ref().child(`/${data.category}/${data.category}${data.id}`).remove()
  },

  /**
   * Get categories
   * @method GET
   * @param refreshToken <string>
   */
  checkUser (refreshToken) {
    const user = firebase.auth().currentUser

    if (user) {
      return user.refreshToken === refreshToken
    } else {
      return null
    }
  }
}

export default API
