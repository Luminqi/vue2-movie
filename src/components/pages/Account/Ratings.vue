<template>
  <div class="rated">
    <!-- <transition-group name="list" tag="ul" class="wathclist_list"> -->
    <ul class="rated_list">
      <li v-for="item in rated" :key="item.id" class="rated_item">
        <img :src="item.path" v-if="item.path"  @click="$router.push('/movie/' + item.id)" class="item_pic">
        <div class="default_pic_container" v-else>
          <Icon name="picture" class="default_pic"></Icon>
        </div>
        <div class="info_container">
          <span>{{item.title}}</span>
          <span>{{item.release_date}}</span>
          <p>Your Rating: {{item.rating}}</p>
          <!-- <Progress :percentage="item.vote_average * 10" :width="40" :strokeWidth="4" /> -->
          <MarkBundle :movieDetail="normalize(item)" />
        </div>
      </li>
    </ul>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import Icon from '../../common/Icon'
// import Progress from '../../common/Progress'
import MarkBundle from '../../common/MarkBundle'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      rated: state => state.account.rated
    })
  },
  components: {
    Icon,
    // Progress,
    MarkBundle
  },
  methods: {
    normalize (item) {
      // eslint-disable-next-line
      const { id, path, title, release_date, vote_average, vote_count } = item
      return {
        id,
        poster: path,
        title,
        release_date,
        vote_average,
        vote_count
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';
.rated_list {
  margin: 0 1rem;
  padding: 0;
  list-style: none;
}
.rated_item {
  position: relative;
  height: 7.5769rem;
  margin-bottom: 1.5rem;
  display: flex;
  .item_pic, .default_pic_container {
    @include wh(5.1154rem, 7.5769rem);
    margin-right: 0.5rem;
  }
  .info_container {
    @include sc(0.6rem, #fff);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  // .list-leave-active {
  //   position: absolute;
  // }
  // .list-enter, .list-leave-to {
  //   opacity: 0;
  //   transform: translateY(9.0769rem);
  // }
  // .list-move {
  //   transition: transform 1s;
  // }
}
</style>
