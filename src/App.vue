<template>
  <div id="app">
    <router-view/>
    <SvgIcon/>
  </div>
</template>

<script>
import SvgIcon from './assets/Icons/SvgIcon'
export default {
  name: 'App',
  components: {
    SvgIcon
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
