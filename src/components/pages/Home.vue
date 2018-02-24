<template>
  <div class="home">
  <Head :headlogo="true">
    <span slot="title" class='home_title'>Movie</span>
  </Head>
  <Swipe type="popular"></Swipe>
  <div class="swipe_container">
    <p class="swipe_title">Now Playing</p>
    <Swipe type="nowplaying"></Swipe>
  </div>
  <div class="swipe_container">
    <p class="swipe_title">Upcoming</p>
    <Swipe type="upcoming"></Swipe>
  </div>
  <div class="swipe_container">
    <p class="swipe_title">Top Rated</p>
    <Swipe type="toprated"></Swipe>
  </div>
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
    margin-top: 1.5rem;
    padding-bottom: 1.5rem;
    background-color: rgb(12, 12, 12);
    display: flex;
    flex-direction: column;
    .home_title {
      @include sc(0.7rem, white);
      @include center;
    }
  }
  .swipe_container {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #5a5656;
  }
  .swipe_title {
    @include sc(0.5rem, white);
    margin-bottom: 0 0 0.2rem;
    padding: 0;
  }
</style>
