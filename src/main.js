import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "./router"

Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.config.productionTip = false
    // axios.defaults.baseURL = 'http://39.106.116.16:9376/'
    // axios.defaults.baseURL = 'http://localhost:9376/'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')