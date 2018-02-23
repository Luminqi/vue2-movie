<template>
  <ul class="list">
    <li v-for="item in listDetail" :key="item.id" class="list_item">
      <img :src="posterPath(item.backdrop_path)" class="list_img" />
      <span class="list_name">{{item.name}}</span>
      <span class="list_count">{{item.results.length}} items</span>
    </li>
  </ul>
</template>

<script>
import { getList } from '../../../utils/getData'
import { imgurl } from '../../../utils/imgurl'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      listDetail: []
    }
  },
  computed: {
    ...mapState({
      lists: state => state.account.lists,
      accessToken: state => state.account.accesstoken
    })
  },
  methods: {
    async getlistDetail () {
      let promises = this.lists.map(item => getList(item.id, this.accessToken))
      this.listDetail = await Promise.all(promises)
      console.log(this.listDetail)
    },
    posterPath (path) {
      return imgurl('w300', path)
    }
  },
  created () {
    this.getlistDetail()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/mixin';
  .list {
    color: white;
    list-style: none;
  }
</style>
