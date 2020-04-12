import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      alias: '/',
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "three" */ './views/Detail.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import(/* webpackChunkName: "loading" */ './components/Loading.vue')
    },
    { path: '*', redirect: '/' }
  ]
})
