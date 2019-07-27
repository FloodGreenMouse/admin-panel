export default function ({ store, route, redirect }) {
  console.log('success')
  if (window.localStorage.getItem('token') !== 'test' && route.path.indexOf('login') === -1) {
    return redirect('/login')
  }
}
