<template>
  <div class="detail">
    <Head :headback="true"></Head>
    <section class="detail_brief">
      <img :src="movie.poster" alt="" class="" />
      <div class="brief_container">
      <p>{{ movie.title }}</p>
      <p>{{ movie.release_date }}</p>
      <span v-for="item in movie.genres" :key="item.id">
        {{ item.name }}
      </span>
      <Star :rating="movie.vote_average"></Star>
      <span>({{ movie.vote_average }}, {{ movie.vote_count }} )</span>
      </div>
    </section>
    <section class="detail_nav">
        <button @click="changeNav('/overview')">Overview</button>
        <button @click="changeNav('/people')">People</button>
        <button @click="changeNav('/similar')">Similar</button>
    </section>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '../header/Head'
import Foot from '../footer/Foot'
import Star from '../common/Star'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      movie: state => state.detail.moviedetail
    })
  },
  components: {
    Head,
    Foot,
    Star
  },
  methods: {
    changeNav (nav) {
      this.$router.replace({path: '/movie/' + this.movie.id + nav})
    },
    ...mapActions([
      'changeDetail'
    ])
  },
  created () {
    this.changeDetail(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.id !== from.params.id) {
      this.changeDetail(to.params.id)
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .detail {
    @include sc(0.5rem, white);
    .detail_brief {
      display: flex;
    }
  }

</style>
