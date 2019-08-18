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
  addArticle ({ dispatch }, data) {
    return api.addArticle(data)
  },
  deleteArticle ({ dispatch }, id) {
    return api.deleteArticle(id)
  }
}

export default {
  state,
  actions
}
