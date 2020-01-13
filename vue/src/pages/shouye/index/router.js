import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Index from '../../../components/shouye/JtzhsqIndex'



Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
  ]
})
