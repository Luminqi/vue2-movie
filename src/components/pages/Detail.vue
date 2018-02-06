<template>
  <div class="detail">
    <Head :headback="true"></Head>
    <section class="detail_brief">
      <div class="detail_bg_img" :class="{ 'lazyloaded': lazyloaded }" :style="{ backgroundImage: backdrop}"></div>
      <div class="detail_bg_radial" :style="{ backgroundImage: radialimg}">
        <img :src="movie.poster" alt="" class="detail_img" />
        <div class="brief_container">
          <p class="brief_title">{{ movie.title }}</p>
          <p class="brief_date">{{ movie.release_date }}</p>
          <div class="brief_genres">
            <span v-for="item in movie.genres" :key="item.id">
              {{ item.name }}
            </span>
          </div>
          <Star :rating="movie.vote_average" class="brief_star"></Star>
          <span v-if="movie.vote_count" class="brief_vote">({{ movie.vote_average }}, {{ movie.vote_count }} )</span>
          <span v-else class="brief_vote">Not Rated</span>
        </div>
        <Progress :percentage="movie.vote_average * 10" :width="80" :strokeWidth="8" class="detail_progress"></Progress>
      </div>
    </section>
    <section class="detail_nav">
      <div class="detail_nav_container">
        <button @click="changeNav('/overview')" class="detial_button overview">Overview</button>
        <button @click="changeNav('/people')" class="detial_button people">People</button>
        <button @click="changeNav('/similar')" class="detial_button similar">Similar</button>
      </div>
    </section>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '../header/Head'
import Foot from '../footer/Foot'
import Star from '../common/Star'
import Progress from '../common/Progress'
import { mapState, mapActions } from 'vuex'
import * as Vibrant from 'node-vibrant'
export default {
  data () {
    return {
      lazyloaded: false,
      radialimg: ''
    }
  },
  computed: {
    ...mapState({
      movie: state => state.detail.moviedetail
    }),
    backdrop () {
      return `url(${this.movie.backdrop})`
    }
  },
  components: {
    Head,
    Foot,
    Star,
    Progress
  },
  methods: {
    changeNav (nav) {
      this.$router.replace({path: '/movie/' + this.movie.id + nav})
    },
    ...mapActions([
      'changeDetail'
    ]),
    async getDetailAndPalette (movieId) {
      try {
        await this.changeDetail(movieId)
        console.log(this.movie.backdrop)
        let palette = await Vibrant.from(this.movie.poster).getPalette()
        console.log(palette)
        let colors = Object.values(palette)
          .filter(
            value => value
          )
          .map(
            sWatch => ({ population: sWatch.getPopulation(), rgb: sWatch.getRgb() })
          )
          .sort(
            (c1, c2) => {
              if (c1.population > c2.population) return -1
              if (c1.population < c2.population) return 1
              else return 0
            }
          )
        console.log(colors)
        this.radialimg = `radial-gradient(circle at 20% 50%, rgba(${colors[0].rgb[0]}, ${colors[0].rgb[1]}, ${colors[0].rgb[2]}, 0.98) 0%, rgba(${colors[1].rgb[0]}, ${colors[1].rgb[1]}, ${colors[1].rgb[2]}, 0.88) 100%)`
      } catch (err) {
        console.log(err)
      }
    }
  //   getDetailAndPalette (movieId) {
  //     this.changeDetail(movieId).then(() => {
  //       console.log(this.movie.backdrop)
  //       // this.rate = this.movie.vote_average * 10
  //       Vibrant.from(this.movie.poster).getPalette().then((palette) => {
  //         let colors = Object.values(palette)
  //           .map(
  //             sWatch => ({ population: sWatch.getPopulation(), rgb: sWatch.getRgb() })
  //           )
  //           .sort(
  //             (c1, c2) => {
  //               if (c1.population > c2.population) return -1
  //               if (c1.population < c2.population) return 1
  //               else return 0
  //             }
  //           )
  //         console.log(colors)
  //         // this.lazyloaded = true
  //         this.radialimg = `radial-gradient(circle at 20% 50%, rgba(${colors[0].rgb[0]}, ${colors[0].rgb[1]}, ${colors[0].rgb[2]}, 0.98) 0%, rgba(${colors[1].rgb[0]}, ${colors[1].rgb[1]}, ${colors[1].rgb[2]}, 0.88) 100%)`
  //       }).catch((err) => console.log('err:', err))
  //     })
  //   }
  },
  created () {
    console.log('from create')
    this.getDetailAndPalette(this.$route.params.id).then(() => {
      this.lazyloaded = true
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('from beforerouteUpdate')
    if (to.params.id !== from.params.id) {
      this.getDetailAndPalette(to.params.id)
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .detail_brief {
    position: relative;
  }
  .detail_bg_img {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: block;
    filter: opacity(0) grayscale(100%) contrast(130%);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    // background-image: url('https://image.tmdb.org/t/p/w1400_and_h450_face/mmxxEpTqVdwBlu5Pii7tbedBkPC.jpg');
    will-change: opacity;
    transition: filter 2s ease;
  }
  .detail_bg_img.lazyloaded {
    filter: opacity(100) grayscale(100%) contrast(130%);
  }
  .detail {
    @include sc(0.5rem, white);
    background-color: rgb(12, 12, 12);
    margin-top: 1.5rem;
    .detail_bg_radial {
      position: relative;
      display: flex;
      .detail_img {
        @include wh(2.95rem, 4.4231rem);
      }
      .detail_progress {
        position: absolute;
        top: 0;
        right: 0;
      }
      .brief_container {
        margin-left: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .brief_title {
          @include sc(0.6rem, #fff);
          padding: 0;
          margin: 0
        }
        .brief_date {
          @include sc(0.3rem, #666);
          padding: 0;
          margin: 0.2rem 0;
        }
        .brief_genres {
          @include sc(0.3rem, #666);
          padding: 0;
          margin: 0
        }
        .brief_vote {
          @include sc(0.3rem, #666);
          padding: 0;
          margin: 0
        }
      }
    }
  }
  .detail_nav {
    position: relative;
    height: 1.7308rem;
    .detail_nav_container {
      @include center;
      display: flex;
      .detial_button {
        @include wh(2.7692rem, 0.9615rem);
        @include sc(0.3rem, rgb(182, 182, 182));
        margin: 0;
        padding: 0;
        background-color: rgb(12, 12, 12);
        border: 2px solid rgb(182, 182, 182)
      }
      .overview {
        @include borderRadius(0.2rem 0 0 0.2rem)
      }
      .people {
        border-left: none;
        border-right: none;
      }
      .similar {
        @include borderRadius(0 0.2rem 0.2rem 0)
      }
    }
  }
</style>
