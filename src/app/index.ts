import { createApp } from 'vue'
import App from './App.vue'
import { router, store, i18n, vuetify } from './providers'

export const app = createApp(App).use(router).use(store).use(i18n).use(vuetify)
