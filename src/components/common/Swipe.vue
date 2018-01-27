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
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      slides: 'popular'
    })
  },
  props: {
    pagination: {
      type: Boolean,
      default: true
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
  .swiper-box {
    width: 100%;
    height: 100%;
  }
  .swiper-item {
   background: #fff;
  }
</style>
