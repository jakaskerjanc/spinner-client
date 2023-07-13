import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { initFirebase } from '@/firebase'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

initFirebase()
