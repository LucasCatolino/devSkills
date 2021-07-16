import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../views/HomePage.vue'
import ups from '../views/Ups.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homepage
  },
  {
    path: '/ups',
    name: 'Ups',
    component: ups
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
