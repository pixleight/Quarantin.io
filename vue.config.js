const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pwa: {
    name: 'Quarantin.io',
    themeColor: '#f9aa33',
    msTileColor: '#1d333e',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#1d333e',
      theme_color: '#f9aa33',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
      // skipWaiting: true,
      // clientsClaim: true,
    },
  },

  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin(
            // Absolute path to compiled SPA
            path.resolve(__dirname, 'dist'),
            // List of routes to prerender
            [
              '/',
              '/feedback',
              '/updates',
            ],
            {
              //options
            }
          ),
        ]
      }
    }
  }
}