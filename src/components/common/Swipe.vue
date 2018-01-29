<template>
  <swiper :options="swiperOption" class="swiper-box" :class="type">
    <swiper-slide v-for="item in slides" :key="item.id" class="swiper-item">
       <img :src="item.path" alt="">
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
      return this.$store.getters[this.type]
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
    background: rgb(0, 0, 0);
  }
  // .swiper-item {
  //  background: rgb(0, 0, 0);
  // }
  .nowplaying, .upcoming, .toprated {
    img {
      @include wh(92px, 138px);
    }
  }
</style>
