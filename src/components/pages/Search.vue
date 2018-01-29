<template>
  <div class="search">
    <Head>
      <span slot="title" class="search_title">Search</span>
    </Head>
    <input type="text" v-model="search" class="search_input" />
    <ul class="search_list">
      <li v-for="item in results" :key="item.id" class="search_item">
        <img :src="item.path" v-if="item.path" class="item_pic">
        <Icon name="picture" v-else class="default_pic"></Icon>
        <div class="info_container">
          <p>{{ item.title }}</p>
          <p>{{ item.release_date }}</p>
          <Star :rating="item.vote_average"></Star>
          <span>({{ item.vote_average }}, {{ item.vote_count }} )</span>
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
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { getSearchResult } from '../../utils/getData'
import Head from '../header/Head'
import Foot from '../footer/Foot'
import Icon from '../common/Icon'
import Star from '../common/Star'
import { imgurl } from '../../utils/imgurl'

Vue.use(VueRx, {
  Observable,
  Subscription
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
  subscriptions () {
    return {
      results: this.$watchAsObservable('search')
        .pluck('newValue')
        .filter(text => text.length > 2)
        .debounceTime(750)
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
    display: flex;
    flex-direction: column;
    .search_title {
      @include sc(0.7rem, white);
    }
    .search_input {
      margin-top: 1.5rem;
      position: fixed;
    }
    .search_item {
      display: flex;
      margin-bottom: 1.5rem;
      .default_pic, .item_pic {
        @include wh(92px, 138px)
      }
      .default_pic {
        fill: rgb(170, 170, 170);
      }
      .info_container {
        display: flex;
        flex-direction: column;
        @include sc(0.4rem, white);
      }
    }
  }
  .search_list {
    margin-top: 2.5rem;
  }
</style>
