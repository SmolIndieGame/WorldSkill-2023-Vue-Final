import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import Signin from '@/views/SigninView.vue'
import SignoutView from '@/views/SignoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'games',
      component: HomeView
    },
    {
      path: '/:slug',
      name: 'game',
      component: GameView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signin,
      props: {
        action: 'signup'
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      props: {
        action: 'signin'
      }
    },
    {
      path: '/signout',
      name: 'signout',
      component: SignoutView
    }
  ]
})

export default router
