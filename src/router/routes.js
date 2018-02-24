import Home from '../components/pages/Home'
// const Home = () => import('../components/pages/Home')
const Search = () => import('../components/pages/Search')
const Detail = () => import('../components/pages/Detail')
const Overview = () => import('../components/pages/Detail-overview')
const People = () => import('../components/pages/Detail-people')
const Similar = () => import('../components/pages/Detail-similar')
const Account = () => import('../components/pages/Account/Account')
const Person = () => import('../components/pages/People')

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
    component: Detail,
    children: [
      {
        path: '',
        name: 'Default',
        component: Overview
      },
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'people',
        name: 'People',
        component: People
      },
      {
        path: 'similar',
        name: 'Similar',
        component: Similar
      }
    ]
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: Person
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '*',
    redirect: '/'
  }
]
