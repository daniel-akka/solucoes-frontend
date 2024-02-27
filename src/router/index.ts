import UsuarioSimples from '@/classes/ClUsuarioSimples'
import FormCadastrarSituacaoVue from '@/components/forms/FormCadastrarSituacao.vue'
import AboutPage from '@/views/AboutPage.vue'
import CreateAccountPage from '@/views/CreateAccountPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = {
  props: {
    user: {
      type: UsuarioSimples
    }
  },
  template: () => import('@/views/HomePage.vue')
}

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
    props: true
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
  },
  {
    path: '/Situacao',
    name: 'Situacao',
    component: FormCadastrarSituacaoVue
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
