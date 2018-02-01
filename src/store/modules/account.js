import { MODIFY_REQUEST_TOKEN, MODIFY_ACCESS_TOKEN, CHANGE_ACCOUNT_INFO } from '../mutation-Types'
import { createRequestToken, createAccessToken } from '../../utils/getData'
// import { imgurl } from '../../utils/imgurl'

export default {
  state: {
    requesttoken: '',
    accesstoken: '',
    favorites: [],
    lists: [],
    recommendations: [],
    watchlist: []
  },
  mutations: {
    [MODIFY_REQUEST_TOKEN] (state, payload) {
      state.requesttoken = payload.requesttoken
    },
    [MODIFY_ACCESS_TOKEN] (state, payload) {
      state.accesstoken = payload.accesstoken
    },
    [CHANGE_ACCOUNT_INFO] (state, payload) {
      state = { ...state, ...payload }
    }
  },
  actions: {
    async changeRequestToken ({ commit }) {
      let res = await createRequestToken()
      commit(MODIFY_REQUEST_TOKEN, { requesttoken: res.request_token })
      window.location.href = `https://www.themoviedb.org/auth/access?request_token=${res.request_token}`
    },
    async changeAccessToken ({ commit }, requestToken) {
      let res = await createAccessToken(requestToken)
      console.log(res)
      commit(MODIFY_ACCESS_TOKEN, { accesstoken: res.access_token })
    }
  }
}
