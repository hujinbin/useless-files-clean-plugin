import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
require('./a.js')
require('./b.js')
require('./c.js')

createApp(App).mount('#app')
