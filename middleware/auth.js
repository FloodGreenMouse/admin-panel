import firebase from '~/plugins/firebase'
import cookie from 'vue-cookie'

export default function ({ store, route, redirect }) {
  const cookieToken = cookie.get('token')

  if (!cookieToken) {
    const storeToken = store.state.token

    if (!storeToken) {
      if (!route.path.includes('/login')) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            cookie.set('token', user.refreshToken, 1)
            store.dispatch('addUserToken', user.refreshToken)
          } else {
            return redirect('/login')
          }
        })
      }
    } else {
      cookie.set('token', storeToken, 1)
    }
  } if (cookieToken && route.path.includes('/login')) {
    redirect('/')
  }
}
