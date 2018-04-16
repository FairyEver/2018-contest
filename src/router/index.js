import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'one-player',
      component: resolve => { require(['@/page/one-player.vue'], resolve) }
    }
  ]
})
