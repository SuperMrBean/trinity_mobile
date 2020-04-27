// 不要在此引用第三方库样式
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { errorFormatter, LoadingInterface, handleInputFocus, handleInputBlur } from './config/utils'
import filters from './filters'
import { Loading, Collapse, CollapseItem, Toast, Field, Popup, Swipe, SwipeItem, Lazyload } from 'vant'

Toast.allowMultiple()
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$loading = LoadingInterface
Vue.prototype.$errorFormatter = errorFormatter
Vue.prototype.$handleInputFocus = handleInputFocus
Vue.prototype.$handleInputBlur = handleInputBlur

router.beforeEach(async (to, from, next) => {
  next()
})
router.afterEach(() => {
  // 页面切换结束时关闭loading
  LoadingInterface.close()
})
// 解决重新构建后异步加载的页面报错
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    location.reload()
  }
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
