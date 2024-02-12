import { createApp } from 'vue'
import App from './App.vue'
import { router, store, vuetify } from './providers'

export const app = createApp(App).use(router).use(store).use(vuetify)
