export default function ({ route, redirect }) {
  if (!window.localStorage.getItem('token') && route.path.indexOf('login') === -1) {
    return redirect('/login')
  }
}
