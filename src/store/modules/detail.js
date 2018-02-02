import { CHANGE_MOVIE_DETAIL } from '../mutation-Types'
import { getMovieDetail } from '../../utils/getData'
import { imgurl } from '../../utils/imgurl'

const formatData = (data) => {
  // eslint-disable-next-line
  const { title, id, release_date, vote_count, vote_average, overview, budget, revenue, genres } = data
  const trailers = data.videos.results.map(item => ({
    id: item.id,
    name: item.name,
    // youtube
    path: item.key
  }))
  const poster = imgurl('w92', data.poster_path)
  const backdrop = imgurl('w300', data.backdrop_path)
  const cast = data.credits.cast.map(item => ({
    id: item.credit_id,
    person_id: item.id,
    name: item.name,
    character: item.character,
    path: imgurl('w45', item.profile_path)
  }))
  const crew = data.credits.crew.map(item => ({
    id: item.credit_id,
    person_id: item.id,
    name: item.name,
    job: item.job,
    path: imgurl('w45', item.profile_path)
  }))
  const review = data.reviews.results.map(item => ({
    id: item.id,
    author: item.author,
    content: item.content
  }))
  const similar = data.similar.results.map(item => ({
    path: imgurl('w92', item.poster_path),
    id: item.id,
    title: item.title,
    date: item.release_date
  }))
  return {
    title,
    id,
    release_date,
    genres,
    vote_average,
    vote_count,
    overview,
    trailers,
    budget,
    revenue,
    poster,
    backdrop,
    cast,
    crew,
    review,
    similar
  }
}
export default {
  state: {
    moviedetail: {
      title: '',
      id: '',
      release_date: '',
      genres: [],
      vote_average: 0,
      vote_count: 0,
      overview: '',
      trailers: [],
      budget: '',
      revenue: '',
      poster: '',
      backdrop: '',
      cast: [],
      crew: [],
      review: [],
      similar: []
    }
  },
  mutations: {
    [CHANGE_MOVIE_DETAIL] (state, payload) {
      state.moviedetail = {...state.moviedetail, ...payload}
    }
  },
  actions: {
    async changeDetail ({ commit }, movieId) {
      let res = await getMovieDetail(movieId)
      console.log(res)
      let data = formatData(res)
      console.log(data)
      commit(CHANGE_MOVIE_DETAIL, data)
    }
  }
}
