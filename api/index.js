import axios from 'axios'
// import Cookie from 'vue-cookie'

export class API {
  constructor () {
    this.token = null
  }

  /**
   * General API wrapper
   * @param method {string}
   * @param url {string}
   * @param data {object}
   */
  do (method = 'GET', url = '', data = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        method,
        url: `${process.env.API_URL}:${process.env.API_PORT}${url}`,
        headers: {
          // jwt: this.token
        },
        data
      }
      method === 'GET' ? options.params = data : options.data = data

      axios(options).then((res) => {
        if (res.data.status === 200) {
          resolve(res.data)
        } else {
          // if (res.data.error === 'ERRORS.TOKEN') {
          //   Cookie.delete('token')
          //   window.location.replace('/login')
          // }
          reject(res.data.error)
        }
      }).catch((err) => {
        reject(err.message)
      })
    })
  }

  setToken (token) {
    this.token = token
  }

  removeToken () {
    this.token = null
  }

  /**
   * Sign In
   * @method POST
   * @param data {object}
   */
  signIn (data) {
    return this.do('POST', 'user/signin', data)
  }

  /**
   * Sign Out
   * @method POST
   * @param none
   */
  signOut () {
    return this.do('POST', 'user/signout')
  }

  /**
   * User Info
   * @method POST
   * @param none
   */
  userInfo () {
    return this.do('POST', 'user/info')
  }
}
