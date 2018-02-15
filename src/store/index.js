import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import detail from './modules/detail'
import account from './modules/account'
import people from './modules/people'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    detail,
    account,
    people
  },
  strict: process.env.NODE_ENV !== 'production'
})
