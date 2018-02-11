<template>
  <div class="search">
    <Head>
      <span slot="title" class="search_title">Search</span>
    </Head>
    <div class="input_container">
      <input type="text" placeholder=" Search Movie" v-model="search" v-stream:keyup="{ subject: enter$, data: search }" class="search_input" />
    </div>
    <ul class="search_list">
      <li v-for="item in results" :key="item.id" class="search_item" @click="$router.push('/movie/' + item.id)">
        <img :src="item.path" v-if="item.path" class="item_pic">
        <div class="default_pic_container" v-else>
          <Icon name="picture" class="default_pic"></Icon>
        </div>
        <div class="info_container">
          <p class="info_title">{{ item.title }}</p>
          <p class="info_date">{{ item.release_date }}</p>
          <Star :rating="item.vote_average" class="info_star"></Star>
          <span v-if="item.vote_count" class="info_vote">({{ item.vote_average }}, {{ item.vote_count }} )</span>
          <span v-else class="info_vote">Not Rated</span>
        </div>
      </li>
    </ul>
    <Foot></Foot>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/merge'
import { getSearchResult } from '../../utils/getData'
import Head from '../header/Head'
import Foot from '../footer/Foot'
import Icon from '../common/Icon'
import Star from '../common/Star'
import { imgurl } from '../../utils/imgurl'

Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject
})

const formatResult = (res) => res.results
  .map(item => {
    let path
    if (item.poster_path !== null) {
      path = imgurl('w92', item.poster_path)
    } else {
      path = ''
    }
    return {
      path,
      id: item.id,
      title: item.title,
      release_date: item.release_date,
      vote_average: item.vote_average,
      vote_count: item.vote_count
    }
  })
export default {
  data () {
    return {
      search: ''
    }
  },
  components: {
    Head,
    Foot,
    Icon,
    Star
  },
  domStreams: ['enter$'],
  subscriptions () {
    return {
      results: this.$watchAsObservable('search')
        .pluck('newValue')
        .filter(text => text.length > 2)
        .debounceTime(750)
        .merge(this.enter$.filter(source => source.event.keyCode === 13).pluck('data').filter(text => text))
        .distinctUntilChanged()
        .switchMap(value => Observable.fromPromise(getSearchResult(value))
          .catch(err => Observable.of(new Error(err)))
        )
        .do(res => console.log('res', res))
        .map(formatResult)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .search {
    margin-top: 1.5rem;
    padding-bottom: 1.5rem;
    .search_title {
      @include sc(0.7rem, white);
      @include center;
    }
    .input_container {
      @include wh(100%, 1.2rem);
      @include cl;
      background-color: #443d3d;
      padding: 0.2rem 0.3rem;
      position: fixed;
      top: 1.5rem;
      .search_input {
        @include wh(15rem, 0.8rem);
        @include center;
        @include borderRadius(0.3rem);
        @include plc(#666);
        color: white;
        background-color: #141313;
        border: none;
      }
    }
    .search_list {
      margin-top: 3.5rem;
      .search_item {
        display: flex;
        margin-bottom: 1.5rem;
        .default_pic_container, .item_pic {
          @include wh(2.95rem, 4.4231rem);
        }
        .default_pic_container {
          position: relative;
          background-color: #443d3d;
        }
        .default_pic {
          @include wh(.8rem, .8rem);
          @include center;
          fill: rgb(170, 170, 170);
        }
        .info_container {
          margin-left: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .info_title {
            @include sc(0.3rem, white);
            padding: 0;
            margin: 0
          }
          .info_date {
            @include sc(0.2rem, #666);
            padding: 0;
            margin: 0.3rem 0;
          }
          .info_vote {
            @include sc(0.2rem, #666);
            padding: 0;
            margin: 0
          }
        }
      }
    }
  }

</style>
