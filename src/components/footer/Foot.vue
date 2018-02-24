<template>
  <footer class="foot">
    <section class="foot_item">
      <router-link to="/" tag="div" class="route_link_container">
        <Icon name='movie'></Icon>
        <span>Movie</span>
      </router-link>
    </section>
    <section class="foot_item">
      <Icon name='tv'></Icon>
      <span>TV</span>
    </section>
    <section class="foot_item">
      <router-link to="/search" tag="div" class="route_link_container">
        <Icon name='search'></Icon>
        <span>Search</span>
      </router-link>
    </section>
    <section class="foot_item" @click="judgeLoginState">
      <Icon name='user'></Icon>
      <span>My TMDb</span>
    </section>
    <MessageBox v-if="showMsg" @closeMsg="doClose"/>
  </footer>
</template>

<script>
import Icon from '../common/Icon'
import MessageBox from '../common/MessageBox'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showMsg: false
    }
  },
  computed: {
    ...mapState({
      accesstoken: state => state.account.accesstoken
    })
  },
  components: {
    Icon,
    MessageBox
  },
  methods: {
    judgeLoginState () {
      this.accesstoken
        ? this.$router.push('/account')
        : this.showMsg = true
    },
    doClose () {
      this.showMsg = false
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '../../style/mixin';
  .foot {
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    @include wh(100%, 1.5rem);
    padding: 0.25rem 0 0.1875rem;
    display: flex;
  }
  .foot_item {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .icon {
      @include wh(.8rem, .8rem);
      fill: white;
    }
    .icon_user {
      @include wh(0.95rem, 0.95rem);
    }
    span{
      @include sc(.4rem, #666);
    }
  }
  .route_link_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.08rem;
    padding: 0;
  }
</style>
