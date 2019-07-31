export const state = () => ({
  notifications: [],
  uid: ''
})

export const actions = {
  addUserUid ({ commit }, uid) {
    commit('ADD_USER_UID', uid)
  },
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
  },
  ADD_USER_UID (state, uid) {
    state.uid = uid
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
