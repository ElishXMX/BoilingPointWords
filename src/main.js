import './assets/main.css'

import { createApp } from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(createPinia())
app.use(router)

pinia.use(PiniaVuePlugin)
app.mount('#app')
