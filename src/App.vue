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
  @import './style/common.scss';
</style>
