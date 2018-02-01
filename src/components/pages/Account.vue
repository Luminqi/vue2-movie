<template>
  <div class="account">
    <div>Overview</div>
    <div>Watchlist</div>
    <div>Lists</div>
    <div>Favorites</div>
    <div>Recommendations</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      requestToken: state => state.account.requesttoken,
      accessToken: state => state.account.accesstoken
    })
  },
  methods: {
    ...mapActions([
      'changeAccessToken'
    ])
  },
  created () {
    if (!this.accessToken && this.requestToken !== '') {
      this.changeAccessToken(this.requestToken)
      console.log(this.accessToken)
    }
  }
}
</script>

<style lang="scss" scoped>
  .account {
    color: white;
  }
</style>
