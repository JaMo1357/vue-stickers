import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/stores/StickerStore'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  name: 'Main',
  render: (h) => h(App),
}).$mount('#app');
