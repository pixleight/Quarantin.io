import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#7957d5',
        secondary: '#363636',
        accent: '#82B1FF',
        error: '#ff3860',
        info: '#209cee',
        success: '#23d160',
        warning: '#ffdd57'
      },
    },
  },
});
