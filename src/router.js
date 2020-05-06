import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      alias: '/',
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/home_en',
      name: 'home_en',
      component: () => import(/* webpackChunkName: "home_en" */ './views/Home_en.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue')
    },
    {
      path: '/detail_en',
      name: 'detail_en',
      component: () => import(/* webpackChunkName: "detail_en" */ './views/Detail_en.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import(/* webpackChunkName: "loading" */ './components/Loading.vue')
    },
    { path: '*', redirect: '/' }
  ]
})
