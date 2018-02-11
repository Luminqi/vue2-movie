import { MODIFY_REQUEST_TOKEN, MODIFY_ACCESS_TOKEN, MODIFY_ACCOUNT_ID,
  CHANGE_ACCOUNT_INFO, CHANGE_START_PATH, MODIFY_REQUEST_TOKEN_V3,
  MODIFY_SESSION_ID, ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE,
  ADD_WATCHLIST_MOVIE, REMOVE_WATCHLIST_MOVIE
} from '../mutation-Types'
import { createRequestToken, createAccessToken, getUserInfo, createRequestTokenV3, createSessionId } from '../../utils/getData'
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
    requesttokenv3: '',
    accesstoken: '',
    sessionid: '',
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
    [MODIFY_REQUEST_TOKEN_V3] (state, payload) {
      state.requesttokenv3 = payload.requesttokenv3
    },
    [MODIFY_ACCESS_TOKEN] (state, payload) {
      state.accesstoken = payload.accesstoken
    },
    [MODIFY_SESSION_ID] (state, payload) {
      state.sessionid = payload.sessionid
    },
    [MODIFY_ACCOUNT_ID] (state, payload) {
      state.accountid = payload.accountid
    },
    [CHANGE_ACCOUNT_INFO] (state, payload) {
      state.favorites = payload.favorites
      state.lists = payload.lists
      state.recommendations = payload.recommendations
      state.watchlist = payload.watchlist
      // state = { ...state, ...payload }
      console.log(state, payload)
    },
    [CHANGE_START_PATH] (state, payload) {
      state.startpath = payload.startpath
    },
    [ADD_FAVORITE_MOVIE] (state, payload) {
      state.favorites.push(payload)
    },
    [REMOVE_FAVORITE_MOVIE] (state, payload) {
      state.favorites = state.favorites.filter(item => item.id !== payload.id)
    },
    [ADD_WATCHLIST_MOVIE] (state, payload) {
      state.watchlist.push(payload)
    },
    [REMOVE_WATCHLIST_MOVIE] (state, payload) {
      state.watchlist = state.watchlist.filter(item => item.id !== payload.id)
    }
  },
  actions: {
    async changeRequestToken ({ commit }, startpath) {
      let resv3 = await createRequestTokenV3()
      let resv4 = await createRequestToken(resv3.request_token) // redirect to v3 auth
      // commit(MODIFY_REQUEST_TOKEN, { requesttoken: res.request_token })
      // commit(CHANGE_START_PATH, { startpath })
      setStore('requesttoken', resv4.request_token)
      setStore('requesttokenv3', resv3.request_token)
      setStore('startpath', startpath)
      console.log(resv3, resv4)
      window.location.href = `https://www.themoviedb.org/auth/access?request_token=${resv4.request_token}` // v4 auth
    },
    async changeAccessToken ({ commit }, { requestToken, requestTokenV3 }) {
      let [resv4, resv3] = await Promise.all([
        createAccessToken(requestToken),
        createSessionId(requestTokenV3)
      ])
      commit(MODIFY_ACCESS_TOKEN, { accesstoken: resv4.access_token })
      commit(MODIFY_ACCOUNT_ID, { accountid: resv4.account_id })
      commit(MODIFY_SESSION_ID, { sessionid: resv3.session_id })
      console.log(resv3.session_id)
      // setStore('accesstoken', res.access_token)
      // setStore('accountid', res.account_id)
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
