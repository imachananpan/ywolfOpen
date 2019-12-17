import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/signup/Signup.vue'
import Signin from '../views/signup/Signin.vue'
import Home from '../views/Home/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
  },
]

const router = new VueRouter({
  routes,
})

export default router
