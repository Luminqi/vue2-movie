<template>
  <div class="mark">
  <div class="MarkBundle">
    <div class="list container" @click="activeMark('list')">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#fff" stroke-width="10" :style="getCircleStyle('list')" class="circle"/>
      </svg>
      <Icon name="list" :style="getIconStyle('list')"></Icon>
    </div>
    <div class="favorite container" @click="activeMark('favorite')">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#fff" stroke-width="10" :style="favorCircleStyle" class="circle"/>
      </svg>
      <Icon name="favorite" :style="favorIconStyle"></Icon>
    </div>
    <div class="watchlist container" @click="activeMark('watchlist')">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#fff" stroke-width="10" :style="wlistCircleStyle"/>
      </svg>
      <Icon name="tag" :style="wlistIconStyle"></Icon>
    </div>
    <div class="rate container" @click="activeMark('rate')">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#fff" stroke-width="10" :style="getCircleStyle('rate')" class="circle"/>
      </svg>
      <Icon name="star" :style="getIconStyle('rate')"></Icon>
    </div>
  </div>
  <MessageBox v-if="showMsg" @closeMsg="doClose" class="msgbox">
    <span slot="title" v-if="msgTitle">{{ msgTitle }}</span>
    <div slot="content" v-if="activeList">
      <p>{{ this.msgContent }}</p>
    </div>
    <div slot="content" v-if="activeRate">
      <Rate :max="5" :rating="rating" ref="rateStar"></Rate>
    </div>
    <div slot="customBtn" v-if="accessToken">
      <button @click="cancel">Cancel</button>
      <button @click="submit">Submit</button>
    </div>
  </MessageBox>
  </div>
</template>

