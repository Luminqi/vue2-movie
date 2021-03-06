import { CHANGE_PEOPLE_DETAIL } from '../mutation-Types'
import { getPeopleDetail } from '../../utils/getData'
import { imgurl } from '../../utils/imgurl'

const formatData = (data) => {
  // eslint-disable-next-line
  const { id, name, birthday, place_of_birth, profile_path, biography } = data
  const knownforcast = data.movie_credits.cast.map(item => ({
    path: imgurl('w92', item.poster_path),
    id: item.id,
    title: item.title,
    date: item.release_date
  }))
  const knownforcrew = data.movie_credits.crew.map(item => ({
    path: imgurl('w92', item.poster_path),
    id: item.id,
    title: item.title,
    date: item.release_date
  }))
  return {
    id,
    name,
    birth: birthday,
    place: place_of_birth,
    profile: imgurl('w92', profile_path),
    biography,
    knownforcast,
    knownforcrew
  }
}
export default {
  state: {
    peopledetail: {
      id: '',
      name: '',
      birth: '',
      place: '',
      profile: '',
      biography: '',
      knownforcast: [],
      knownforcrew: []
    }
  },
  getters: {
    knownforcast: state => {
      let arr = state.peopledetail.knownforcast
      if (arr.length > 10) {
        arr = arr.slice(0, 10)
      }
      return arr.reduce((array, cur) => {
        if (!array.map(item => item.id).includes(cur.id)) {
          array.push(cur)
        }
        return array
      }, [])
    },
    knownforcrew: state => {
      let arr = state.peopledetail.knownforcrew
      if (arr.length > 10) {
        arr = arr.slice(0, 10)
      }
      return arr.reduce((array, cur) => {
        if (!array.map(item => item.id).includes(cur.id)) {
          array.push(cur)
        }
        return array
      }, [])
    }
  },
  mutations: {
    [CHANGE_PEOPLE_DETAIL] (state, payload) {
      state.peopledetail = {...state.peopledetail, ...payload}
    }
  },
  actions: {
    async getPeopleInfo ({ commit }, personId) {
      let res = await getPeopleDetail(personId)
      console.log(res)
      let data = formatData(res)
      console.log(data)
      console.log(data.profile)
      commit(CHANGE_PEOPLE_DETAIL, data)
    }
  }
}
