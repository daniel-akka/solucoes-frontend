import FormCadastrarSituacaoVue from '@/components/forms/FormCadastrarSituacao.vue'
import AboutPage from '@/views/AboutPage.vue'
import CreateAccountPage from '@/views/CreateAccountPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RecoveryPassword from '@/views/RecoveryPassword.vue'
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
  },
  {
    path: '/RecoveryPassword',
    name: 'RecoveryPassword',
    component: RecoveryPassword,

  }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from)=>{
  if (to.path.includes('/RecoveryPassword')){

    let id = to.query.id
    if ((typeof id === 'string') == false){
      return '/login'
    }
  }
})

export default router
