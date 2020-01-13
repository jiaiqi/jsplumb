import Vue from 'vue'
// noinspection ES6UnusedImports
import dummy from  '../../../components/util/VueInit'
import App from './JtzhsqIndexApp'
import router from './router'



;
// top.pathConfig.application = "zhdj";
Vue.config.productionTip = false
// {
//   top.pathConfig = top.pathConfig || {};
//   top.pathConfig.application = "zhdj";
// }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
