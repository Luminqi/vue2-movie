<template>
  <div class="account">
    <Head :headback="true">
      <span slot="title" class="account_title">My Account</span>
    </Head>
    <swiper :options="swiperOption" class="account_swiper">
      <swiper-slide class="account_item">Recommend</swiper-slide>
      <swiper-slide class="account_item">Overview</swiper-slide>
      <swiper-slide class="account_item">Watchlist</swiper-slide>
      <swiper-slide class="account_item">Lists</swiper-slide>
      <swiper-slide class="account_item">Favorites</swiper-slide>
      <swiper-slide class="account_item">Ratings</swiper-slide>
    </swiper>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
    <div v-if="accessToken" class="account_logout">Logout</div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '../../header/Head'
import Foot from '../../footer/Foot'
import Recommend from './Recommend'
import Overview from './Overview'
import Watchlist from './Watchlist'
import Lists from './Lists'
import Favorites from './Favorites'
import Ratings from './Ratings'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState, mapMutations, mapActions } from 'vuex'
import { MODIFY_REQUEST_TOKEN, MODIFY_REQUEST_TOKEN_V3, CHANGE_START_PATH } from '../../../store/mutation-Types'
import { getStore, removeStore } from '../../../utils/storage'
export default {
  data () {
    let vm = this
    return {
      currentSlide: 0,
      swiperOption: {
        slidesPerView: 3,
        loop: true,
        effect: 'coverflow',
        on: {
          slideChangeTransitionEnd: function () {
            vm.currentSlide = this.realIndex
          }
        }
      }
    }
  },
  components: {
    Head,
    Foot,
    swiper,
    swiperSlide,
    Recommend,
    Overview,
    Watchlist,
    Lists,
    Favorites,
    Ratings
  },
  computed: {
    ...mapState({
      requestToken: state => state.account.requesttoken,
      requestTokenV3: state => state.account.requesttokenv3,
      accessToken: state => state.account.accesstoken,
      accountId: state => state.account.accountid
    }),
    currentView () {
      switch (this.currentSlide) {
        case 0: return 'Overview'
        case 1: return 'Watchlist'
        case 2: return 'Lists'
        case 3: return 'Favorites'
        case 4: return 'Ratings'
        case 5: return 'Recommend'
      }
    }
  },
  methods: {
    ...mapMutations({
      modifyRequestToken: MODIFY_REQUEST_TOKEN,
      modifyRequestTokenV3: MODIFY_REQUEST_TOKEN_V3,
      changeStartPath: CHANGE_START_PATH
    }),
    ...mapActions([
      'changeAccessToken',
      'changeAccountInfo'
    ])
  },
  created () {
    if (this.requestToken === '') {
      let requesttoken = getStore('requesttoken')
      let requesttokenv3 = getStore('requesttokenv3')
      let startpath = getStore('startpath')
      this.modifyRequestToken({ requesttoken })
      this.modifyRequestTokenV3({ requesttokenv3 })
      this.changeStartPath({ startpath })
      removeStore('requesttoken')
      removeStore('requesttokenv3')
      removeStore('startpath')
    }
    if (!this.accessToken && this.requestToken !== '') {
      this.changeAccessToken({ requestToken: this.requestToken, requestTokenV3: this.requestTokenV3 }).then(
        () => {
          this.changeAccountInfo({ accountId: this.accountId, accessToken: this.accessToken })
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';
  .account {
    margin-top: 1.5rem;
    .account_title {
      @include sc(0.7rem, white);
      @include center;
    }
    .account_swiper {
      margin-top: 2rem;
      .account_item {
        @include wh(5.1923rem, 1.7308rem);
        @include sc(0.8rem, white);
        text-align: center;
      }
    }
    .account_logout {
      @include sc(0.7rem, white);
      @include cl;
    }
  }
</style>
