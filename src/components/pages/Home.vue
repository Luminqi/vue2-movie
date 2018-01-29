<template>
  <div class="home">
  <Head :headlogo="true">
    <span slot="title" class='home_title'>Movie</span>
  </Head>
  <Swipe :pagination="true" type="popular"></Swipe>
  <Swipe type="nowplaying"></Swipe>
  <Swipe type="upcoming"></Swipe>
  <Swipe type="toprated"></Swipe>
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
  @import '../../style/mixin';
  .home {
    // background: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    .home_title {
      @include sc(0.7rem, white)
    }
  }
</style>
