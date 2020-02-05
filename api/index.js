import firebase from '~/plugins/firebase'

const API = {

  /**
   * Get articles
   * @method GET
   * @param category <object>
   */
  getArticles (category) {
    return firebase.database().ref(`/${category}`).once('value')
  },

  /**
   * Get article
   * @method GET
   * @param data <object>
   */
  getArticle (data) {
    return firebase.database().ref(`/${data.category}/${data.category}${data.id}`).once('value')
  },

  /**
   * Add categories
   * @method POST
   * @param data <object>
   */
  addArticle (data) {
    const article = {}
    const postKey = firebase.database().ref().child(`/${data.category}`).push().key
    data.id = Date.now()
    if (!data.alias) {
      data.alias = postKey
      article[`/${data.category}` + postKey] = data
    } else {
      article[data.alias] = data
    }
    if (data.file) {
      const metadata = {
        contentType: data.file.type
      }
      return firebase.storage().ref().child(`/${data.category}/${data.alias}`).put(data.file, metadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            data.image = url
            delete data.file
            return firebase.database().ref().child(`/${data.category}`).update(article)
              .then(() => {
                return true
              }).catch(() => {
                return false
              })
          })
          return true
        }).catch(() => {
          return false
        })
    } else {
      return firebase.database().ref().child(`/${data.category}`).update(article)
        .then(() => {
          return true
        }).catch(() => {
          return false
        })
    }
  },

  /**
   * Update article
   * @method POST
   * @param data <object>
   */
  updateArticle (data) {
    const article = {}
    if (!data.unique) {
      article[`/${data.category}` + data.alias] = data
    } else {
      article[data.alias] = data
    }
    if (data.file) {
      const metadata = {
        contentType: data.file.type
      }
      return firebase.storage().ref().child(`/${data.category}/${data.alias}`).put(data.file, metadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            data.image = url
            delete data.file
            return firebase.database().ref().child(`/${data.category}`).update(article)
              .then(() => {
                return true
              }).catch(() => {
                return false
              })
          })
          return true
        }).catch(() => {
          return false
        })
    } else {
      return firebase.database().ref().child(`/${data.category}`).update(article).then(() => {
        return true
      }).catch(() => {
        return false
      })
    }
  },

  /**
   * Delete article
   * @method POST
   * @param data <object>
   */
  deleteArticle (data) {
    if (data.image.length) {
      firebase.storage().ref().child(`/${data.category}/${data.alias}`).delete().then(() => {})
    }
    return firebase.database().ref().child(`/${data.category}/${data.category}${data.alias}`).remove()
  },

  /**
   * Delete image
   * @method POST
   * @param data <object>
   */
  deleteImage (data) {
    return firebase.storage().ref().child(`/${data.category}/${data.alias}`).delete()
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
  },

  /**
   * Get transactions
   * @method GET
   * @param data <object>
   */
  getTransactions (data) {
    if (!('limit' in data)) {
      data.limit = 25
    }
    if (('read' in data)) {
      return firebase.database().ref('/transactions').limitToFirst(data.limit).orderByChild('read').equalTo(data.read).once('value')
    }
    return firebase.database().ref('/transactions').limitToFirst(data.limit).once('value')
  },

  /**
   * Get transactions
   * @method GET
   * @param id <number>
   */
  getTransaction (id) {
    return firebase.database().ref(`/transactions/${id}`).once('value')
  },

  /**
   * Get categories
   * @method POST
   * @param data <object>
   */
  updateTransaction (data) {
    return firebase.database().ref().child(`/transactions/${data.id}`).update(data).then(() => {
      return true
    }).catch(() => {
      return false
    })
  }
}

export default API
