import { createApp } from 'vue'
import App from './App.vue'
import { router, vuetify } from './providers'

export const app = createApp(App).use(router).use(vuetify)
