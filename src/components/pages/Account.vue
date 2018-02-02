<template>
  <div class="account">
    <Head :headback="true">
      <span slot="title">My Account</span>
    </Head>
    <div>Overview</div>
    <div>Watchlist</div>
    <div>Lists</div>
    <div>Favorites</div>
    <div>Recommendations</div>
    <div v-if="accessToken">Logout</div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '../header/Head'
import Foot from '../footer/Foot'
import { mapState, mapMutations, mapActions } from 'vuex'
import { MODIFY_REQUEST_TOKEN, CHANGE_START_PATH } from '../../store/mutation-Types'
import { getStore, removeStore } from '../../utils/storage'
export default {
  components: {
    Head,
    Foot
  },
  computed: {
    ...mapState({
      requestToken: state => state.account.requesttoken,
      accessToken: state => state.account.accesstoken,
      accountId: state => state.account.accountid
    })
  },
  methods: {
    ...mapMutations({
      modifyRequestToken: MODIFY_REQUEST_TOKEN,
      changeStartPath: CHANGE_START_PATH
    }),
    ...mapActions([
      'changeAccessToken',
      'changeAccountInfo'
    ])
  },
  created () {
    let requesttoken = getStore('requesttoken')
    let startpath = getStore('startpath')
    this.modifyRequestToken({ requesttoken })
    this.changeStartPath({ startpath })
    removeStore('requesttoken')
    removeStore('startpath')
    if (!this.accessToken && this.requestToken !== '') {
      this.changeAccessToken(this.requestToken).then(
        () => {
          this.changeAccountInfo({ accountId: this.accountId, accessToken: this.accessToken })
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .account {
    color: white;
  }
</style>
