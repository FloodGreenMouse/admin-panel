export const state = () => ({
  notifications: []
})

export const actions = {
  addNotification ({ commit }) {
    commit('UPDATE_NOTIFICATION')
  },
  deleteNotification ({ commit }) {
    commit('DELETE_NOTIFICATION')
  }
}

export const mutations = {
  UPDATE_NOTIFICATION (state) {
    state.notifications.push('Сообщение')
  },
  DELETE_NOTIFICATION (state) {
    state.notifications.splice(-1, 1)
  }
}

export const getters = {
  //
}

export default {
  state,
  actions,
  mutations,
  getters
}
