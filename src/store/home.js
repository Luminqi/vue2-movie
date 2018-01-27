import { CHANGE_MOVIE_INFO } from './mutation-Types'
import { getMovieInfo } from '../utils/getData'
const imgurl = (width, path) => {
  return 'https://image.tmdb.org/t/p/' + width + path
}

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
        title: item.title
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
