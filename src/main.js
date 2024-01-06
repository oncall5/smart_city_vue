import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import store from './store'

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
Vue.use(VideoPlayer)
import { Message } from 'element-ui'
import { Loading } from 'element-ui';
Vue.use(Loading.directive);

import { Dropdown,DropdownMenu,DropdownItem } from 'element-ui';
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

// 挂载到$message上
Vue.prototype.$message = Message

Vue.config.productionTip = false

import Mixin from '@/mixins'

Vue.mixin(Mixin)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
