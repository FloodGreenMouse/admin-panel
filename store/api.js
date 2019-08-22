import api from '../api'

export const state = () => ({
  token: null
})

export const actions = {
  getArticles ({ dispatch }) {
    return api.getArticles()
  },
  getArticle ({ dispatch }, id) {
    return api.getArticle(id)
  },
  updateArticle ({ dispatch }, data) {
    return api.updateArticle(data)
  },
  addArticle ({ dispatch }, data) {
    return api.addArticle(data)
  },
  deleteArticle ({ dispatch }, alias) {
    return api.deleteArticle(alias)
  }
}

export default {
  state,
  actions
}
