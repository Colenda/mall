import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

//安装插件
Vue.use(Vuex)

//创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  // mutation目的是修改state,原则上每个方法尽量保持功能单一
  mutations,
  actions,
  getters
})

//挂载到Vue实例
export default store
