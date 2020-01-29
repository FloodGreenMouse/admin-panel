
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Админ-панель',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'theme-color', content: '#1867c0' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/ckeditor.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1867c0', height: '4px' },
  /*
  ** Resources for components
  */
  styleResources: {
    scss: [
      '@/assets/scss/variables/_index.scss',
      '@/assets/scss/mixins.scss'
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'auth',
    extendRoutes (routes) {
      routes.push({
        name: 'custom',
        path: '*',
        redirect: '/'
      })
    }
  }
}
