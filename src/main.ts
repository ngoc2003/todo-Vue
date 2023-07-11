import './assets/main.css'

import './assets/tailwind.css'

import withUUID from 'vue-uuid'

import { createApp } from 'vue'

import App from './App.vue'

import { store } from './store'

withUUID(createApp(App).use(store)).mount('#app')
