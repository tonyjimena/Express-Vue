import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail/Detail'
import CreateRecipe from '@/components/CreateRecipe/CreateRecipe'
import Login from '@/components/Login/Login'

import hooks from './hooks'

Vue.use(Router)

const ROUTER = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
      props: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateRecipe,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

hooks(ROUTER)

export default ROUTER
