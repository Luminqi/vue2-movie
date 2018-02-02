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
export const createRequestToken = () => fetch(
  baseurl_v4 + '/auth/request_token', { redirect_to: 'http://localhost:8080/#/account' }, 'post', { 'Authorization': 'Bearer ' + api_access_token })
export const createAccessToken = (requestToken) => fetch(
  baseurl_v4 + '/auth/access_token', { "request_token": requestToken }, 'post', { 'Authorization': 'Bearer ' + api_access_token })
export const getUserInfo = (accountId, accessToken) => Promise.all([
  fetch(baseurl_v4 + '/account/' + accountId + '/lists', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/favorites', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/recommendations', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken }),
  fetch(baseurl_v4 + '/account/' + accountId + '/movie/watchlist', { page: '1' }, 'get', { 'Authorization': 'Bearer ' + accessToken })
])
