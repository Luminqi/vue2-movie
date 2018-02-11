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
import Head from '../../header/Head'
import Foot from '../../footer/Foot'
import { mapState, mapMutations, mapActions } from 'vuex'
import { MODIFY_REQUEST_TOKEN, MODIFY_REQUEST_TOKEN_V3, CHANGE_START_PATH } from '../../../store/mutation-Types'
import { getStore, removeStore } from '../../../utils/storage'
export default {
  components: {
    Head,
    Foot
  },
  computed: {
    ...mapState({
      requestToken: state => state.account.requesttoken,
      requestTokenV3: state => state.account.requesttokenv3,
      accessToken: state => state.account.accesstoken,
      accountId: state => state.account.accountid
    })
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
  .account {
    color: white;
  }
</style>
