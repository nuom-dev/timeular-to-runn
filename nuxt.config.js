require('dotenv').config()

const useEmulators = true

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Timeular to Runn',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyCoSA9S1E7j3pYk2g_31GeWpkaSi9H3uA4",
      authDomain: "timeular2runn.firebaseapp.com",
      projectId: "timeular2runn",
      storageBucket: "timeular2runn.appspot.com",
      messagingSenderId: "205752903545",
      appId: "1:205752903545:web:a3fb5b0e6093aa29bf71a8"
    },
    services: {
      auth: {
        ssr: false,
        //   {
        //   ignorePaths: ['/api/'],
        //   credential: false,
        //   serverLogin: false,
        // },
        persistence: 'local',
        initialize: {
          onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
          subscribeManually: false,
        },
        emulatorPort: useEmulators ? 9099 : undefined,
        emulatorHost: 'http://localhost',
      },
      firestore: {
        enablePersistence: false,
        emulatorPort: useEmulators ? 8080 : undefined,
        emulatorHost: 'localhost',
        settings: {
          ignoreUndefinedProperties: true,
        },
      },
      functions: {
        location: 'europe-west2',
        emulatorPort: useEmulators ? 5001 : undefined,
        emulatorHost: 'http://localhost',
      },

    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
