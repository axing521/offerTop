/*
 * @Author: scg
 * @Date: 2021-08-21 13:41:12
 * @LastEditTime: 2021-08-22 18:55:05
 * @LastEditors: scg
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import {request} from './util/request'
import store from './store/index'
Vue.config.productionTip = false
Vue.prototype.$request = request
App.mpType = 'app'
console.log('store',store)
const app = new Vue({
  store,
  ...App
})
app.$mount()