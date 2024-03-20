import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaUserCircle, BiSearch } from "oh-vue-icons/icons";


addIcons(FaUserCircle, BiSearch);

const app = createApp(App)

app.component("VIcon", OhVueIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
