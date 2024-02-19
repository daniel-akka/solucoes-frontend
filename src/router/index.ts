import Usuario from '@/classes/ClUsuarioSimples'
import AboutPage from '@/views/AboutPage.vue'
import CreateAccountPage from '@/views/CreateAccountPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    props: (route) => ({
      user: Usuario,
      ...route.params
    })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/newAccount',
    name: 'newAccount',
    component: CreateAccountPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
