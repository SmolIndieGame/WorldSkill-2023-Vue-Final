import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import SignInView from '@/views/SignInView.vue'
import SignOutView from '@/views/SignOutView.vue'
import UserView from '@/views/UserView.vue'
import ManageGameView from '@/views/ManageGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'games',
      component: HomeView
    },
    {
      path: '/games/:slug',
      name: 'game',
      component: GameView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignInView,
      props: {
        action: 'signup'
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      props: {
        action: 'signin'
      }
    },
    {
      path: '/signout',
      name: 'signout',
      component: SignOutView
    },
    {
      path: '/users/:user',
      name: 'user',
      component: UserView
    },
    {
      path: '/manage/',
      name: 'manages',
      component: ManageGameView
    },
    {
      path: '/manage/:slug',
      name: 'manage',
      component: ManageGameView
    }
  ]
})

export default router
