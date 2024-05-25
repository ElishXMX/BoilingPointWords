import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/index.vue'
import layout from '../views/layout/index.vue'
import home from '../views/home/index.vue'
import books from '../views/books/index.vue'
import cite from '../views/cite/index.vue'
import test from '../views/test/index.vue'
import user from '../views/user/index.vue'
import register from '../views/register/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '',
          name: 'home',
          component:home,
        },
        
        {
           path: '/books',
          component:books,
        },
        {
          path: '/cite',
          name: 'cite',
          component:cite,
        },
        {
          path: '/test',
          name: 'test',
          component:test,
        },
        {
          path: '/user',
          name: 'user',
          component:user,
        },
      ]
    }
        ,
       
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    
   
  ]
})
  



export default router
