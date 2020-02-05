import api from '../api'

export const state = () => ({
  token: null
})

export const actions = {
  getArticles ({ dispatch }, category) {
    return api.getArticles(category)
  },
  getArticle ({ dispatch }, data) {
    return api.getArticle(data)
  },
  updateArticle ({ dispatch }, data) {
    return api.updateArticle(data)
  },
  addArticle ({ dispatch }, data) {
    return api.addArticle(data)
  },
  deleteArticle ({ dispatch }, data) {
    return api.deleteArticle(data)
  },
  checkUser ({ dispatch }, refreshToken) {
    return api.checkUser(refreshToken)
  },
  deleteImage ({ dispatch }, data) {
    return api.deleteImage(data)
  },
  getTransactions ({ dispatch }, data = {}) {
    return api.getTransactions(data)
  },
  getTransaction ({ dispatch }, id) {
    return api.getTransaction(id)
  },
  updateTransaction ({ dispatch }, data) {
    return api.updateTransaction(data)
  }
}

export default {
  state,
  actions
}
