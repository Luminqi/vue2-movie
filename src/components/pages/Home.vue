<template>
  <div class="home">
  <Head :headlogo="true"></Head>
  <Swipe :pagination="true" type="popular"></Swipe>
  <Foot></Foot>
  </div>
</template>

<script>
import Head from '../header/Head'
import Foot from '../footer/Foot'
import Swipe from '../common/Swipe'
import { mapActions } from 'vuex'
export default {
  components: {
    Head,
    Foot,
    Swipe
  },
  methods: {
    ...mapActions([
      'getMovieInfo'
    ])
  },
  created: function () {
    this.getMovieInfo()
  }
}
</script>

<style lang='scss' scoped>
  .home {
    position: relative;
  }
  .popular {
    position: absolute;
    top: 12.5rem;
  }
</style>
