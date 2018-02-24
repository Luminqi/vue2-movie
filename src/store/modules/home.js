import { CHANGE_MOVIE_INFO } from '../mutation-Types'
import { getMovieInfo } from '../../utils/getData'
import { imgurl } from '../../utils/imgurl'

export default {
  state: {
    movieinfo: {
      popular: [],
      nowplaying: [],
      upcoming: [],
      toprated: []
    }
  },
  getters: {
    popular: state => state.movieinfo.popular
      .filter(item => item.backdrop_path !== null)
      .map(item => ({
        path: imgurl('w300', item.backdrop_path),
        id: item.id,
        title: item.title,
        date: item.release_date
      })).slice(0, 6),
    nowplaying: state => state.movieinfo.nowplaying
      .filter(item => item.poster_path !== null)
      .map(item => ({
        path: imgurl('w92', item.poster_path),
        id: item.id,
        title: item.title,
        date: item.release_date
      })),
    upcoming: state => state.movieinfo.upcoming
      .filter(item => item.poster_path !== null)
      .map(item => ({
        path: imgurl('w92', item.poster_path),
        id: item.id,
        title: item.title,
        date: item.release_date
      })),
    toprated: state => state.movieinfo.toprated
      .filter(item => item.poster_path !== null)
      .map(item => ({
        path: imgurl('w92', item.poster_path),
        id: item.id,
        title: item.title,
        date: item.release_date
      }))
  },
  mutations: {
    [CHANGE_MOVIE_INFO] (state, payload) {
      state.movieinfo = { ...state.movieinfo, ...payload }
    }
  },
  actions: {
    async getMovieInfo ({ commit }) {
      let res = await getMovieInfo()
      let [popular, nowplaying, upcoming, toprated] = res.map(item => item.results)
      let data = { popular, nowplaying, upcoming, toprated }
      console.log(data)
      commit(CHANGE_MOVIE_INFO, data)
    }
  }
}
