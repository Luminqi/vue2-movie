import Home from '../components/pages/Home'
// const Home = () => import('../components/pages/Home')
const Search = () => import('../components/pages/Search')
const Detail = () => import('../components/pages/Detail')
const Overview = () => import('../components/pages/Detail-overview')
const People = () => import('../components/pages/Detail-people')
const Similar = () => import('../components/pages/Detail-similar')
const Account = () => import('../components/pages/Account')

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Detail,
    children: [
      {
        path: '',
        component: Overview
      },
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'people',
        component: People
      },
      {
        path: 'similar',
        component: Similar
      }
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]
