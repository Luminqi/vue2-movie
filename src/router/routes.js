const Home = () => import('../components/pages/Home')
const Search = () => import('../components/pages/Search')

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
  }
]
