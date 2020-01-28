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
   * @method GET
   * @param data <object>
   */
  deleteArticle (data) {
    return firebase.database().ref().child(`/${data.category}/${data.category}${data.id}`).remove()
  },

  /**
   * Delete image
   * @method GET
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
  }
}

export default API
