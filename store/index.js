export const state = () => ({
  notifications: []
})

export const actions = {
  addNotification ({ commit, dispatch }, notification) {
    if (!notification.hasOwnProperty('type')) {
      notification.type = 'info'
    }
    notification.delay = 5000
    notification.timeout = setTimeout(() => {
      dispatch('deleteNotification', notification)
    }, notification.delay)
    commit('UPDATE_NOTIFICATION', notification)
  },
  deleteNotification ({ commit }, notification) {
    clearTimeout(notification.timeout)
    commit('DELETE_NOTIFICATION')
  }
}

export const mutations = {
  UPDATE_NOTIFICATION (state, notification) {
    state.notifications.push(notification)
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
