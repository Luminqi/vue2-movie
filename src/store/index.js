import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import detail from './modules/detail'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    detail,
    account
  },
  strict: process.env.NODE_ENV !== 'production'
})
