<template>
  <swiper :options="swiperOption" class="swiper-box" :class="type" v-if="slides.length">
    <swiper-slide v-for="item in slides" :key="item.id" class="swiper-item" v-if="judgeType">
      <router-link :to="'/movie/' + item.id" tag='div' class= 'swiper-item-container' :class="type">
        <img :src="item.path" alt=""/>
        <p class="swiper-item-title" :class="type">{{ item.title }}</p>
        <p class="swiper-item-desc" v-if="type !== 'popular'">{{ item.date }}</p>
      </router-link>
    </swiper-slide>
    <swiper-slide v-for="item in slides" :key="item.id" class="swiper-item" v-else>
      <router-link :to="'/person/' + item.person_id" tag='div'>
        <img :src="item.path" alt=""/>
      </router-link>
      <p class="swiper-item-title">{{ item.name }}</p>
      <p v-if="type === 'cast'" class="swiper-item-desc">{{ item.character }}</p>
      <p v-else class="swiper-item-desc">{{ item.job }}</p>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination" v-if="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev" v-if="button"></div>
    <div class="swiper-button-next" slot="button-next" v-if="button"></div>
    <div class="swiper-scrollbar" slot="scrollbar" v-if="scrollbar"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    const pagination = this.pagination
      ? {el: '.swiper-pagination', dynamicBullets: true}
      : {el: ''}
    const spaceBetween = this.type === 'popular' ? 0 : 10
    const slidesPerView = this.type === 'popular' ? 1 : 4
    const loop = this.type === 'popular'
    const autoplay = this.type === 'popular'
    return {
      swiperOption: {
        pagination,
        spaceBetween,
        slidesPerView,
        loop,
        autoplay
      }
    }
  },
  computed: {
    slides () {
      return this.$store.getters[this.type] || this.$store.state.detail.moviedetail[this.type]
    },
    judgeType () {
      return this.type !== 'cast' && this.type !== 'crew'
    }
  },
  props: {
    pagination: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    scrollbar: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
 @import '../../style/mixin';
  .swiper-box {
    width: 100%;
    height: 100%;
  }
  .nowplaying, .upcoming, .toprated, .cast, .crew {
    img {
      @include wh(2.95rem, 4.4231rem);
    }
  }
  .swiper-item-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 0.25rem;
    .swiper-item-title {
      width: 2.95rem;
      margin: 0.1rem 0 0;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @include sc(0.2rem, #fff);
    }
    .popular {
      width: auto;
      background-color: rgba(0, 0, 0, 0.8);
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 0;
      padding: 0.3rem 0.5rem;
      // border-radius: 0 0.4rem 0 0;
      @include borderRadius(0 0.4rem 0 0);
      @include sc(0.4rem, #ff8800);
    }
    .swiper-item-desc {
      width: 2.95rem;
      margin: 0;
      padding: 0;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @include sc(0.2rem, #666)
    }
  }
  .swiper-item-container.popular {
    align-items: center;
    padding-left: 0;
  }
</style>
