import { MODIFY_REQUEST_TOKEN, MODIFY_ACCESS_TOKEN, MODIFY_ACCOUNT_ID, CHANGE_ACCOUNT_INFO, CHANGE_START_PATH } from '../mutation-Types'
import { createRequestToken, createAccessToken, getUserInfo } from '../../utils/getData'
import { setStore } from '../../utils/storage'
import { imgurl } from '../../utils/imgurl'
const formatUserInfo = (res) => {
  let data = res.map(item => item.results)
  let [lists, favorites, recommendations, watchlist] = data
  lists = lists.map(item => ({
    path: imgurl('w300', item.backdrop_path),
    // list id
    id: item.id,
    name: item.name,
    description: item.description,
    createtime: item.created_at,
    updatetime: item.updated_at,
    itemcount: item.number_of_items,
    public: item.public
  }))
  favorites = favorites.map(item => ({
    id: item.id,
    path: imgurl('w92', item.poster_path),
    title: item.title,
    release_date: item.release_date,
    vote_average: item.vote_average,
    vote_count: item.vote_count
  }))
  recommendations = recommendations.map(item => ({
    id: item.id,
    path: imgurl('w92', item.poster_path),
    title: item.title,
    release_date: item.release_date,
    vote_average: item.vote_average,
    vote_count: item.vote_count
  }))
  watchlist = watchlist.map(item => ({
    id: item.id,
    path: imgurl('w92', item.poster_path),
    title: item.title,
    release_date: item.release_date,
    vote_average: item.vote_average,
    vote_count: item.vote_count
  }))
  return { lists, favorites, recommendations, watchlist }
}

export default {
  state: {
    accountid: '',
    requesttoken: '',
    accesstoken: '',
    favorites: [],
    lists: [],
    recommendations: [],
    watchlist: [],
    startpath: ''
  },
  mutations: {
    [MODIFY_REQUEST_TOKEN] (state, payload) {
      state.requesttoken = payload.requesttoken
    },
    [MODIFY_ACCESS_TOKEN] (state, payload) {
      state.accesstoken = payload.accesstoken
    },
    [MODIFY_ACCOUNT_ID] (state, payload) {
      state.accountid = payload.accountid
    },
    [CHANGE_ACCOUNT_INFO] (state, payload) {
      state = { ...state, ...payload }
    },
    [CHANGE_START_PATH] (state, payload) {
      state.startpath = payload.startpath
    }
  },
  actions: {
    async changeRequestToken ({ commit }, startpath) {
      let res = await createRequestToken()
      commit(MODIFY_REQUEST_TOKEN, { requesttoken: res.request_token })
      commit(CHANGE_START_PATH, { startpath })
      setStore('requesttoken', res.request_token)
      setStore('startpath', startpath)
      window.location.href = `https://www.themoviedb.org/auth/access?request_token=${res.request_token}`
    },
    async changeAccessToken ({ commit }, requestToken) {
      let res = await createAccessToken(requestToken)
      commit(MODIFY_ACCESS_TOKEN, { accesstoken: res.access_token })
      commit(MODIFY_ACCOUNT_ID, { accountid: res.account_id })
      setStore('accesstoken', res.access_token)
      setStore('accountid', res.account_id)
    },
    async changeAccountInfo ({ commit }, { accountId, accessToken }) {
      let res = await getUserInfo(accountId, accessToken)
      console.log(res)
      let data = formatUserInfo(res)
      console.log(data)
      commit(CHANGE_ACCOUNT_INFO, data)
    }
  }
}