<script>
import Icon from './Icon'
import MessageBox from './MessageBox'
import Rate from './Rate'
import { mapState, mapMutations } from 'vuex'
import { addToFavorite, removeFromFavorite, addToWatchlist, removeFromWatchlist, rateMovie, deleteRating } from '../../utils/getData'
import { ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE, ADD_WATCHLIST_MOVIE, REMOVE_WATCHLIST_MOVIE, ADD_RATED_MOVIE, DELETE_RATED_MOVIE } from '../../store/mutation-Types'
export default {
  data () {
    return {
      clickedElm: '',
      showMsg: false,
      msgTitle: '',
      msgContent: '',
      favorIconStyle: {},
      favorCircleStyle: {},
      wlistIconStyle: {},
      wlistCircleStyle: {},
      rating: 0
    }
  },
  components: {
    Icon,
    MessageBox,
    Rate
  },
  computed: {
    ...mapState({
      accessToken: state => state.account.accesstoken,
      sessionId: state => state.account.sessionid,
      favorMovieIds: state => state.account.favorites.map(item => item.id),
      watchlistIds: state => state.account.watchlist.map(item => item.id),
      ratedMovie: state => state.account.rated,
      movieDetail: state => state.detail.moviedetail
    }),
    briefMovieDetail () {
      // eslint-disable-next-line
      const { id, poster, title, release_date, vote_average, vote_count } = this.movieDetail
      return {
        id,
        path: poster,
        title,
        release_date,
        vote_average,
        vote_count
      }
    },
    activeStyle () {
      return { fill: this.dominantColor, width: '0.4615rem', height: '0.4615rem' }
    },
    activeList () {
      return this.clickedElm === 'list' && this.accessToken.length > 0
    },
    activeRate () {
      return this.clickedElm === 'rate' && this.accessToken.length > 0
    }
  },
  props: {
    dominantColor: {
      type: String,
      require: true
    }
  },
  methods: {
    ...mapMutations({
      addFavoriteMovie: ADD_FAVORITE_MOVIE,
      removeFavoriteMovie: REMOVE_FAVORITE_MOVIE,
      addWatchlistMovie: ADD_WATCHLIST_MOVIE,
      removeWatchlistMovie: REMOVE_WATCHLIST_MOVIE,
      addRatedMovie: ADD_RATED_MOVIE,
      deleteRatedMovie: DELETE_RATED_MOVIE
    }),
    getCircleStyle (mark) {
      return this.clickedElm === mark ? { fill: '#fff' } : { fill: 'none' }
    },
    getIconStyle (mark) {
      return this.clickedElm === mark ? this.activeStyle : { fill: '#fff', width: '0.6154rem', height: '0.6154rem' }
    },
    activeMark (elm) {
      this.clickedElm = elm
      if (!this.accessToken) {
        this.showMsg = true
        this.msgTitle = ''
        this.msgContent = ''
      } else {
        switch (elm) {
          case 'list': {
            this.showMsg = true
            this.msgTitle = 'Add to List'
            this.msgContent = 'Add The Commuter to one of your lists...'
            break
          }
          case 'rate': {
            this.showMsg = true
            this.msgTitle = 'Rate it!'
            this.msgContent = ''
            break
          }
          case 'favorite': {
            if (this.favorMovieIds.includes(this.movieDetail.id)) {
              removeFromFavorite(this.sessionId, 'movie', this.movieDetail.id).then(
                () => {
                  this.removeFavoriteMovie(this.briefMovieDetail)
                  this.favorIconStyle = { fill: '#fff', width: '0.6154rem', height: '0.6154rem' }
                  this.favorCircleStyle = { fill: 'none' }
                }
              )
            } else {
              addToFavorite(this.sessionId, 'movie', this.movieDetail.id).then(
                () => {
                  this.addFavoriteMovie(this.briefMovieDetail)
                  this.favorIconStyle = { fill: '#FA3AD8', width: '0.4615rem', height: '0.4615rem' }
                  this.favorCircleStyle = { fill: '#fff' }
                }
              )
            }
            break
          }
          case 'watchlist': {
            if (this.watchlistIds.includes(this.movieDetail.id)) {
              removeFromWatchlist(this.sessionId, 'movie', this.movieDetail.id).then(
                () => {
                  this.removeWatchlistMovie(this.briefMovieDetail)
                  this.wlistIconStyle = { fill: '#fff', width: '0.6154rem', height: '0.6154rem' }
                  this.wlistCircleStyle = { fill: 'none' }
                }
              )
            } else {
              addToWatchlist(this.sessionId, 'movie', this.movieDetail.id).then(
                () => {
                  this.addWatchlistMovie(this.briefMovieDetail)
                  this.wlistIconStyle = { fill: '#FA3A3A', width: '0.4615rem', height: '0.4615rem' }
                  this.wlistCircleStyle = { fill: '#fff' }
                }
              )
            }
            break
          }
          default: {
            this.showMsg = false
            this.msgTitle = ''
            this.msgContent = ''
          }
        }
      }
    },
    doClose () {
      this.showMsg = false // defaultBtn cancel feature
    },
    cancel () {
      this.showMsg = false
      if (this.activeList) {
      }
      if (this.activeRate) {
        this.$refs.rateStar.initialValue()
        this.clickedElm = ''
      }
    },
    submit () {
      this.showMsg = false
      if (this.activeRate) {
        let value = this.$refs.rateStar.getCurValue()
        rateMovie(this.sessionId, this.movieDetail.id, value).then(
          () => {
            // eslint-disable-next-line
            const { id, path, title, release_date } = this.briefMovieDetail
            this.addRatedMovie({
              id,
              path,
              title,
              release_date,
              rating: value
            })
          }
        )
      }
    },
    initialStyle () {
      if (this.favorMovieIds.includes(this.movieDetail.id)) {
        this.favorIconStyle = { fill: '#FA3AD8', width: '0.4615rem', height: '0.4615rem' }
        this.favorCircleStyle = { fill: '#fff' }
      } else {
        this.favorIconStyle = { fill: '#fff', width: '0.6154rem', height: '0.6154rem' }
        this.favorCircleStyle = { fill: 'none' }
      }
      if (this.watchlistIds.includes(this.movieDetail.id)) {
        this.wlistIconStyle = { fill: '#FA3A3A', width: '0.4615rem', height: '0.4615rem' }
        this.wlistCircleStyle = { fill: '#fff' }
      } else {
        this.wlistIconStyle = { fill: '#fff', width: '0.6154rem', height: '0.6154rem' }
        this.wlistCircleStyle = { fill: 'none' }
      }
      if (this.ratedMovie.map(item => item.id).includes(this.movieDetail.id)) {
        this.rating = this.ratedMovie.filter(item => item.id === this.movieDetail.id)[0].rating / 2
      } else {
        this.rating = 0
      }
    }
  },
  mounted () {
    this.initialStyle()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .MarkBundle {
    width: 200px;
    display: flex;
    justify-content: space-between;
    .container {
      @include wh(1.5385rem, 1.5385rem);
      position: relative;
      .icon {
        @include center;
        transition: fill 1s ease, width 1s ease, height 1s ease;
        // @include wh(16.0004px, 16.0004px);
      }
    }
  }
</style>
