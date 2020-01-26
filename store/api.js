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
  }
}

export default {
  state,
  actions
}
