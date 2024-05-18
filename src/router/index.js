import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/index.vue'
import layout from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
    
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
   
  ]
})

export default router
