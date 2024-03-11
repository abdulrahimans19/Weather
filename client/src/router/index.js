import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router
