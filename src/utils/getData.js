/* eslint-disable */
import fetch from './fetch'

const baseurl = 'https://api.themoviedb.org/3'
const baseurl_v4 = 'https://api.themoviedb.org/4'
const api_key = '737d0039db81a068868e6c40fe7ab6a1'
const api_access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzdkMDAzOWRiODFhMDY4ODY4ZTZjNDBmZTdhYjZhMSIsInN1YiI6IjVhNjcyZjM1OTI1MTQxNjliMjAwYjVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZGsYpE7NguYUJziXLaPM_1Tjrxm2mRQDLZyujulQMTA'
export const getMovieInfo = () => Promise.all([
  fetch(baseurl + '/movie/popular', { api_key, page: '1', region: 'CN' }),
  fetch(baseurl + '/movie/now_playing', { api_key, page: '1', region: 'CN' }),
  fetch(baseurl + '/movie/upcoming', { api_key, page: '1' }),
  fetch(baseurl + '/movie/top_rated', { api_key, page: '1' })
])
export const getSearchResult = (query) => fetch(baseurl + '/search/movie', { api_key, query, page: '1' })
export const getMovieDetail = (movieId) => fetch(
  baseurl + '/movie/' + movieId, { api_key, append_to_response: 'videos,images,similar,reviews,credits' })

// v3 auth API
export const createRequestTokenV3 = () => fetch(baseurl + '/authentication/token/new', { api_key })
export const permissionURL = (requsetToken) => `https://www.themoviedb.org/authenticate/${requsetToken}?redirect_to=http://localhost:8080/account`
// export const permissionURL = (requsetToken) => `https://www.themoviedb.org/authenticate/${requsetToken}`
export const createSessionId = (request_token) => fetch(baseurl + '/authentication/session/new', { api_key, request_token })
// export const getAccountInfo = (session_id) => Promise.all([
//   fetch(baseurl + '/account/lists', { api_key, session_id, page: '1' }),
//   fetch(baseurl + '/account/favorite/movies', {api_key, session_id, sort_by: 'created_at.asc', page: '1'}),
//   fetch(baseurl + '/account/watchlist/movies', {api_key, session_id, sort_by: 'created_at.asc', page: '1'})
// ])

// v4 auth API
export const createRequestToken = (requestToken_v3) => fetch(
  baseurl_v4 + '/auth/request_token', { redirect_to: permissionURL(requestToken_v3) }, 'post', { 'Authorization': 'Bearer ' + api_access_token })
export const createAccessToken = (requestToken) => fetch(
  baseurl_v4 + '/auth/access_token', { "request_token": requestToken }, 'post', { 'Authorization': 'Bearer ' + api_access_token })
export const getUserInfo = (accountId, accessToken) => Promise.all([
  fetch(baseurl_v4 + '/account/' + accountId + '/lists', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/favorites', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/recommendations', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/watchlist', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/rated', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken })
])

export const addToFavorite = (session_id, media_type, media_id) => fetch(
  baseurl + `/account/{account_id}/favorite?api_key=${api_key}&session_id=${session_id}`,
  {
    media_type,
    media_id,
    'favorite': true
  },
  'post'
)
export const removeFromFavorite = (session_id, media_type, media_id) => fetch(
  baseurl + `/account/{account_id}/favorite?api_key=${api_key}&session_id=${session_id}`,
  {
    media_type,
    media_id,
    'favorite': false
  },
  'post'
)
export const addToWatchlist = (session_id, media_type, media_id) => fetch(
  baseurl + `/account/{account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`,
  {
    media_type,
    media_id,
    'watchlist': true
  },
  'post'
)
export const removeFromWatchlist = (session_id, media_type, media_id) => fetch(
  baseurl + `/account/{account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`,
  {
    media_type,
    media_id,
    'watchlist': false
  },
  'post'
)

export const rateMovie = (session_id, movie_id, value) => fetch(
  baseurl + `/movie/${movie_id}/rating?api_key=${api_key}&session_id=${session_id}`,
  {
    value
  },
  'post'
)

export const deleteRating = (session_id, movie_id) => fetch(
  baseurl + `/movie/${movie_id}/rating`,
  { api_key, session_id},
  'delete'
) 
