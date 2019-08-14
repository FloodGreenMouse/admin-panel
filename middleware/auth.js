import firebase from '~/plugins/firebase'

export default function ({ store, route, redirect }) {
  const token = window.localStorage.getItem('token')

  if (token !== null) {
    if (!route.path.includes('/login')) {
      const storeToken = store.state.token
      if (storeToken === null) {
        firebase.firebase.auth().onAuthStateChanged(user => {
          if (user === null && user.refreshToken !== token) {
            return redirect('/login')
          } else {
            window.localStorage.setItem('token', user.refreshToken)
            store.dispatch('addUserToken', user.refreshToken)
          }
        })
      }
    } else {
      return redirect('/')
    }
  }
  if (token === null && !route.path.includes('/login')) {
    return redirect('/login')
  }
}
