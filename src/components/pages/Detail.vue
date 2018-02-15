<template>
  <div class="detail">
    <Head :headback="true"></Head>
    <section class="detail_brief">
      <div class="detail_bg_img" :class="{ 'lazyloaded': lazyloaded }" :style="{ backgroundImage: backdrop}"></div>
      <div class="detail_bg_radial" :style="{ backgroundImage: radialimg}">
        <img :src="movie.poster" alt="" class="detail_img" v-if="movie.poster" />
        <div class="default_pic_container" v-else>
          <Icon name="picture" class="default_pic"></Icon>
        </div>
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
        <Progress :percentage="movie.vote_average * 10" :width="60" :strokeWidth="6" class="detail_progress" v-if="finishGetDetail"></Progress>
      </div>
      <MarkBundle :dominantColor="dominantColor" :movieDetail="movie" class="detail_mark" v-if="showMarkBundle"></MarkBundle>
    </section>
    <section class="detail_nav">
      <div class="detail_nav_container">
        <div @click="changeNav('/overview')" class="detial_button overview" :style="($route.name === 'Default' || $route.name === 'Overview') ? { borderBottomColor:  dominantColor } : { borderBottomColor: '#232323' }">Overview</div>
        <div @click="changeNav('/people')" class="detial_button people" :style="$route.name === 'People'  ? { borderBottomColor:  dominantColor } : { borderBottomColor: '#232323' }">People</div>
        <div @click="changeNav('/similar')" class="detial_button similar" :style="$route.name === 'Similar'  ? { borderBottomColor:  dominantColor } : { borderBottomColor: '#232323' }">Similar</div>
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
import Icon from '../common/Icon'
import Progress from '../common/Progress'
import MarkBundle from '../common/MarkBundle'
import { mapState, mapActions } from 'vuex'
import * as Vibrant from 'node-vibrant'
export default {
  data () {
    return {
      lazyloaded: false,
      radialimg: '',
      dominantColor: '#ff8800',
      showMarkBundle: false,
      finishGetDetail: false
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
    Progress,
    MarkBundle,
    Icon
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
        this.showMarkBundle = true
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
        this.dominantColor = `rgb(${colors[0].rgb[0]}, ${colors[0].rgb[1]}, ${colors[0].rgb[2]})`
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
      this.finishGetDetail = true
    })
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log('from beforeRouteLeave')
  //   this.lazyloaded = false
  //   this.finishGetDetail = false
  //   next()
  // },
  beforeRouteUpdate (to, from, next) {
    console.log('from beforerouteUpdate')
    if (to.params.id !== from.params.id) {
      this.lazyloaded = false
      this.finishGetDetail = false
      this.getDetailAndPalette(to.params.id).then(() => {
        this.lazyloaded = true
        this.finishGetDetail = true
      })
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
  .detail_mark {
    position: absolute;
    left: 3.7692rem;
    bottom: 0.3846rem;
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
      padding: 1.1538rem 0.7692rem 2.3077rem;
      position: relative;
      display: flex;
      .detail_img, .default_pic_container {
        @include wh(3.4615rem, 5.1923rem);
      }
      .default_pic_container {
        position: relative;
        background-color: #443d3d;
      }
      .default_pic {
        @include wh(1rem, 1rem);
        @include center;
        fill: rgb(170, 170, 170);
      }
      .detail_progress {
        position: absolute;
        top: 1.1538rem;
        right: 0.3rem;
      }
      .brief_container {
        margin-left: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .brief_title {
          @include sc(0.6rem, #fff);
          width: 5rem;
          padding: 0;
          margin: 0;
        }
        .brief_date {
          @include sc(0.3rem, #666);
          padding: 0;
          margin: 0.2rem 0;
        }
        .brief_genres {
          @include sc(0.3rem, #666);
          width: 5rem;
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
    background-color: #232323;
    .detail_nav_container {
      @include center;
      width: 100%;
      height: 100%;
      display: flex;
      .detial_button {
        @include sc(0.4rem, #fff);
        font-weight: bold;
        line-height: 1.7308rem;
        margin: 0;
        padding: 0;
        text-align: center;
        flex-grow: 1;
        border-bottom: 0.1923rem solid #232323;
      }
    }
  }
</style>
