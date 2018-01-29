import fetch from './fetch'
const baseurl = 'https://api.themoviedb.org/3'
// eslint-disable-next-line
const api_key = '737d0039db81a068868e6c40fe7ab6a1'
export const getMovieInfo = () => Promise.all([
  fetch(baseurl + '/movie/popular', { api_key, page: '1', region: 'CN' }),
  fetch(baseurl + '/movie/now_playing', { api_key, page: '1', region: 'CN' }),
  fetch(baseurl + '/movie/upcoming', { api_key, page: '1' }),
  fetch(baseurl + '/movie/top_rated', { api_key, page: '1' })
])
export const getSearchResult = (query) => fetch(baseurl + '/search/movie', { api_key, query, page: '1' })
