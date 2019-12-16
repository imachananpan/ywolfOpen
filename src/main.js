import Vue from 'vue'
import firebase from 'firebase'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'material-design-icons/iconfont/material-icons.css'
import VueMaterial from 'vue-material'
import MdIcon from 'vue-material/dist/components/MdIcon'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// added
import store from './store'
import router from './router'
import App from './App.vue'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueMaterial)
Vue.use(MdIcon)
const config = {
  apiKey: 'AIzaSyBcH3YbCVp1YN6vZhe5WS5NGb9pHlQnfRk',
  authDomain: 'ywolf-30e74.firebaseapp.com',
  databaseURL: 'https://ywolf-30e74.firebaseio.com',
  projectId: 'ywolf-30e74',
  storageBucket: 'ywolf-30e74.appspot.com',
  messagingSenderId: '409889739659',
  appId: '1:409889739659:web:7c30fc03bdc5731b50158e',
  measurementId: 'G-FFZ6XEZQSS',
}
firebase.initializeApp(config)
firebase.analytics()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
