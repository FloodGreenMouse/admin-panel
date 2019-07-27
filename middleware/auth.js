export default function ({ store, route, redirect }) {
  if (window.localStorage.getItem('token') !== 'test' && route.path.indexOf('login') === -1) {
    return redirect('/login')
  }
}
