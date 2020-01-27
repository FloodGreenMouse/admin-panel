import api from './api'

export const modules = {
  api
}

export const state = () => ({
  notifications: [],
  token: null,
  showMenu: false
})

export const actions = {
  showMenu ({ commit }, value) {
    commit('SHOW_MENU', value)
  },
  addUserToken ({ commit }, token) {
    commit('ADD_USER_UID', token)
  },

  deleteUserToken ({ commit }) {
    commit('DELETE_USER_UID')
  },

  addNotification ({ commit, dispatch }, notification) {
    if (!notification.type) {
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
  SHOW_MENU (state, value) {
    state.showMenu = value
  },
  UPDATE_NOTIFICATION (state, notification) {
    state.notifications.push(notification)
  },

  DELETE_NOTIFICATION (state) {
    state.notifications.splice(-1, 1)
  },

  ADD_USER_UID (state, token) {
    state.token = token
  },

  DELETE_USER_UID (state) {
    state.token = null
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
