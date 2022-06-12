import env from './env'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '旅游日记',
    htmlAttrs: {
      lang: 'zh',
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#ccc' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/antd.js' },
    // { src: '@/plugins/vuex.js', ssr: false },
    { src: '@/plugins/amap.js', ssr: false },
    // { src: '@/env.js', ssr: false },
    // { src: '@/plugins/amap.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  env: {
    BASE_URL: env[process.env.NODE_ENV].BASE_URL,
  },
}
