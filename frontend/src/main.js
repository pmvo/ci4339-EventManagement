import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import { markRaw } from 'vue'
import { createPinia } from 'pinia'
/* import piniaPluginPersistedState from 'pinia-plugin-persistedstate' */
// Run this code in the front end 'npm install pinia-plugin-persistedstate'
const app = createApp(App)
//create a pinia root store
const pinia = createPinia()
//pinia should be able to use router - has to be setup as plugin
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});
/* pinia.use(piniaPluginPersistedState) */
app.use(pinia)
app.use(router)
app.mount('#app')
